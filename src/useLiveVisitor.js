import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Same origin in production (the Express server serves the website),
// the local backend while developing
const API_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : window.location.origin;

// Must be the same key your visitor tracking (POST /api/track-visitor) uses
const TOKEN_KEY = "visitor_token";

const createToken = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

const getToken = () => {
  try {
    let token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      token = createToken();
      localStorage.setItem(TOKEN_KEY, token);
    }

    return token;
  } catch (err) {
    return createToken();
  }
};

// ============================================================
// Shared socket (one connection for the whole website)
// ============================================================

let socket = null;
let users = 0;
let lastCount = null;

const listeners = new Set();

const acquireSocket = () => {
  users += 1;

  if (!socket) {
    socket = io(`${API_URL}/live`, {
      auth: { token: getToken() },
      // Polling is the fallback for hosts that block websockets
      transports: ["websocket", "polling"],
    });

    socket.on("liveCount", (data) => {
      const count = Number(data && data.count);

      if (!Number.isFinite(count)) return;

      lastCount = count;
      listeners.forEach((listener) => listener(count));
    });
  }
};

const releaseSocket = () => {
  users -= 1;

  if (users <= 0 && socket) {
    socket.disconnect();
    socket = null;
    users = 0;
    lastCount = null;
  }
};

// Keeps this visitor "live" while the website is open (use once in App)
export default function useLiveVisitor() {
  useEffect(() => {
    acquireSocket();

    return releaseSocket;
  }, []);
}

// Returns the live visitor count (null until the first update arrives)
export function useLiveCount() {
  const [count, setCount] = useState(lastCount);

  useEffect(() => {
    acquireSocket();
    listeners.add(setCount);

    if (lastCount !== null) {
      setCount(lastCount);
    }

    return () => {
      listeners.delete(setCount);
      releaseSocket();
    };
  }, []);

  return count;
}
