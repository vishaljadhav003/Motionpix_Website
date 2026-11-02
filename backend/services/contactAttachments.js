const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const db = require("../config/db");

// ============================================================
// CONTACT ATTACHMENTS
// Files are stored OUTSIDE the public /uploads folder, so they can only be
// opened through the admin-only download route.
// ============================================================

const STORAGE_DIR = path.join(__dirname, "..", "private_uploads", "contacts");

const LIMITS = {
  maxFiles: 3,
  maxFileBytes: 5 * 1024 * 1024,
  maxTotalBytes: 10 * 1024 * 1024,
};

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

// Created automatically, so no manual SQL is needed
const tableReady = query(`
  CREATE TABLE IF NOT EXISTS contact_attachments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    contact_id INT NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(100) NOT NULL,
    mime VARCHAR(100) NOT NULL,
    size INT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_contact_id (contact_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
`)
  .then(() => true)
  .catch((err) => {
    console.error("❌ contact_attachments table error:", err.message);
    return false;
  });

// ------------------------------------------------------------
// FILE VALIDATION (extension + real file signature)
// ------------------------------------------------------------

const startsWith = (buffer, bytes, offset = 0) =>
  bytes.every((byte, index) => buffer[offset + index] === byte);

const isPdf = (b) => startsWith(b, [0x25, 0x50, 0x44, 0x46]);
const isPng = (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const isJpeg = (b) => startsWith(b, [0xff, 0xd8, 0xff]);
const isWebp = (b) =>
  startsWith(b, [0x52, 0x49, 0x46, 0x46]) && startsWith(b, [0x57, 0x45, 0x42, 0x50], 8);
const isZipBased = (b) => startsWith(b, [0x50, 0x4b, 0x03, 0x04]); // docx, xlsx, pptx
const isOldOffice = (b) => startsWith(b, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]); // doc, xls, ppt
const isPlainText = (b) => !b.subarray(0, 8192).includes(0);

const FILE_TYPES = {
  pdf: { mime: "application/pdf", check: isPdf },
  png: { mime: "image/png", check: isPng },
  jpg: { mime: "image/jpeg", check: isJpeg },
  jpeg: { mime: "image/jpeg", check: isJpeg },
  webp: { mime: "image/webp", check: isWebp },
  doc: { mime: "application/msword", check: isOldOffice },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    check: isZipBased,
  },
  xls: { mime: "application/vnd.ms-excel", check: isOldOffice },
  xlsx: {
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    check: isZipBased,
  },
  ppt: { mime: "application/vnd.ms-powerpoint", check: isOldOffice },
  pptx: {
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    check: isZipBased,
  },
  txt: { mime: "text/plain", check: isPlainText },
  csv: { mime: "text/csv", check: isPlainText },
};

const hasType = (ext) => Object.prototype.hasOwnProperty.call(FILE_TYPES, ext);

// Removes folders, control characters and symbols that are unsafe in a file name
const cleanFileName = (name) => {
  const base = String(name).split(/[\\/]/).pop();
  const cleaned = base.replace(/[\u0000-\u001f\u007f<>:"|?*]/g, "").trim();

  // slice(-120) keeps the extension at the end of very long names
  return (cleaned || "file").slice(-120);
};

const mb = (bytes) => `${bytes / (1024 * 1024)} MB`;

// Input: [{ name, data }] where data is base64 (a data URL prefix is allowed)
// Output: { files: [...] } or { error: "message for the visitor" }
const validateUploads = (raw) => {
  if (raw === undefined || raw === null) return { files: [] };

  if (!Array.isArray(raw)) return { error: "Invalid attachments." };

  if (raw.length > LIMITS.maxFiles) {
    return { error: `You can attach up to ${LIMITS.maxFiles} files.` };
  }

  const files = [];
  let total = 0;

  for (const item of raw) {
    if (!item || typeof item.name !== "string" || typeof item.data !== "string") {
      return { error: "Invalid attachment." };
    }

    const originalName = cleanFileName(item.name);
    const ext = path.extname(originalName).slice(1).toLowerCase();

    if (!hasType(ext)) {
      return { error: `"${originalName}" is not a supported file type.` };
    }

    const base64 = item.data.replace(/^data:[^;,]*;base64,/, "");

    // Checked before decoding, so a huge string never reaches the memory
    if (base64.length > Math.ceil((LIMITS.maxFileBytes * 4) / 3) + 4) {
      return { error: `"${originalName}" is larger than ${mb(LIMITS.maxFileBytes)}.` };
    }

    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64)) {
      return { error: `"${originalName}" could not be read.` };
    }

    const buffer = Buffer.from(base64, "base64");

    if (!buffer.length) {
      return { error: `"${originalName}" is empty.` };
    }

    if (buffer.length > LIMITS.maxFileBytes) {
      return { error: `"${originalName}" is larger than ${mb(LIMITS.maxFileBytes)}.` };
    }

    total += buffer.length;

    if (total > LIMITS.maxTotalBytes) {
      return { error: `Total attachment size cannot exceed ${mb(LIMITS.maxTotalBytes)}.` };
    }

    if (!FILE_TYPES[ext].check(buffer)) {
      return { error: `"${originalName}" does not look like a valid .${ext} file.` };
    }

    files.push({
      originalName,
      ext,
      mime: FILE_TYPES[ext].mime,
      size: buffer.length,
      buffer,
    });
  }

  return { files };
};

// ------------------------------------------------------------
// STORAGE
// ------------------------------------------------------------

const unlinkQuietly = (storedName) =>
  fs.promises.unlink(path.join(STORAGE_DIR, path.basename(storedName))).catch(() => {});

// Writes the files and their database rows. Returns [{ id, name, size }].
// Anything already written is removed again if a step fails.
const saveFiles = async (contactId, files) => {
  if (!(await tableReady)) {
    throw new Error("contact_attachments table is not available");
  }

  await fs.promises.mkdir(STORAGE_DIR, { recursive: true });

  const written = [];

  try {
    for (const file of files) {
      const storedName = `${crypto.randomBytes(16).toString("hex")}.${file.ext}`;

      await fs.promises.writeFile(path.join(STORAGE_DIR, storedName), file.buffer, {
        flag: "wx",
      });

      written.push({ file, storedName });
    }

    const saved = [];

    for (const { file, storedName } of written) {
      const result = await query(
        `INSERT INTO contact_attachments
         (contact_id, original_name, stored_name, mime, size)
         VALUES (?, ?, ?, ?, ?)`,
        [contactId, file.originalName, storedName, file.mime, file.size]
      );

      saved.push({ id: result.insertId, name: file.originalName, size: file.size });
    }

    return saved;
  } catch (err) {
    await Promise.all(written.map(({ storedName }) => unlinkQuietly(storedName)));
    await query("DELETE FROM contact_attachments WHERE contact_id = ?", [contactId]).catch(
      () => {}
    );

    throw err;
  }
};

// Map: contact id -> [{ id, name, size }]. Never throws (the dashboard must still open).
const listForContacts = async (contactIds) => {
  const grouped = new Map();

  if (!contactIds.length || !(await tableReady)) return grouped;

  try {
    const rows = await query(
      `SELECT id, contact_id, original_name, size
       FROM contact_attachments
       WHERE contact_id IN (?)
       ORDER BY id`,
      [contactIds]
    );

    rows.forEach((row) => {
      if (!grouped.has(row.contact_id)) grouped.set(row.contact_id, []);

      grouped.get(row.contact_id).push({
        id: row.id,
        name: row.original_name,
        size: row.size,
      });
    });
  } catch (err) {
    console.error("❌ List attachments error:", err.message);
  }

  return grouped;
};

const findById = async (id) => {
  if (!(await tableReady)) return null;

  const rows = await query(
    "SELECT original_name, stored_name, mime FROM contact_attachments WHERE id = ? LIMIT 1",
    [id]
  );

  if (!rows.length) return null;

  return {
    name: rows[0].original_name,
    mime: rows[0].mime,
    filePath: path.join(STORAGE_DIR, path.basename(rows[0].stored_name)),
  };
};

// Deletes the files and rows of one contact
const removeForContact = async (contactId) => {
  if (!(await tableReady)) return;

  const rows = await query(
    "SELECT stored_name FROM contact_attachments WHERE contact_id = ?",
    [contactId]
  );

  await query("DELETE FROM contact_attachments WHERE contact_id = ?", [contactId]);
  await Promise.all(rows.map((row) => unlinkQuietly(row.stored_name)));
};

module.exports = {
  LIMITS,
  validateUploads,
  saveFiles,
  listForContacts,
  findById,
  removeForContact,
};
