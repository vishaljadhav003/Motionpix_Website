const fetch = require("node-fetch");
const db = require("../config/db");

// ============================================================
// LIVE VISITORS (real-time presence) + FOOTFALL (visit history)
// A visitor is "live" while at least one browser tab of theirs
// is connected to the /live socket namespace.
// ============================================================

const ADMIN_ROOM = "admins";
const TOKEN_PATTERN = /^[A-Za-z0-9-]{8,64}$/;

const CONFIG = {
  graceMs: 5000, // keeps a visitor alive during refresh / page change
  broadcastDelayMs: 300, // batches bursts of joins/leaves into one update
  maxTokensPerIp: 10, // stops one IP from inflating the live count
  geoTimeoutMs: 4000,
  geoCacheMs: 60 * 60 * 1000,
  geoFailCacheMs: 60 * 1000,
  geoCacheMaxEntries: 1000,
  visitWindowMinutes: 30, // coming back within this time = same visit
  heartbeatMs: 5 * 60 * 1000, // keeps long visits alive in the database
};

// token -> { token, ip, sockets, lat, lon, city, country, since, removeTimer, visitId }
const visitors = new Map();
const geoCache = new Map();

let ioInstance = null;
let liveNamespace = null;
let broadcastTimer = null;

// ------------------------------------------------------------
// DATABASE
// ------------------------------------------------------------

const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) return reject(err);
      return resolve(rows);
    });
  });

// One row = one visit of one visitor (browser token)
const tableReady = query(`
  CREATE TABLE IF NOT EXISTS footfall_visits (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    visitor_token VARCHAR(64) NOT NULL,
    visited_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_seen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_new TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY idx_visited_at (visited_at),
    KEY idx_token_seen (visitor_token, last_seen)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
`)
  .then(() => true)
  .catch((err) => {
    console.error("❌ Footfall table error:", err.message);
    return false;
  });

// Counts a visit only when the visitor was not seen in the last 30 minutes
const recordVisit = async (visitor) => {
  if (!(await tableReady)) return;

  const recent = await query(
    `SELECT id FROM footfall_visits
     WHERE visitor_token = ?
       AND last_seen >= (NOW() - INTERVAL ${CONFIG.visitWindowMinutes} MINUTE)
     ORDER BY id DESC
     LIMIT 1`,
    [visitor.token]
  );

  // Same visit continues (refresh, reconnect, server restart)
  if (recent.length) {
    visitor.visitId = recent[0].id;
    await query("UPDATE footfall_visits SET last_seen = NOW() WHERE id = ?", [
      visitor.visitId,
    ]);
    return;
  }

  const known = await query(
    "SELECT 1 FROM footfall_visits WHERE visitor_token = ? LIMIT 1",
    [visitor.token]
  );

  const result = await query(
    "INSERT INTO footfall_visits (visitor_token, is_new) VALUES (?, ?)",
    [visitor.token, known.length ? 0 : 1]
  );

  visitor.visitId = result.insertId;
};

const touchVisit = (visitor) => {
  if (!visitor || !visitor.visitId) return;

  query("UPDATE footfall_visits SET last_seen = NOW() WHERE id = ?", [
    visitor.visitId,
  ]).catch((err) => {
    console.error("❌ Footfall update error:", err.message);
  });
};

// Long visits stay "recent", so a reconnect never counts as a new visit
setInterval(() => {
  visitors.forEach((visitor) => touchVisit(visitor));
}, CONFIG.heartbeatMs).unref();

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------

const normalizeIp = (ip) => String(ip || "").replace(/^::ffff:/, "");

const isPrivateIp = (ip) =>
  !ip ||
  ip === "::1" ||
  /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip) ||
  /^(f[cd][0-9a-f]{2}:|fe80:)/i.test(ip);

const getClientIp = (socket) => {
  const forwarded = socket.handshake.headers["x-forwarded-for"];

  const raw =
    (typeof forwarded === "string" && forwarded.split(",")[0].trim()) ||
    socket.handshake.address;

  return normalizeIp(raw);
};

const toLocation = (row) => {
  const lat = Number(row?.lat);
  const lon = Number(row?.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;

  return {
    lat,
    lon,
    city: String(row.city || ""),
    country: String(row.country || ""),
  };
};

// Location already stored by the visitor tracking (visitors table)
const findStoredLocation = (token) =>
  new Promise((resolve) => {
    db.query(
      `SELECT city, country, lat, lon
       FROM visitors
       WHERE visitor_token = ? AND lat IS NOT NULL AND lon IS NOT NULL
       LIMIT 1`,
      [token],
      (err, rows) => {
        if (err || !Array.isArray(rows) || !rows.length) {
          return resolve(null);
        }

        return resolve(toLocation(rows[0]));
      }
    );
  });

// Fallback: IP geolocation (cached per IP).
// Local/private IPs resolve to this server's own public IP (useful in development).
const fetchGeo = async (ip) => {
  const cacheKey = isPrivateIp(ip) ? "self" : ip;
  const cached = geoCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.location;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CONFIG.geoTimeoutMs);

  let location = null;

  try {
    const target = cacheKey === "self" ? "" : encodeURIComponent(ip);

    const response = await fetch(
      `http://ip-api.com/json/${target}?fields=status,country,city,lat,lon`,
      { signal: controller.signal }
    );

    if (response.ok) {
      const data = await response.json();

      if (data.status === "success") {
        location = toLocation(data);
      }
    }
  } catch (err) {
    console.error("❌ Live visitor geo lookup failed:", err.message);
  } finally {
    clearTimeout(timer);
  }

  if (geoCache.size >= CONFIG.geoCacheMaxEntries) {
    geoCache.clear();
  }

  geoCache.set(cacheKey, {
    location,
    expiresAt:
      Date.now() + (location ? CONFIG.geoCacheMs : CONFIG.geoFailCacheMs),
  });

  return location;
};

const countTokensForIp = (ip) => {
  let total = 0;

  visitors.forEach((visitor) => {
    if (visitor.ip === ip) total += 1;
  });

  return total;
};

// ------------------------------------------------------------
// SNAPSHOT + BROADCAST
// ------------------------------------------------------------

const getSnapshot = () => ({
  count: visitors.size,
  visitors: Array.from(visitors.values()).map((visitor) => ({
    lat: visitor.lat,
    lon: visitor.lon,
    city: visitor.city,
    country: visitor.country,
    since: visitor.since,
  })),
});

const scheduleBroadcast = () => {
  if (!ioInstance || broadcastTimer) return;

  broadcastTimer = setTimeout(() => {
    broadcastTimer = null;
    ioInstance.to(ADMIN_ROOM).emit("liveVisitors", getSnapshot());

    // Public visitors only get the number (no locations)
    if (liveNamespace) {
      liveNamespace.emit("liveCount", { count: visitors.size });
    }
  }, CONFIG.broadcastDelayMs);
};

const resolveLocation = async (visitor) => {
  const location =
    (await findStoredLocation(visitor.token)) || (await fetchGeo(visitor.ip));

  // Visitor may have left while the lookup was running
  if (!location || visitors.get(visitor.token) !== visitor) return;

  Object.assign(visitor, location);
  scheduleBroadcast();
};

// ------------------------------------------------------------
// PUBLIC API
// ------------------------------------------------------------

// Website visitors connect to the "/live" namespace
const init = (io, { isAllowedOrigin = () => true } = {}) => {
  ioInstance = io;

  const live = io.of("/live");
  liveNamespace = live;

  live.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (typeof token !== "string" || !TOKEN_PATTERN.test(token)) {
      return next(new Error("invalid token"));
    }

    if (!isAllowedOrigin(socket.handshake.headers.origin)) {
      return next(new Error("origin not allowed"));
    }

    const ip = getClientIp(socket);

    if (!visitors.has(token) && countTokensForIp(ip) >= CONFIG.maxTokensPerIp) {
      return next(new Error("too many visitors"));
    }

    socket.data.token = token;
    socket.data.ip = ip;

    return next();
  });

  live.on("connection", (socket) => {
    const { token, ip } = socket.data;

    let visitor = visitors.get(token);

    if (!visitor) {
      visitor = {
        token,
        ip,
        sockets: new Set(),
        lat: null,
        lon: null,
        city: "",
        country: "",
        since: Date.now(),
        removeTimer: null,
        visitId: null,
      };

      visitors.set(token, visitor);

      resolveLocation(visitor).catch((err) => {
        console.error("❌ Live visitor location error:", err.message);
      });

      // Footfall: new presence = a visit (unless seen in the last 30 minutes)
      recordVisit(visitor).catch((err) => {
        console.error("❌ Footfall record error:", err.message);
      });
    }

    if (visitor.removeTimer) {
      clearTimeout(visitor.removeTimer);
      visitor.removeTimer = null;
    }

    visitor.sockets.add(socket.id);
    scheduleBroadcast();

    socket.on("disconnect", () => {
      visitor.sockets.delete(socket.id);

      if (visitor.sockets.size > 0 || visitor.removeTimer) return;

      visitor.removeTimer = setTimeout(() => {
        if (visitor.sockets.size === 0 && visitors.get(token) === visitor) {
          visitors.delete(token);
          touchVisit(visitor);
        }

        scheduleBroadcast();
      }, CONFIG.graceMs);
    });
  });
};

// Logged-in admin sockets receive live updates (and the current snapshot right away)
const attachAdmin = (socket) => {
  socket.join(ADMIN_ROOM);
  socket.emit("liveVisitors", getSnapshot());
};

module.exports = { init, attachAdmin, getSnapshot };