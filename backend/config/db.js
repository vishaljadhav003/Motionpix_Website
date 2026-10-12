const mysql = require("mysql2");

// ============================================================
// ENV CHECK — tells you in Runtime logs exactly what is missing
// ============================================================

const requiredEnv = ["DB_USER", "DB_PASSWORD", "DB_NAME"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(
    "❌ Missing database environment variables:",
    missingEnv.join(", ")
  );
}

// ============================================================
// CONNECTION POOL
// A pool replaces the single createConnection():
// - reconnects automatically if MySQL drops the connection
// - a failed connection returns an error to the query callback
//   quickly, instead of leaving the request hanging (504)
// - db.query(...) and db.promise() work exactly as before
// ============================================================

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  connectTimeout: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Startup test only — never crashes the app
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err.code, "-", err.message);
    return;
  }

  console.log("✅ MySQL Connected");
  connection.release();
});

module.exports = db;
