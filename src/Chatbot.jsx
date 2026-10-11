import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import botAnimation from "./assets/bot.json";
import { Player } from "@lottiefiles/react-lottie-player";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// ================= CONFIG =================
const API_URL = "/api/chat";
const CONTACT_EMAIL = "info@motionpixindia.com";
const STORAGE_KEY = "chats";
const LEGACY_KEY = "chat"; // old single-conversation key (migrated once)
const TIP_KEY = "chatTipDismissed";
const MAX_HISTORY = 10; // last N messages sent to the AI as memory
const MAX_CHATS = 30; // saved conversations limit
const REQUEST_TIMEOUT = 45000; // ms
const MAX_PDF_SIZE = 8 * 1024 * 1024; // 8 MB

const suggestions = [
  "What services do you offer?",
  "Pricing details",
  "Project timeline",
  "Contact info"
];

// Built-in offline knowledge base — used when the browser is offline
// or the backend can't be reached, so basic questions still get answered.
const OFFLINE_FAQ = [
  {
    keywords: ["service", "services", "offer"],
    answer:
      "We offer 2D/3D Animation, Website Design, AR/VR, Digital Marketing, E-Learning, SOP Digitization, and Motion Graphics. Check the Services page for the full list."
  },
  {
    keywords: ["price", "pricing", "cost", "charge", "quote"],
    answer: `Pricing depends on project scope and complexity. Please reach out via our Contact page or email ${CONTACT_EMAIL} and our team will share a detailed quote.`
  },
  {
    keywords: ["timeline", "duration", "deadline", "how long"],
    answer:
      "Most projects take 2–3 weeks for smaller work, and 4–8 weeks for advanced animation, AR/VR, or multi-service projects."
  },
  {
    keywords: ["contact", "email", "phone", "reach", "address"],
    answer: `You can reach us at ${CONTACT_EMAIL} or through the Contact Us page on our website, and our team will get back to you shortly.`
  },
  {
    keywords: ["thanks", "thank", "thankyou"],
    answer: "You're welcome! 😊 Let me know if you need anything else."
  },
  {
    keywords: ["hi", "hello", "hey", "namaste"],
    answer:
      "Hey there! 👋 I'm running in offline mode right now, but I can still help with basic questions about our services, pricing, or timelines."
  }
];

const getOfflineAnswer = (text, hasFile) => {
  if (hasFile) {
    return `Image and PDF analysis needs an internet connection. Please reconnect and try again, or email us at ${CONTACT_EMAIL}.`;
  }

  const words = (text || "").toLowerCase().match(/[a-z0-9]+/g) || [];
  const query = words.join(" ");

  const match = OFFLINE_FAQ.find((item) =>
    item.keywords.some((keyword) =>
      keyword.includes(" ") ? query.includes(keyword) : words.includes(keyword)
    )
  );

  if (match) return match.answer;

  return "I'm currently offline and can't reach the server, but I can still help with basic questions about our services, pricing, timeline, or contact info. Try one of the quick suggestions below!";
};

// Friendly message for non-connection errors (server answered with an error)
const getErrorReply = (err, timedOut) => {
  if (timedOut) {
    return "⏱️ The AI is taking longer than usual. Please try again in a moment.";
  }

  const status = Number((err.message || "").replace("HTTP_", ""));

  if (status === 413) {
    return "⚠️ That file is too large. Please try a smaller image or PDF.";
  }
  if (status === 429) {
    return "⚠️ Too many requests right now. Please wait a few seconds and try again.";
  }
  return `⚠️ Internal Error (${status || "unknown"}) — something went wrong on our end. Please try again shortly.`;
};

// ================= HELPERS =================
const getTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const createId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const createChat = () => ({
  id: createId(),
  title: "New chat",
  messages: [],
  updatedAt: Date.now()
});

const makeTitle = (text) => {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return "New chat";
  return clean.length > 32 ? `${clean.slice(0, 32)}…` : clean;
};

// Loads saved conversations (and migrates the old single-chat format)
const loadChats = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved)) {
      return saved.filter(
        (c) => c && c.id && Array.isArray(c.messages) && c.messages.length
      );
    }

    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || "null");
    if (Array.isArray(legacy) && legacy.length) {
      const firstUser = legacy.find((m) => m.role === "user");
      return [
        {
          id: createId(),
          title: makeTitle(firstUser?.content),
          messages: legacy,
          updatedAt: Date.now()
        }
      ];
    }
  } catch (err) {
    console.log("Could not load chats:", err);
  }
  return [];
};

// Converts messages into the compact history the AI uses as memory
const buildHistory = (msgs) =>
  msgs
    .filter((m) => m.content && !m.local)
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.type ? `${m.content} [attached ${m.type}]` : m.content
    }));

// Compress image client-side before it becomes base64 (avoids PayloadTooLargeError)
const compressImage = (file, maxWidth = 1280, quality = 0.7) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");
        // White backdrop so transparent PNGs don't turn black in JPEG
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chats, setChats] = useState(() => [createChat(), ...loadChats()]);
  const [activeId, setActiveId] = useState(() => chats[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [dark, setDark] = useState(true);
  const [voiceOn, setVoiceOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  // connection state
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );
  const [backendUp, setBackendUp] = useState(true);

  // launcher tip ("We're active — How may I assist you?")
  const [showTip, setShowTip] = useState(false);

  // attachment (image / pdf) waiting to be sent
  const [pendingFile, setPendingFile] = useState(null);

  // edit message
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const chatRef = useRef(null);
  const intervalRef = useRef(null);
  const abortRef = useRef(null);
  const voiceOnRef = useRef(false);

  // ---------- derived ----------
  const activeChat = chats.find((c) => c.id === activeId) || chats[0];
  const messages = activeChat.messages;
  const showIntro = messages.length === 0;
  const isLive = online && backendUp;

  const savedChats = chats
    .filter((c) => c.messages.length)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  // Updates only the messages of the active conversation
  const updateMessages = (updater) =>
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: updater(c.messages), updatedAt: Date.now() }
          : c
      )
    );

  // ---------- effects ----------
  // Persist conversations (debounced so streaming doesn't hammer localStorage)
  useEffect(() => {
    const timer = setTimeout(() => {
      const toSave = chats
        .filter((c) => c.messages.length)
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, MAX_CHATS);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        localStorage.removeItem(LEGACY_KEY);
      } catch (err) {
        // Quota exceeded (large image previews) — retry without image data
        try {
          const light = toSave.map((c) => ({
            ...c,
            messages: c.messages.map(({ fileURL, ...rest }) => rest)
          }));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(light));
        } catch (err2) {
          console.log("Could not save chats:", err2);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [chats]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, typing]);

  // Online / offline detection
  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      setBackendUp(true);
    };
    const goOffline = () => setOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // Launcher tip appears shortly after load (once per session)
  useEffect(() => {
    if (chatOpen) return undefined;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TIP_KEY) === "1";
    } catch (err) {
      dismissed = false;
    }
    if (dismissed) return undefined;

    const timer = setTimeout(() => setShowTip(true), 1500);
    return () => clearTimeout(timer);
  }, [chatOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortRef.current) abortRef.current.abort();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  // ---------- launcher ----------
  const dismissTip = () => {
    setShowTip(false);
    try {
      sessionStorage.setItem(TIP_KEY, "1");
    } catch (err) {
      /* ignore */
    }
  };

  const openChat = () => {
    dismissTip();
    setChatOpen(true);
  };

  // ---------- voice ----------
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Voice not supported");

    const recog = new SpeechRecognition();
    recog.onresult = (e) => {
      setInput(e.results[0][0].transcript);
    };
    recog.onerror = () => {};
    recog.start();
  };

  const speak = (text) => {
    if (!voiceOnRef.current || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    if (/[\u0900-\u097F]/.test(text)) {
      speech.lang = text.includes("आहे") ? "mr-IN" : "hi-IN";
    } else if (/kya|hai|tum|kaise/i.test(text)) {
      speech.lang = "hi-IN";
    } else {
      speech.lang = "en-US";
    }

    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices.find((v) => v.lang === speech.lang) || voices[0];

    speech.rate = 1;
    speech.pitch = 1.1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  // mute button -> instantly stop any sound that's playing.
  // Unmute -> reads the latest answer aloud (if a reply is not still streaming;
  // a streaming reply is spoken automatically when it finishes).
  const toggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    voiceOnRef.current = next;

    if (!("speechSynthesis" in window)) return;

    if (!next) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    if (typing) return;

    const lastAnswer = [...messages]
      .reverse()
      .find((m) => m.role === "assistant" && m.content);

    if (lastAnswer) speak(lastAnswer.content);
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  // ---------- attachments ----------
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";

    if (!isImage && !isPdf) {
      alert("Only image or PDF files are supported");
      e.target.value = "";
      return;
    }

    if (isImage) {
      try {
        const compressed = await compressImage(file);
        setPendingFile({
          name: file.name,
          type: "image",
          base64: compressed,
          previewUrl: compressed
        });
      } catch (err) {
        console.log("Image compression failed:", err);
        alert("Couldn't process this image, try another one");
      }
      e.target.value = "";
      return;
    }

    if (file.size > MAX_PDF_SIZE) {
      alert("PDF is too large (max 8 MB)");
      e.target.value = "";
      return;
    }

    // PDF — sent as is (text is extracted server-side)
    const reader = new FileReader();
    reader.onload = () => {
      setPendingFile({
        name: file.name,
        type: "pdf",
        base64: reader.result,
        previewUrl: null
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removePendingFile = () => setPendingFile(null);

  // ---------- generation ----------
  // Stop button — cancels the API call + the streaming reveal, cleanly
  const stopGenerating = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTyping(false);

    // Drop the empty bubble if nothing was streamed yet
    updateMessages((prev) => {
      const last = prev[prev.length - 1];
      return last && last.role === "assistant" && !last.content
        ? prev.slice(0, -1)
        : prev;
    });
  };

  // Streams a plain-text reply into the last (empty) assistant bubble.
  // Shared by the real API response and the offline/error fallback paths.
  const revealReply = (full, local = false) => {
    const step = Math.max(1, Math.ceil(full.length / 250));
    let i = 0;

    intervalRef.current = setInterval(() => {
      i = Math.min(i + step, full.length);

      updateMessages((prev) => {
        if (!prev.length) return prev;
        const next = prev.slice();
        next[next.length - 1] = {
          ...next[next.length - 1],
          content: full.slice(0, i),
          local
        };
        return next;
      });

      if (i >= full.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTyping(false);
        speak(full);
      }
    }, 20);
  };

  const streamMessage = async (text, attachedFile = null, history = []) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const controller = new AbortController();
    abortRef.current = controller;

    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT);

    setTyping(true);

    updateMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", time: getTime(), reacting: null }
    ]);

    try {
      // no internet at all — skip the network call entirely
      if (!navigator.onLine) {
        throw new Error("OFFLINE");
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: text,
          history,
          image: attachedFile?.type === "image" ? attachedFile.base64 : null,
          pdf:
            attachedFile?.type === "pdf"
              ? { base64: attachedFile.base64, name: attachedFile.name }
              : null
        })
      });

      // server reachable but responded with an error status
      if (!res.ok) {
        throw new Error(`HTTP_${res.status}`);
      }

      const data = await res.json();
      setBackendUp(true);
      revealReply(data.reply || "No response");
    } catch (err) {
      // user pressed stop (not a timeout) — nothing more to do
      if (err.name === "AbortError" && !timedOut) {
        setTyping(false);
        return;
      }

      console.log(err);

      // A network-level fetch failure throws a TypeError; an HTTP_ prefix
      // means the server responded but with an error status.
      const isConnectionIssue =
        !navigator.onLine || err.message === "OFFLINE" || err.name === "TypeError";

      if (isConnectionIssue) {
        setBackendUp(false);
        revealReply(getOfflineAnswer(text, Boolean(attachedFile)), true);
      } else {
        revealReply(getErrorReply(err, timedOut), true);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const sendMessage = (custom) => {
    if (typing) return;

    const text = (typeof custom === "string" ? custom : input).trim();
    if (!text && !pendingFile) return;

    const content =
      text ||
      (pendingFile?.type === "image" ? "Sent an image" : "Sent a PDF document");

    const userMsg = {
      role: "user",
      content,
      time: getTime(),
      ...(pendingFile && {
        type: pendingFile.type,
        fileName: pendingFile.name,
        fileURL: pendingFile.previewUrl
      })
    };

    const history = buildHistory(messages);

    // First message of a conversation becomes its sidebar title
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              title: c.messages.length ? c.title : makeTitle(content),
              messages: [...c.messages, userMsg],
              updatedAt: Date.now()
            }
          : c
      )
    );
    setInput("");

    streamMessage(text, pendingFile, history);
    setPendingFile(null);
  };

  const handleReaction = (index, type) => {
    updateMessages((prev) =>
      prev.map((msg, i) =>
        i === index
          ? { ...msg, reacting: msg.reacting === type ? null : type }
          : msg
      )
    );
  };

  // ---------- conversations (sidebar) ----------
  const resetTransient = () => {
    stopGenerating();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    setEditingIndex(null);
    setEditValue("");
    setPendingFile(null);
    setInput("");
  };

  const selectChat = (id) => {
    if (id !== activeId) {
      resetTransient();
      setActiveId(id);
    }
    setSidebarOpen(false);
  };

  const startNewChat = () => {
    // Reuse an existing empty conversation instead of piling up blanks
    const empty = chats.find((c) => !c.messages.length);

    if (empty) {
      selectChat(empty.id);
      return;
    }

    resetTransient();
    const fresh = createChat();
    setChats((prev) => [fresh, ...prev]);
    setActiveId(fresh.id);
    setSidebarOpen(false);
  };

  const deleteChat = (id) => {
    const rest = chats.filter((c) => c.id !== id && c.messages.length);

    if (id === activeId) {
      resetTransient();
      const fresh = createChat();
      setChats([fresh, ...rest]);
      setActiveId(fresh.id);
    } else {
      setChats([...rest, ...chats.filter((c) => !c.messages.length)]);
    }
  };

  // Header trash button — clears the current conversation only
  const clearHistory = () => {
    resetTransient();
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, title: "New chat", messages: [], updatedAt: Date.now() }
          : c
      )
    );
  };

  // ---------- edit message ----------
  const startEdit = (i) => {
    setEditingIndex(i);
    setEditValue(messages[i].content);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const saveEdit = (i) => {
    const text = editValue.trim();
    if (!text) return;
    stopGenerating();

    const original = messages[i];
    const history = buildHistory(messages.slice(0, i));

    // Re-send the original image with the edited text (PDFs aren't kept locally)
    const attached =
      original.type === "image" && original.fileURL
        ? { type: "image", base64: original.fileURL, name: original.fileName }
        : null;

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              title: i === 0 ? makeTitle(text) : c.title,
              messages: [
                ...c.messages.slice(0, i),
                { ...c.messages[i], content: text, time: getTime() }
              ],
              updatedAt: Date.now()
            }
          : c
      )
    );
    setEditingIndex(null);
    setEditValue("");

    streamMessage(text, attached, history);
  };

  // ================= RENDER =================
  return (
    <div className={`chatbot-global ${dark ? "dark" : "light"}`}>

      {/* LAUNCHER: tip + toggle */}
      {!chatOpen && (
        <>
          {showTip && (
            <div className="chat-tip" role="status">
              <button className="chat-tip-body" onClick={openChat}>
                <span className="status-dot live"></span>
                <span className="chat-tip-text">
                  <strong>We're active</strong>
                  <span>How may I assist you?</span>
                </span>
              </button>
              <button
                className="chat-tip-close"
                onClick={dismissTip}
                title="Dismiss"
                aria-label="Dismiss"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          )}

          <button className="chat-toggle" onClick={openChat} aria-label="Open chat">
            🤖
            <span className={`toggle-dot ${isLive ? "live" : ""}`}></span>
          </button>
        </>
      )}

      {chatOpen && (
        <div className="chat-window">

          {/* HEADER */}
          <div className="chat-header">
            <div className="chat-title">
              <button
                className="menu-btn"
                onClick={() => setSidebarOpen(true)}
                title="Chat history"
                aria-label="Open chat history"
              >
                <i className="bi bi-list"></i>
              </button>
              <Player autoplay loop src={botAnimation} className="lottie-avatar" />
              <div className="chat-title-text">
                <h4>MotionPix AI</h4>
                <p>
                  <span className={`status-dot ${isLive ? "live" : ""}`}></span>
                  {isLive ? "Online" : "Offline mode"}
                </p>
              </div>
            </div>

            {voiceOn && (
              <div className="waveform">
                <span className={speaking ? "active" : ""}></span>
                <span className={speaking ? "active" : ""}></span>
                <span className={speaking ? "active" : ""}></span>
              </div>
            )}

            <div className="actions">
              <button onClick={toggleVoice} title={voiceOn ? "Mute voice" : "Unmute voice"}>
                {voiceOn ? "🔊" : "🔇"}
              </button>
              <button onClick={clearHistory} title="Clear this chat">
                <i className="bi bi-trash3-fill"></i>
              </button>
              <button onClick={() => setChatOpen(false)} title="Close">✕</button>
            </div>
          </div>

          {/* OFFLINE BANNER */}
          {!isLive && (
            <div className="offline-banner">
              <i className="bi bi-wifi-off"></i>
              <span className="fw-bold">
                You're offline — I can answer basic questions only. Images and
                PDFs need internet.
              </span>
            </div>
          )}

          {/* BODY */}
          <div className="chat-body" ref={chatRef}>
            {showIntro && (
              <div className="intro-screen">
                <h3>👋 Hey there!</h3>
                <p>Ask anything... I'm here to help 🚀</p>
                <a className="intro-mail" href={`mailto:${CONTACT_EMAIL}`}>
                  <i className="bi bi-envelope"></i> {CONTACT_EMAIL}
                </a>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>

                {editingIndex === i ? (
                  <div className="edit-box">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={2}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button onClick={() => saveEdit(i)} title="Save & regenerate">
                        <i className="bi bi-check-lg"></i>
                      </button>
                      <button onClick={cancelEdit} title="Cancel">
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="msg-text">
                    {m.type === "image" && m.fileURL && (
                      <img
                        src={m.fileURL}
                        alt="attachment"
                        className="msg-attachment-img"
                        onClick={() => setPreviewImg(m.fileURL)}
                      />
                    )}

                    {m.type === "pdf" && (
                      <div className="msg-attachment-pdf">
                        <i className="bi bi-file-earmark-pdf-fill"></i>
                        <span>{m.fileName}</span>
                      </div>
                    )}

                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        img: ({ ...props }) => (
                          <img {...props} onClick={() => setPreviewImg(props.src)} />
                        )
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}

                {editingIndex !== i && (
                  <div className="msg-footer">
                    {m.role === "assistant" && (
                      <div className="msg-reactions">
                        <span
                          className={m.reacting === "like" ? "active" : ""}
                          onClick={() => handleReaction(i, "like")}
                        >👍</span>
                        <span
                          className={m.reacting === "love" ? "active" : ""}
                          onClick={() => handleReaction(i, "love")}
                        >❤️</span>
                        <span
                          className={m.reacting === "dislike" ? "active" : ""}
                          onClick={() => handleReaction(i, "dislike")}
                        >👎</span>
                      </div>
                    )}

                    <span>{m.time}</span>

                    {m.role === "user" && (
                      <button onClick={() => startEdit(i)} title="Edit message">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    )}

                    <button onClick={() => copyText(m.content)} title="Copy">
                      <i className="bi bi-copy"></i>
                    </button>
                  </div>
                )}

              </div>
            ))}

            {typing && messages[messages.length - 1]?.content === "" && (
              <div className="msg assistant">
                <div className="thinking">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div className="chat-suggestions">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* PENDING ATTACHMENT PREVIEW */}
          {pendingFile && (
            <div className="pending-file-chip">
              {pendingFile.type === "image" ? (
                <img src={pendingFile.previewUrl} alt="attachment" />
              ) : (
                <div className="pdf-chip">
                  <i className="bi bi-file-earmark-pdf-fill"></i>
                </div>
              )}
              <span className="pending-file-name">{pendingFile.name}</span>
              <button onClick={removePendingFile} title="Remove attachment">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          )}

          {/* INPUT */}
          <div className="chat-input">

            <button className="voice-btn" onClick={startVoice} title="Speak">
              <i className="bi bi-mic"></i>
            </button>

            <input
              type="file"
              id="fileUpload"
              hidden
              accept="image/*,application/pdf"
              onChange={handleFile}
            />

            <button
              className="file-btn"
              onClick={() => document.getElementById("fileUpload").click()}
              title="Attach image / PDF"
            >
              <i className="bi bi-folder-fill"></i>
            </button>

            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (input.trim() || pendingFile)) {
                  sendMessage();
                }
              }}
            />

            {typing ? (
              <button className="send-btn stop-btn" onClick={stopGenerating} title="Stop generating">
                <i className="bi bi-stop-fill"></i>
              </button>
            ) : (
              <button
                className="send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() && !pendingFile}
                title="Send"
                style={{
                  opacity: !input.trim() && !pendingFile ? 0.5 : 1,
                  cursor: !input.trim() && !pendingFile ? "not-allowed" : "pointer"
                }}
              >
                <i className="bi bi-send-fill"></i>
              </button>
            )}

            {copied && <div className="copy-toast">Copied ✅</div>}
          </div>

          {/* AI DISCLAIMER */}
          <div className="ai-disclaimer">
            Content is generated with AI assistance, so surprises and mistakes are possible.
          </div>

          {/* SIDEBAR: conversation history */}
          <div
            className={`chat-sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
            onClick={() => setSidebarOpen(false)}
          ></div>

          <aside
            className={`chat-sidebar ${sidebarOpen ? "open" : ""}`}
            aria-hidden={!sidebarOpen}
          >
            <div className="sidebar-top">
              <button className="new-chat-btn" onClick={startNewChat}>
                <i className="bi bi-plus-lg"></i> New chat
              </button>
              <button
                className="sidebar-close"
                onClick={() => setSidebarOpen(false)}
                title="Close"
                aria-label="Close chat history"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <p className="sidebar-label">Recent chats</p>

            <ul className="sidebar-list">
              {savedChats.length === 0 && (
                <li className="sidebar-empty">No previous chats yet</li>
              )}

              {savedChats.map((c) => (
                <li key={c.id} className={c.id === activeId ? "active" : ""}>
                  <button className="chat-item" onClick={() => selectChat(c.id)}>
                    <i className="bi bi-chat-left-text"></i>
                    <span>{c.title}</span>
                  </button>
                  <button
                    className="chat-item-del"
                    onClick={() => deleteChat(c.id)}
                    title="Delete chat"
                    aria-label="Delete chat"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </li>
              ))}
            </ul>

            <a className="sidebar-mail" href={`mailto:${CONTACT_EMAIL}`}>
              <i className="bi bi-envelope"></i>
              <span>{CONTACT_EMAIL}</span>
            </a>
          </aside>

        </div>
      )}

      {/* Image preview lives outside .chat-window so it covers the whole screen
          (backdrop-filter on the window would otherwise trap a fixed overlay) */}
      {previewImg && (
        <div className="img-preview-overlay" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="preview" />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
