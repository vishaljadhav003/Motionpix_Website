const express = require("express");
const router = express.Router();
const db = require("../config/db");
const axios = require("axios");
const auth = require("../middleware/auth");

// ============================================================
// HELPERS
// ============================================================

const TOKEN_PATTERN = /^[A-Za-z0-9-]{16,64}$/;

// Crawlers such as Googlebot run JavaScript, so without this filter every
// crawl would be counted as a new visitor
const BOT_PATTERN =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|python-requests|curl|wget/i;

// Rounded to 2 decimals (about 1 km): enough for a city map, not a home address
const roundCoordinate = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const number = Number(value);

  return Number.isFinite(number) ? Math.round(number * 100) / 100 : null;
};

const normalizeIP = (ip) => String(ip || "").replace(/^::ffff:/, "");

// Local / private addresses cannot be located
const isPrivateIP = (ip) =>
  !ip ||
  ip === "unknown" ||
  ip === "::1" ||
  /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|fc|fd|fe80)/i.test(ip);

// Location comes from the visitor's IP on the server,
// so the browser never asks the user for permission
const lookupIPLocation = async (ip) => {
  const empty = { country: null, city: null, lat: null, lon: null };

  if (isPrivateIP(ip)) return empty;

  try {
    const { data } = await axios.get(
      `https://ipwho.is/${encodeURIComponent(ip)}`,
      {
        params: { fields: "success,country,city,region,latitude,longitude" },
        headers: { "User-Agent": "motionpix-app" },
        timeout: 5000,
      }
    );

    if (!data || data.success === false) return empty;

    return {
      country: data.country || null,
      city: data.city || data.region || null,
      lat: roundCoordinate(data.latitude),
      lon: roundCoordinate(data.longitude),
    };
  } catch (err) {
    console.log("IP Geo Error:", err.message);

    return empty;
  }
};

// Simple per-IP limit so the route cannot be used to flood the table
const trackBuckets = new Map();
const TRACK_LIMIT = { windowMs: 60 * 1000, max: 30 };

const trackRateLimit = (req, res, next) => {
  const now = Date.now();
  const key = req.ip || "unknown";
  const bucket = trackBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    trackBuckets.set(key, { count: 1, resetAt: now + TRACK_LIMIT.windowMs });

    return next();
  }

  bucket.count += 1;

  if (bucket.count > TRACK_LIMIT.max) {
    return res.status(429).json({ error: "Too many requests" });
  }

  return next();
};

setInterval(() => {
  const now = Date.now();

  for (const [key, bucket] of trackBuckets) {
    if (now > bucket.resetAt) trackBuckets.delete(key);
  }
}, TRACK_LIMIT.windowMs).unref();

// ============================
// ✅ POST (TRACK VISITOR)
// One browser (visitorToken) = one visitor, however many times it comes back.
// New or returning is decided here on the server.
// Needs a UNIQUE index on visitors.visitor_token.
// ============================
router.post("/track-visitor", trackRateLimit, (req, res) => {
  const io = req.app.get("io");
  const { visitorToken } = req.body || {};
  const userAgent = req.headers["user-agent"] || "unknown";

  if (typeof visitorToken !== "string" || !TOKEN_PATTERN.test(visitorToken)) {
    return res.status(400).json({ error: "valid visitorToken required" });
  }

  if (BOT_PATTERN.test(userAgent)) {
    return res.json({ success: true, skipped: true });
  }

  // "trust proxy" is enabled in app.js, so req.ip is the real client IP
  const realIP = normalizeIP(req.ip || req.socket.remoteAddress) || "unknown";

  db.query(
    "SELECT lat FROM visitors WHERE visitor_token = ? LIMIT 1",
    [visitorToken],
    async (selectErr, rows) => {
      if (selectErr) {
        console.log(selectErr);
        return res.status(500).json({ error: "Server error" });
      }

      const isKnown = rows.length > 0;

      // Returning visitor that already has a location: nothing to do
      if (isKnown && rows[0].lat != null) {
        return res.json({ success: true, isNew: false });
      }

      // The IP lookup runs only when it is really needed
      const place = await lookupIPLocation(realIP);
      const hasLocation = place.lat !== null && place.lon !== null;

      // Returning visitor without a stored location: fill it, never overwrite it
      if (isKnown) {
        return db.query(
          `UPDATE visitors
             SET country = COALESCE(?, country),
                 city    = COALESCE(?, city),
                 lat     = COALESCE(?, lat),
                 lon     = COALESCE(?, lon)
           WHERE visitor_token = ?`,
          [place.country, place.city, place.lat, place.lon, visitorToken],
          (updateErr) => {
            if (updateErr) console.log(updateErr);

            return res.json({ success: true, isNew: false });
          }
        );
      }

      // Brand-new visitor
      return db.query(
        `INSERT INTO visitors
           (visitor_token, realIP, user_agent, country, city, lat, lon)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          visitorToken,
          realIP,
          userAgent,
          place.country,
          place.city,
          place.lat,
          place.lon,
        ],
        (insertErr) => {
          if (insertErr) {
            // The same browser sent two requests at once: it is already counted
            if (insertErr.code === "ER_DUP_ENTRY") {
              return res.json({ success: true, isNew: false });
            }

            console.log(insertErr);
            return res.status(500).json({ error: "Server error" });
          }

          // `total` always comes from the real number of visitor rows
          db.query("SELECT COUNT(*) AS total FROM visitors", (countErr, countRows) => {
            if (countErr || !countRows.length) {
              console.log(countErr);
              return res.json({ success: true, isNew: true });
            }

            const total = countRows[0].total;

            db.query(
              "UPDATE visitor_stats SET total = ?, last_total = ? WHERE id = 1",
              [total, total]
            );

            // Only the admin dashboard receives the new visitor and its location
            io.to("admins").emit("visitorUpdate", {
              country: place.country,
              city: place.city,
              lat: hasLocation ? place.lat : null,
              lon: hasLocation ? place.lon : null,
              total,
            });

            return res.json({ success: true, isNew: true });
          });
        }
      );
    }
  );
});

// ============================
// ✅ GET (TOTAL UNIQUE VISITORS)
// ============================
router.get("/track-visitor", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM visitors", (err, rows) => {
    if (err || !rows.length) {
      console.log(err);
      return res.status(500).json({ total: 0, last: 0 });
    }

    const total = rows[0].total;

    res.json({ total, last: total });
  });
});

// ============================
// ✅ ALL VISITORS (MAP LOAD) — admin only, it contains locations
// ============================
router.get("/all-visitors", auth, (req, res) => {
  db.query("SELECT city, country, lat, lon FROM visitors", (err, result) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }

    res.json(result);
  });
});

module.exports = router;
