const db = require("../config/db");

const {
  sendMicrosoftEmail,
  escapeHtml,
} = require("../services/microsoftMail");

const liveVisitors = require("../services/liveVisitors");

// Set EMAIL_LOGO_URL in .env to show the logo in the "accepted" email
const LOGO_URL = process.env.EMAIL_LOGO_URL || "";

// ============================================================
// HELPERS
// ============================================================

// Promise wrapper so controllers can use async/await
const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });

const text = (value) => (typeof value === "string" ? value.trim() : "");

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// ============================================================
// EMAIL TEMPLATES
// ============================================================

const adminInquiryEmail = (c) => `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
    <h2 style="color:#e50914;">New Contact Inquiry</h2>
    <hr>
    <p><strong>Name:</strong> ${c.fname} ${c.lname}</p>
    <p><strong>Company:</strong> ${c.company}</p>
    <p><strong>Email:</strong> ${c.email}</p>
    <p><strong>Contact Number:</strong> ${c.contact || "Not provided"}</p>
    <p><strong>Service:</strong> ${c.services}</p>
    <p><strong>Estimated Budget:</strong> ${c.budget}</p>
    <p><strong>Message:</strong></p>
    <div style="background:#f5f5f5;padding:15px;border-radius:8px;">${c.msg}</div>
    <br>
    <p>This inquiry was submitted from the MotionPix website.</p>
  </div>
`;

const userConfirmationEmail = (c) => `
  <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;padding:30px;">
      <h2 style="color:#333;">Hello ${c.fname},</h2>
      <p>Thank you for reaching out to <strong>MotionPix</strong>.</p>
      <p>We have successfully received your inquiry regarding <strong>${c.services}</strong>.</p>
      <p>Our team is currently reviewing your request and will get back to you shortly with the necessary details.</p>
      <br>
      <p style="color:#555;">We appreciate your interest in working with us.</p>
      <p><strong>— Team MotionPix</strong></p>
    </div>
  </div>
`;

const acceptedEmail = (fname) => `
  <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

      <div style="background:#0f172a;padding:20px;text-align:center;">
        ${
          LOGO_URL
            ? `<img src="${escapeHtml(LOGO_URL)}" alt="MotionPix" style="height:50px;">`
            : `<span style="color:#ffffff;font-size:22px;font-weight:bold;">MotionPix</span>`
        }
      </div>

      <div style="padding:30px;color:#333;">
        <h2>Hello ${escapeHtml(fname)},</h2>
        <p>We’re happy to inform you that your inquiry has been</p>
        <p style="font-size:18px;"><b style="color:green;">✔ Successfully Accepted</b></p>
        <p>Our team will now proceed with the next steps and contact you shortly.</p>

        <div style="text-align:center;margin:30px 0;">
          <a href="https://motionpixindia.com/contact"
             style="background:#16a34a;color:#fff;padding:12px 25px;text-decoration:none;border-radius:6px;font-weight:bold;">
            View Details
          </a>
        </div>

        <p>If you have any questions, feel free to reply to this email.</p>
        <p><b>— Team MotionPix</b></p>
      </div>

      <div style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#777;">
        © ${new Date().getFullYear()} MotionPix. All rights reserved.
      </div>

    </div>
  </div>
`;

// ============================================================
// GET CONTACTS (admin dashboard)
// ============================================================

exports.getContacts = async (req, res) => {
  const search = text(String(req.query.search || ""));
  const status = text(String(req.query.status || ""));

  let sql = "SELECT * FROM contacts WHERE 1=1";
  const params = [];

  if (search) {
    sql += `
      AND (
        CONCAT(fname, ' ', lname) LIKE ?
        OR company LIKE ?
        OR email LIKE ?
      )
    `;

    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (status) {
    sql += " AND status = ?";
    params.push(status);
  }

  sql += " ORDER BY id DESC";

  try {
    const [results, chartData] = await Promise.all([
      query(sql, params),
      query(
        "SELECT services, COUNT(*) AS count FROM contacts GROUP BY services"
      ),
    ]);

    return res.render("admin", {
      data: results,
      search,
      status,
      chartData,
      emailLogs: [],
    });
  } catch (err) {
    console.error("❌ Get contacts error:", err);
    return res.status(500).send("Server error");
  }
};

// ============================================================
// LIVE VISITORS (snapshot for the admin map)
// ============================================================

exports.getLiveVisitors = (req, res) => {
  res.json(liveVisitors.getSnapshot());
};

// ============================================================
// FOOTFALL (daily / monthly)
// visitors = unique browsers, visits = total visits,
// new = first time ever, returning = visitors - new
// ============================================================

const toFootfallRow = (row) => ({
  period: String(row.period),
  visits: Number(row.visits) || 0,
  visitors: Number(row.visitors) || 0,
  newVisitors: Number(row.new_visitors) || 0,
});

exports.getFootfall = async (req, res) => {
  try {
    const [summaryRows, daily, monthly] = await Promise.all([
      query(`
        SELECT
          COALESCE(SUM(visited_at >= CURDATE()), 0) AS today_visits,
          COUNT(DISTINCT CASE WHEN visited_at >= CURDATE()
                THEN visitor_token END) AS today_visitors,
          COALESCE(SUM(visited_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')), 0) AS month_visits,
          COUNT(DISTINCT CASE WHEN visited_at >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
                THEN visitor_token END) AS month_visitors,
          COUNT(*) AS total_visits,
          COUNT(DISTINCT visitor_token) AS total_visitors
        FROM footfall_visits
      `),
      query(`
        SELECT
          DATE_FORMAT(visited_at, '%Y-%m-%d') AS period,
          COUNT(*) AS visits,
          COUNT(DISTINCT visitor_token) AS visitors,
          COALESCE(SUM(is_new), 0) AS new_visitors
        FROM footfall_visits
        WHERE visited_at >= (CURDATE() - INTERVAL 29 DAY)
        GROUP BY period
        ORDER BY period DESC
      `),
      query(`
        SELECT
          DATE_FORMAT(visited_at, '%Y-%m') AS period,
          COUNT(*) AS visits,
          COUNT(DISTINCT visitor_token) AS visitors,
          COALESCE(SUM(is_new), 0) AS new_visitors
        FROM footfall_visits
        WHERE visited_at >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 11 MONTH)
        GROUP BY period
        ORDER BY period DESC
      `),
    ]);

    const s = summaryRows[0] || {};

    return res.json({
      summary: {
        todayVisits: Number(s.today_visits) || 0,
        todayVisitors: Number(s.today_visitors) || 0,
        monthVisits: Number(s.month_visits) || 0,
        monthVisitors: Number(s.month_visitors) || 0,
        totalVisits: Number(s.total_visits) || 0,
        totalVisitors: Number(s.total_visitors) || 0,
      },
      daily: daily.map(toFootfallRow),
      monthly: monthly.map(toFootfallRow),
    });
  } catch (err) {
    console.error("❌ Footfall error:", err);
    return res.status(500).json({ message: "Could not load footfall." });
  }
};

// ============================================================
// CREATE CONTACT
// ============================================================

exports.createContact = async (req, res) => {
  const io = req.app.get("io");
  const body = req.body || {};

  const contact = {
    fname: text(body.fname),
    lname: text(body.lname),
    company: text(body.company),
    email: text(body.email),
    services: text(body.services),
    contact: text(body.contact),
    msg: text(body.msg),
    budget: text(body.budget),
  };

  // ================= VALIDATION =================

  const requiredFields = ["fname", "company", "email", "services", "msg", "budget"];

  if (requiredFields.some((field) => !contact[field])) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  // ================= SAVE =================

  let insertId;

  try {
    const result = await query(
      `INSERT INTO contacts
       (fname, lname, company, email, services, contact, msg, budget)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        contact.fname,
        contact.lname,
        contact.company,
        contact.email,
        contact.services,
        contact.contact,
        contact.msg,
        contact.budget,
      ]
    );

    insertId = result.insertId;
  } catch (err) {
    console.error("❌ Create contact error:", err);

    return res.status(500).json({
      success: false,
      message: "Could not save your inquiry.",
    });
  }

  // ================= SOCKET =================

  if (io) {
    io.emit("newContact", {
      id: insertId,
      ...contact,
      status: "pending",
      created_at: new Date(),
    });
  }

  // ================= EMAIL =================

  try {
    const safe = Object.fromEntries(
      Object.entries(contact).map(([key, value]) => [key, escapeHtml(value)])
    );

    await sendMicrosoftEmail({
      to: process.env.EMAIL_TO,
      subject: "🚀 New Inquiry – MotionPix",
      replyTo: contact.email,
      html: adminInquiryEmail(safe),
    });

    await sendMicrosoftEmail({
      to: contact.email,
      subject: "Inquiry Received ✨ – MotionPix",
      html: userConfirmationEmail(safe),
    });

    console.log("✅ Microsoft 365 emails sent successfully");
  } catch (error) {
    console.error("❌ Microsoft 365 email error:", error);
  }

  return res.json({
    success: true,
    message: "Inquiry submitted successfully.",
  });
};

// ============================================================
// MARK COMPLETE
// ============================================================

exports.markComplete = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send("Invalid contact id");
  }

  try {
    const rows = await query(
      "SELECT email, fname, status FROM contacts WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return res.status(404).send("Contact not found");
    }

    const user = rows[0];

    // Already completed: do not send the "accepted" email again
    if (user.status === "completed") {
      return res.redirect("/api/admin");
    }

    await query("UPDATE contacts SET status = 'completed' WHERE id = ?", [id]);

    try {
      await sendMicrosoftEmail({
        to: user.email,
        subject: "Inquiry Accepted ✅ – MotionPix",
        html: acceptedEmail(user.fname),
      });

      console.log("✅ Inquiry accepted email sent successfully");
    } catch (error) {
      console.error("❌ Microsoft 365 email error:", error);
    }

    return res.redirect("/api/admin");
  } catch (err) {
    console.error("❌ Mark complete error:", err);
    return res.status(500).send("Server error");
  }
};

// ============================================================
// DELETE
// ============================================================

exports.deleteContact = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send("Invalid contact id");
  }

  try {
    await query("DELETE FROM contacts WHERE id = ?", [id]);
    return res.redirect("/api/admin");
  } catch (err) {
    console.error("❌ Delete contact error:", err);
    return res.status(500).send("Server error");
  }
};