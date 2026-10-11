const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ================= PUBLIC: GET TEAM LIST =================
exports.getTeam = (req, res) => {
  db.query(
    "SELECT * FROM team_members ORDER BY display_order ASC, id ASC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB Error" });
      res.json(rows);
    }
  );
};

// ================= ADMIN: LIST FOR DASHBOARD =================
exports.getAdminTeam = (req, res) => {
  db.query(
    "SELECT * FROM team_members ORDER BY display_order ASC, id ASC",
    (err, rows) => {
      if (err) throw err;
      res.render("admin-team", { data: rows });
    }
  );
};

// ================= ADMIN: ADD MEMBER =================
exports.addMember = (req, res) => {
  const { name, role, location, about, display_order } = req.body;
  const photo = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO team_members (name, role, location, about, photo, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, role, location, about, photo, display_order || 0],
    (err) => {
      if (err) return res.status(500).json({ error: "DB Error" });
      res.redirect("/api/admin/team");
    }
  );
};

// ================= ADMIN: UPDATE MEMBER =================
exports.updateMember = (req, res) => {
  const { id } = req.params;
  const { name, role, location, about, display_order } = req.body;

  // Only replace the photo column when a new file was actually uploaded,
  // otherwise the existing photo stays untouched.
  const newPhoto = req.file ? req.file.filename : null;

  const sql = newPhoto
    ? "UPDATE team_members SET name=?, role=?, location=?, about=?, display_order=?, photo=? WHERE id=?"
    : "UPDATE team_members SET name=?, role=?, location=?, about=?, display_order=? WHERE id=?";

  const params = newPhoto
    ? [name, role, location, about, display_order || 0, newPhoto, id]
    : [name, role, location, about, display_order || 0, id];

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.redirect("/api/admin/team");
  });
};

// ================= ADMIN: DELETE MEMBER =================
exports.deleteMember = (req, res) => {
  const { id } = req.params;

  db.query("SELECT photo FROM team_members WHERE id=?", [id], (err, rows) => {
    if (err) throw err;

    // Clean up the old photo file from disk along with the DB row
    if (rows[0] && rows[0].photo) {
      const filePath = path.join(__dirname, "..", "uploads", rows[0].photo);
      fs.unlink(filePath, () => {});
    }

    db.query("DELETE FROM team_members WHERE id=?", [id], (err2) => {
      if (err2) throw err2;
      res.redirect("/api/admin/team");
    });
  });
};
