const { escapeHtml } = require("./microsoftMail");
const { formatBytes } = require("../config/contactOptions");

// ============================================================
// STANDARD EMAIL TEMPLATES
// One shared layout for every MotionPix email: table based, inline styles,
// light colours, a hidden preheader, plain subjects (no emojis / symbols)
// so they look the same in Gmail, Outlook and Yahoo.
// ============================================================

const BRAND = {
  name: "MotionPix",
  color: "#e50914",
  dark: "#0f172a",
  siteUrl: (process.env.SITE_URL || "https://motionpixindia.com").replace(/\/+$/, ""),
  logoUrl: process.env.EMAIL_LOGO_URL || "",
  email: process.env.EMAIL_FROM || "info@motionpixindia.com",
  phone: "+91 98220 55205",
};

const FONT = "Arial,Helvetica,sans-serif";

const esc = (value) => escapeHtml(value == null ? "" : value);

// Escaped text with line breaks kept (a visitor's message keeps its paragraphs)
const multiline = (value) => esc(value).replace(/\r\n|\r|\n/g, "<br>");

// Subjects must be one clean line
const oneLine = (value) => String(value || "").replace(/\s+/g, " ").trim();

const fullName = (c) => oneLine(`${c.fname || ""} ${c.lname || ""}`);

// ------------------------------------------------------------
// BUILDING BLOCKS
// ------------------------------------------------------------

const detailRows = (rows) =>
  rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px 10px 0;width:38%;vertical-align:top;font-family:${FONT};font-size:13px;color:#6b7280;border-bottom:1px solid #eef0f3;">${esc(label)}</td>
          <td style="padding:10px 0;vertical-align:top;font-family:${FONT};font-size:15px;color:#111827;font-weight:bold;border-bottom:1px solid #eef0f3;word-break:break-word;">${value}</td>
        </tr>`
    )
    .join("");

const detailTable = (rows) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 4px;">
    ${detailRows(rows)}
  </table>`;

const messageBox = (label, message) => `
  <p style="margin:22px 0 8px;font-family:${FONT};font-size:13px;color:#6b7280;">${esc(label)}</p>
  <div style="padding:14px 16px;background:#f5f6f8;border-left:3px solid ${BRAND.color};border-radius:6px;font-family:${FONT};font-size:15px;line-height:1.6;color:#111827;word-break:break-word;">${multiline(message)}</div>`;

const fileList = (files, note) => {
  if (!files || !files.length) return "";

  const items = files
    .map(
      (file) =>
        `<li style="margin:0 0 4px;">${esc(file.name)} <span style="color:#6b7280;">(${esc(formatBytes(file.size))})</span></li>`
    )
    .join("");

  return `
  <p style="margin:22px 0 8px;font-family:${FONT};font-size:13px;color:#6b7280;">Attachments (${files.length})</p>
  <ul style="margin:0;padding-left:20px;font-family:${FONT};font-size:15px;line-height:1.6;color:#111827;">${items}</ul>
  ${note ? `<p style="margin:8px 0 0;font-family:${FONT};font-size:13px;color:#6b7280;">${esc(note)}</p>` : ""}`;
};

const button = (label, href, color = BRAND.color) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:28px auto 4px;">
    <tr>
      <td align="center" bgcolor="${color}" style="border-radius:6px;">
        <a href="${esc(href)}" target="_blank" style="display:inline-block;padding:12px 26px;font-family:${FONT};font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">${esc(label)}</a>
      </td>
    </tr>
  </table>`;

const paragraph = (html) =>
  `<p style="margin:0 0 14px;font-family:${FONT};font-size:15px;line-height:1.6;color:#374151;">${html}</p>`;

const layout = ({ preheader, heading, content }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#f4f6f8;font-size:1px;line-height:1px;">${esc(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f6f8;">
    <tr>
      <td align="center" style="padding:24px 12px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">

          <tr>
            <td align="center" style="background:${BRAND.dark};padding:20px;border-bottom:3px solid ${BRAND.color};">
              ${
                BRAND.logoUrl
                  ? `<img src="${esc(BRAND.logoUrl)}" alt="${BRAND.name}" height="48" style="display:block;height:48px;border:0;">`
                  : `<span style="font-family:${FONT};font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">${BRAND.name}</span>`
              }
            </td>
          </tr>

          <tr>
            <td style="padding:30px 28px 26px;">
              <h1 style="margin:0 0 18px;font-family:${FONT};font-size:22px;line-height:1.3;color:#111827;">${esc(heading)}</h1>
              ${content}
            </td>
          </tr>

          <tr>
            <td align="center" style="background:#f1f5f9;padding:16px 20px;font-family:${FONT};font-size:12px;line-height:1.6;color:#6b7280;">
              ${BRAND.name} &middot; <a href="mailto:${esc(BRAND.email)}" style="color:#6b7280;">${esc(BRAND.email)}</a> &middot; ${esc(BRAND.phone)}<br>
              &copy; ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

// ------------------------------------------------------------
// TEMPLATES
// ------------------------------------------------------------

// To the MotionPix team when a visitor submits the form.
// c: { fname, lname, company, email, contact, service, budget, msg }  (service/budget = readable labels)
const adminInquiryEmail = (c, files = [], attached = false) => {
  const received = `${new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  })} IST`;

  return {
    subject: oneLine(`New inquiry: ${c.service} - ${fullName(c)}`),
    html: layout({
      preheader: `${fullName(c)} (${c.company}) is interested in ${c.service}.`,
      heading: "New contact inquiry",
      content: `
        ${detailTable([
          ["Name", esc(fullName(c))],
          ["Company", esc(c.company)],
          ["Email", `<a href="mailto:${esc(c.email)}" style="color:${BRAND.color};text-decoration:none;">${esc(c.email)}</a>`],
          ["Phone", c.contact ? `<a href="tel:${esc(c.contact)}" style="color:#111827;text-decoration:none;">${esc(c.contact)}</a>` : "Not provided"],
          ["Interested in", esc(c.service)],
          ["Estimated budget", esc(c.budget)],
          ["Received", esc(received)],
        ])}
        ${messageBox("Message", c.msg)}
        ${fileList(
          files,
          attached
            ? "The files are attached to this email."
            : "The files are too large to attach. Download them from the admin panel."
        )}
        ${button("Open admin panel", `${BRAND.siteUrl}/admin`)}
        <p style="margin:18px 0 0;font-family:${FONT};font-size:13px;color:#6b7280;text-align:center;">Reply to this email to answer ${esc(c.fname)} directly.</p>`,
    }),
  };
};

// To the visitor right after they submit the form
const userConfirmationEmail = (c, files = []) => ({
  subject: "We received your inquiry - MotionPix",
  html: layout({
    preheader: `Thank you ${c.fname}, we received your inquiry about ${c.service}.`,
    heading: `Hello ${c.fname},`,
    content: `
      ${paragraph(`Thank you for reaching out to <strong>${BRAND.name}</strong>. We have received your inquiry and our team will get back to you shortly.`)}
      ${detailTable([
        ["Interested in", esc(c.service)],
        ["Estimated budget", esc(c.budget)],
      ])}
      ${messageBox("Your message", c.msg)}
      ${fileList(files)}
      <p style="margin:24px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:#374151;">If you want to add anything, simply reply to this email.</p>
      <p style="margin:14px 0 0;font-family:${FONT};font-size:15px;color:#111827;"><strong>Team ${BRAND.name}</strong></p>`,
  }),
});

// To the visitor when the admin accepts the inquiry
const acceptedEmail = ({ fname, service }) => ({
  subject: "Your inquiry has been accepted - MotionPix",
  html: layout({
    preheader: "Good news: your inquiry has been accepted.",
    heading: `Hello ${fname},`,
    content: `
      ${paragraph(`Good news! Your inquiry${service ? ` about <strong>${esc(service)}</strong>` : ""} has been <strong style="color:#15803d;">accepted</strong>.`)}
      ${paragraph("Our team will now proceed with the next steps and contact you shortly.")}
      ${button("Visit our website", BRAND.siteUrl, "#16a34a")}
      <p style="margin:24px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:#374151;">If you have any questions, feel free to reply to this email.</p>
      <p style="margin:14px 0 0;font-family:${FONT};font-size:15px;color:#111827;"><strong>Team ${BRAND.name}</strong></p>`,
  }),
});

module.exports = { adminInquiryEmail, userConfirmationEmail, acceptedEmail };
