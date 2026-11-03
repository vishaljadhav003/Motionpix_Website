const db = require("../config/db");

// ============================================================
// CHAT LOGS
// Every question a visitor asks the chatbot and the answer it gave,
// grouped by conversation, so the admin can review them.
// ============================================================

const SESSION_PATTERN = /^[A-Za-z0-9_-]{6,64}$/;
const MAX_SESSIONS = 100;

const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });

// Created automatically, so no manual SQL is needed
const tableReady = query(`
  CREATE TABLE IF NOT EXISTS chat_logs (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    session_id VARCHAR(64) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    attachment VARCHAR(120) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_session (session_id),
    KEY idx_created (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
`)
  .then(() => true)
  .catch((err) => {
    console.error("❌ chat_logs table error:", err.message);
    return false;
  });

const formatTime = (value) =>
  new Date(value).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

// Saves one question + answer. Never throws: a logging problem must not break the chat.
const log = async ({ sessionId, question, answer, attachment }) => {
  try {
    if (!(await tableReady)) return;

    await query(
      `INSERT INTO chat_logs (session_id, question, answer, attachment)
       VALUES (?, ?, ?, ?)`,
      [
        SESSION_PATTERN.test(sessionId) ? sessionId : "unknown",
        String(question || "").slice(0, 2000),
        String(answer || "").slice(0, 8000),
        attachment ? String(attachment).slice(0, 120) : null,
      ]
    );
  } catch (err) {
    console.error("❌ Chat log error:", err.message);
  }
};

// Newest conversations first, each with all of its questions and answers
const listSessions = async ({ search = "" } = {}) => {
  if (!(await tableReady)) return [];

  const term = `%${search}%`;

  const recent = search
    ? await query(
        `SELECT session_id, MAX(id) AS last_id
         FROM chat_logs
         WHERE question LIKE ? OR answer LIKE ?
         GROUP BY session_id
         ORDER BY last_id DESC
         LIMIT ?`,
        [term, term, MAX_SESSIONS]
      )
    : await query(
        `SELECT session_id, MAX(id) AS last_id
         FROM chat_logs
         GROUP BY session_id
         ORDER BY last_id DESC
         LIMIT ?`,
        [MAX_SESSIONS]
      );

  if (!recent.length) return [];

  const rows = await query(
    `SELECT id, session_id, question, answer, attachment, created_at
     FROM chat_logs
     WHERE session_id IN (?)
     ORDER BY id ASC`,
    [recent.map((row) => row.session_id)]
  );

  const bySession = new Map();

  rows.forEach((row) => {
    if (!bySession.has(row.session_id)) bySession.set(row.session_id, []);

    bySession.get(row.session_id).push({
      id: row.id,
      question: row.question,
      answer: row.answer,
      attachment: row.attachment,
      time: formatTime(row.created_at),
    });
  });

  return recent.map((row) => {
    const exchanges = bySession.get(row.session_id) || [];

    return {
      sessionId: row.session_id,
      title: exchanges.length ? exchanges[0].question : "Conversation",
      startedAt: exchanges.length ? exchanges[0].time : "",
      lastAt: exchanges.length ? exchanges[exchanges.length - 1].time : "",
      exchanges,
    };
  });
};

const totals = async () => {
  if (!(await tableReady)) return { messages: 0, conversations: 0 };

  const rows = await query(
    "SELECT COUNT(*) AS messages, COUNT(DISTINCT session_id) AS conversations FROM chat_logs"
  );

  return {
    messages: Number(rows[0]?.messages) || 0,
    conversations: Number(rows[0]?.conversations) || 0,
  };
};

module.exports = { log, listSessions, totals };
