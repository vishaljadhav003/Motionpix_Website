const db = require("../config/db");

const { sendMicrosoftEmail } = require("../services/microsoftMail");

const liveVisitors = require("../services/liveVisitors");
const attachments = require("../services/contactAttachments");
const templates = require("../services/emailTemplates");

const {
  serviceLabel,
  budgetLabel,
  isValidService,
  isValidBudget,
  formatBytes,
} = require("../config/contactOptions");

// Files are attached to the admin email only when they are small enough
const MAX_EMAIL_ATTACHMENT_BYTES = 2.5 * 1024 * 1024;

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
    const [results, chartRows] = await Promise.all([
      query(sql, params),
      query(
        "SELECT services, COUNT(*) AS count FROM contacts GROUP BY services"
      ),
    ]);

    const filesByContact = await attachments.listForContacts(
      results.map((row) => row.id)
    );

    // The dashboard shows the readable labels, never the form slugs
    const data = results.map((row) => ({
      ...row,
      serviceLabel: serviceLabel(row.services),
      budgetLabel: budgetLabel(row.budget),
      files: filesByContact.get(row.id) || [],
    }));

    // Old rows saved with a slug and new rows can share one label
    const chartTotals = new Map();

    chartRows.forEach((row) => {
      const label = serviceLabel(row.services);
      chartTotals.set(label, (chartTotals.get(label) || 0) + Number(row.count));
    });

    const chartData = Array.from(chartTotals, ([services, count]) => ({
      services,
      count,
    }));

    return res.render("admin", {
      data,
      search,
      status,
      chartData,
      emailLogs: [],
      formatBytes,
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

  if (!isValidService(contact.services) || !isValidBudget(contact.budget)) {
    return res.status(400).json({
      success: false,
      message: "Please choose a valid service and budget.",
    });
  }

  const upload = attachments.validateUploads(body.attachments);

  if (upload.error) {
    return res.status(400).json({ success: false, message: upload.error });
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

  let savedFiles = [];

  if (upload.files.length) {
    try {
      savedFiles = await attachments.saveFiles(insertId, upload.files);
    } catch (err) {
      console.error("❌ Save attachments error:", err);

      // No half-saved inquiry: the visitor can simply send the form again
      await query("DELETE FROM contacts WHERE id = ?", [insertId]).catch(() => {});

      return res.status(500).json({
        success: false,
        message: "Could not save your attachments. Please try again.",
      });
    }
  }

  // Readable values for the dashboard and the emails
  const display = {
    ...contact,
    service: serviceLabel(contact.services),
    budget: budgetLabel(contact.budget),
  };

  // ================= SOCKET (admin dashboard only) =================

  if (io) {
    io.to("admins").emit("newContact", {
      id: insertId,
      ...contact,
      serviceLabel: display.service,
      budgetLabel: display.budget,
      attachments: savedFiles,
      status: "pending",
      created_at: new Date(),
    });
  }

  // ================= EMAIL =================
  // Sent separately, so one failed email never blocks the other

  const totalBytes = upload.files.reduce((sum, file) => sum + file.size, 0);
  const attachToEmail = upload.files.length > 0 && totalBytes <= MAX_EMAIL_ATTACHMENT_BYTES;

  try {
    const adminMail = templates.adminInquiryEmail(display, savedFiles, attachToEmail);

    await sendMicrosoftEmail({
      to: process.env.EMAIL_TO,
      subject: adminMail.subject,
      replyTo: contact.email,
      html: adminMail.html,
      attachments: attachToEmail
        ? upload.files.map((file) => ({
            name: file.originalName,
            contentType: file.mime,
            content: file.buffer,
          }))
        : [],
    });
  } catch (error) {
    console.error("❌ Admin inquiry email error:", error);
  }

  try {
    const userMail = templates.userConfirmationEmail(display, savedFiles);

    await sendMicrosoftEmail({
      to: contact.email,
      subject: userMail.subject,
      html: userMail.html,
    });
  } catch (error) {
    console.error("❌ Visitor confirmation email error:", error);
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
      "SELECT email, fname, services, status FROM contacts WHERE id = ?",
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
      const mail = templates.acceptedEmail({
        fname: user.fname,
        service: serviceLabel(user.services),
      });

      await sendMicrosoftEmail({
        to: user.email,
        subject: mail.subject,
        html: mail.html,
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

    // The uploaded files go away together with the inquiry
    await attachments.removeForContact(id).catch((err) => {
      console.error("❌ Remove attachments error:", err.message);
    });

    return res.redirect("/api/admin");
  } catch (err) {
    console.error("❌ Delete contact error:", err);
    return res.status(500).send("Server error");
  }
};

// ============================================================
// DOWNLOAD ATTACHMENT (admin only)
// ============================================================

exports.downloadAttachment = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send("Invalid file id");
  }

  try {
    const file = await attachments.findById(id);

    if (!file) {
      return res.status(404).send("File not found");
    }

    res.set("X-Content-Type-Options", "nosniff");

    return res.download(file.filePath, file.name, (err) => {
      if (err && !res.headersSent) {
        res.status(404).send("File not found");
      }
    });
  } catch (err) {
    console.error("❌ Download attachment error:", err);
    return res.status(500).send("Server error");
  }
};
