const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const liveVisitors = require("./services/liveVisitors");

const app = express();
const server = http.createServer(app);
const frontendDist = path.join(__dirname, "..", "dist");

// ============================================================
// CORS — localhost for development + live site domains
// ============================================================

const allowedOrigins = [
  "https://motionpixindia.com",
  "https://www.motionpixindia.com",
];

const isAllowedOrigin = (origin) =>
  !origin ||
  /^https?:\/\/localhost:\d+$/.test(origin) ||
  allowedOrigins.includes(origin);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => callback(null, isAllowedOrigin(origin)),
    credentials: true,
  },
});

// SOCKET GLOBAL
app.set("io", io);
app.set("trust proxy", 1);

// ✅ SESSION (ONLY ONCE) — also shared with Socket.IO to identify the admin
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

app.use(sessionMiddleware);

io.use((socket, next) => sessionMiddleware(socket.request, {}, next));

// ✅ CACHE FIX
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.static(path.join(__dirname, "public"), { index: false })
);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ROUTES
const contactRoutes = require("./routes/contactRoutes");
const careerRoutes = require("./routes/careerRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const contentRoutes = require("./routes/contentRoutes"); // CMS: editable page text
const teamRoutes = require("./routes/teamRoutes"); // CMS: team members
const adminRoutes = require("./routes/adminRoutes"); // Admin login, dashboard, etc.
app.use("/api", visitorRoutes);
app.use("/api", contactRoutes);
app.use("/api", careerRoutes);
app.use("/api", contentRoutes);
app.use("/api", teamRoutes);
app.use("/api", adminRoutes);

// HOME


// ERROR HANDLER — keeps the chatbot working with clean JSON errors
// (too-large uploads, bad JSON, blocked CORS) instead of an HTML error page
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      reply: "That file is too large. Please try a smaller image or PDF.",
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ reply: "Invalid request." });
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ reply: "Request blocked." });
  }

  console.error("❌ Unhandled error:", err);
  return res.status(500).json({ reply: "Server error. Please try again." });
});

// ============================================================
// FRONTEND — SERVE VITE PRODUCTION BUILD
// ============================================================

// ============================================================
// FRONTEND — SERVE VITE PRODUCTION BUILD
// ============================================================

// Serve React frontend assets
app.use(express.static(frontendDist, { index: false }));

// Main website
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// Admin login — keep /admin in the browser URL
app.get("/admin", (req, res) => {
  if (req.session?.isAuth) {
    return res.redirect("/api/admin");
  }

  return res.render("login");
});

// React Router fallback — preserve API and uploads
app.use((req, res, next) => {
  if (
    req.method !== "GET" ||
    req.path === "/api" ||
    req.path.startsWith("/api/") ||
    req.path.startsWith("/uploads/")
  ) {
    return next();
  }

  return res.sendFile(path.join(frontendDist, "index.html"));
});

// ============================================================
// SOCKET
// "/"      -> admin dashboard (login required for live data)
// "/live"  -> website visitors (presence tracking)
// ============================================================

liveVisitors.init(io, { isAllowedOrigin });

io.on("connection", (socket) => {
  if (socket.request.session?.isAuth) {
    liveVisitors.attachAdmin(socket);
    console.log("🟢 Admin Connected");
  }

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
