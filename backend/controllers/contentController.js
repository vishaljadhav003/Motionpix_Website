const db = require("../config/db");

// ================= PUBLIC: GET CONTENT FOR ONE PAGE =================
// Used by the React site. Returns only what has been saved in the DB
// for this page, as a flat { content_key: content_value } object.
// If a key is missing, the frontend keeps showing its own hardcoded
// default text — so the live site never breaks or goes blank.
exports.getContentByPage = (req, res) => {
  const { page } = req.params;

  db.query(
    "SELECT content_key, content_value FROM site_content WHERE page = ?",
    [page],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB Error" });

      const content = {};
      rows.forEach((row) => {
        content[row.content_key] = row.content_value;
      });

      res.json(content);
    }
  );
};

// ================= ADMIN: LIST ALL CONTENT, GROUPED BY PAGE =================
exports.getAdminContent = (req, res) => {
  db.query(
    "SELECT * FROM site_content ORDER BY page, section, content_key",
    (err, rows) => {
      if (err) throw err;

      // Group rows by page so the EJS view can render one card per page
      const grouped = {};
      rows.forEach((row) => {
        if (!grouped[row.page]) grouped[row.page] = [];
        grouped[row.page].push(row);
      });

      res.render("admin-content", { grouped });
    }
  );
};

// ================= ADMIN: ADD OR UPDATE ONE CONTENT FIELD =================
exports.saveContent = (req, res) => {
  const { page, section, content_key, content_value } = req.body;

  if (!page || !section || !content_key) {
    return res
      .status(400)
      .json({ error: "page, section and content_key are required" });
  }

  const sql = `
    INSERT INTO site_content (page, section, content_key, content_value)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE content_value = VALUES(content_value)
  `;

  db.query(sql, [page, section, content_key, content_value], (err) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json({ success: true });
  });
};

// ================= ADMIN: RESET ONE FIELD BACK TO ITS DEFAULT =================
// Deleting the row means the frontend falls back to its built-in default text.
exports.deleteContent = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM site_content WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.redirect("/api/admin/content");
  });
};
