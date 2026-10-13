import { useEffect } from "react";

// Same origin in production, local backend while developing
const API_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : window.location.origin;

// Same key as useLiveVisitor.js
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

let sent = false;

// Tells the server a visitor is here. The server decides new / returning
// and finds the location from the IP, so no permission popup is needed.
export default function useTrackVisitor() {
  useEffect(() => {
    if (sent) return;
    sent = true;

    fetch(`${API_URL}/api/track-visitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorToken: getToken() }),
    }).catch(() => {
      sent = false;
    });
  }, []);
}
