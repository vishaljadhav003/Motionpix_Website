const db = require("../config/db");

const {
  sendMicrosoftEmail,
  escapeHtml,
} = require("../services/microsoftMail");

// ================= UPDATE STATUS =================
// ================= UPDATE STATUS =================
exports.updateStatus = (req, res) => {
  const {
    id,
    status,
    interviewDate,
  } = req.body;

  db.query(
    "UPDATE careers SET status=?, interview_date=? WHERE id=?",
    [
      status,
      interviewDate || null,
      id,
    ],
    (err) => {
      if (err) {
        return res.status(500).send("DB Error");
      }

      db.query(
        "SELECT name,email,role,interview_date FROM careers WHERE id=?",
        [id],
        async (err2, result) => {
          if (err2) {
            return res.status(500).send("DB Error");
          }

          if (!result.length) {
            return res.status(404).send("Application not found");
          }

          const user = result[0];

          try {
            const safeName = escapeHtml(user.name);
            const safeEmail = escapeHtml(user.email);
            const safeRole = escapeHtml(user.role);

            // ============================================================
            // EXACT INTERVIEW DATE
            // ============================================================

            const exactInterviewDate =
              interviewDate ||
              (user.interview_date
                ? String(user.interview_date).slice(0, 10)
                : null);

            let formattedInterviewDate = "To be confirmed";

            if (exactInterviewDate) {
              const [year, month, day] =
                exactInterviewDate.split("-");

              const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              formattedInterviewDate =
                `${months[Number(month) - 1]} ${Number(day)}, ${year}`;
            }

            // ============================================================
            // PENDING
            // ============================================================

            if (status === "pending") {

              // USER EMAIL
              await sendMicrosoftEmail({
                to: user.email,

                subject:
                  "Application Received ✅ – MotionPix",

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    background:#f8fafc;
                    padding:25px;
                    color:#333;
                  ">

                    <div style="
                      max-width:600px;
                      margin:auto;
                      background:#ffffff;
                      padding:30px;
                      border-radius:10px;
                    ">

                      <h2 style="color:#0ea5e9;">
                        Hello ${safeName},
                      </h2>

                      <p>
                        Your application for
                        <strong>${safeRole}</strong>
                        is currently under review.
                      </p>

                      <p>
                        We will update you regarding the next steps soon.
                      </p>

                      <br>

                      <p>
                        <strong>— MotionPix Team</strong>
                      </p>

                    </div>

                  </div>
                `,
              });

              // ADMIN EMAIL
              await sendMicrosoftEmail({
                to: process.env.EMAIL_TO,

                subject:
                  `Career Status – ${user.name} – Pending – MotionPix`,

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    line-height:1.6;
                    color:#333;
                  ">

                    <h2 style="color:#e50914;">
                      Career Application Status
                    </h2>

                    <hr>

                    <p>
                      <strong>Name:</strong>
                      ${safeName}
                    </p>

                    <p>
                      <strong>Email:</strong>
                      ${safeEmail}
                    </p>

                    <p>
                      <strong>Role:</strong>
                      ${safeRole}
                    </p>

                    <p>
                      <strong>Status:</strong>
                      Pending
                    </p>

                  </div>
                `,
              });
            }

            // ============================================================
            // SHORTLISTED
            // ============================================================

            if (status === "shortlisted") {

              // USER EMAIL
              await sendMicrosoftEmail({
                to: user.email,

                subject:
                  "🎯 You're Shortlisted – MotionPix",

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    background:#ecfdf5;
                    padding:25px;
                    color:#333;
                  ">

                    <div style="
                      max-width:600px;
                      margin:auto;
                      background:#ffffff;
                      padding:30px;
                      border-radius:10px;
                    ">

                      <h2 style="color:#16a34a;">
                        Congratulations ${safeName} 🎉
                      </h2>

                      <p>
                        You have been shortlisted for
                        <strong>${safeRole}</strong>.
                      </p>

                      <p>
                        Our team will share the interview details
                        with you shortly.
                      </p>

                      <br>

                      <p>
                        <strong>— MotionPix Team</strong>
                      </p>

                    </div>

                  </div>
                `,
              });

              // ADMIN EMAIL
              await sendMicrosoftEmail({
                to: process.env.EMAIL_TO,

                subject:
                  `Career Status – ${user.name} – Shortlisted – MotionPix`,

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    line-height:1.6;
                    color:#333;
                  ">

                    <h2 style="color:#e50914;">
                      Career Application Status
                    </h2>

                    <hr>

                    <p>
                      <strong>Name:</strong>
                      ${safeName}
                    </p>

                    <p>
                      <strong>Email:</strong>
                      ${safeEmail}
                    </p>

                    <p>
                      <strong>Role:</strong>
                      ${safeRole}
                    </p>

                    <p>
                      <strong>Status:</strong>
                      Shortlisted
                    </p>

                  </div>
                `,
              });
            }

            // ============================================================
            // INTERVIEW / COMPLETED
            // ============================================================

            if (status === "completed") {

              // USER EMAIL
              await sendMicrosoftEmail({
                to: user.email,

                subject:
                  "Interview Scheduled 🎯 – MotionPix",

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    background:#eff6ff;
                    padding:25px;
                    color:#333;
                  ">

                    <div style="
                      max-width:600px;
                      margin:auto;
                      background:#ffffff;
                      padding:30px;
                      border-radius:10px;
                    ">

                      <h2>
                        Hello ${safeName},
                      </h2>

                      <p>
                        Your application for
                        <strong>${safeRole}</strong>
                        has moved to the interview stage.
                      </p>

                      <h3>
                        Interview Details
                      </h3>

                      <p>
                        <strong>📅 Date:</strong>
                        ${formattedInterviewDate}
                      </p>

                      <p>
                        <strong>⏰ Time:</strong>
                        11:00 AM
                      </p>

                      <br>

                      <p>
                        <strong>— MotionPix Team</strong>
                      </p>

                    </div>

                  </div>
                `,
              });

              // ADMIN EMAIL
              await sendMicrosoftEmail({
                to: process.env.EMAIL_TO,

                subject:
                  `Career Status – ${user.name} – Interview – MotionPix`,

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    line-height:1.6;
                    color:#333;
                  ">

                    <h2 style="color:#e50914;">
                      Career Application Status
                    </h2>

                    <hr>

                    <p>
                      <strong>Name:</strong>
                      ${safeName}
                    </p>

                    <p>
                      <strong>Email:</strong>
                      ${safeEmail}
                    </p>

                    <p>
                      <strong>Role:</strong>
                      ${safeRole}
                    </p>

                    <p>
                      <strong>Status:</strong>
                      Interview
                    </p>

                    <p>
                      <strong>📅 Interview Date:</strong>
                      ${formattedInterviewDate}
                    </p>

                    <p>
                      <strong>⏰ Interview Time:</strong>
                      11:00 AM
                    </p>

                  </div>
                `,
              });
            }

            // ============================================================
            // REJECTED
            // ============================================================

            if (status === "rejected") {

              // USER EMAIL
              await sendMicrosoftEmail({
                to: user.email,

                subject:
                  "Application Update – MotionPix",

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    background:#fef2f2;
                    padding:25px;
                    color:#333;
                  ">

                    <div style="
                      max-width:600px;
                      margin:auto;
                      background:#ffffff;
                      padding:30px;
                      border-radius:10px;
                    ">

                      <h2>
                        Hello ${safeName},
                      </h2>

                      <p>
                        We appreciate your interest in
                        <strong>${safeRole}</strong>
                        at MotionPix.
                      </p>

                      <p>
                        Unfortunately, we won't be proceeding
                        further with your application at this time.
                      </p>

                      <p>
                        We wish you all the best in your career journey. 💙
                      </p>

                      <br>

                      <p>
                        <strong>— MotionPix Team</strong>
                      </p>

                    </div>

                  </div>
                `,
              });

              // ADMIN EMAIL
              await sendMicrosoftEmail({
                to: process.env.EMAIL_TO,

                subject:
                  `Career Status – ${user.name} – Rejected – MotionPix`,

                html: `
                  <div style="
                    font-family:Arial,sans-serif;
                    line-height:1.6;
                    color:#333;
                  ">

                    <h2 style="color:#e50914;">
                      Career Application Status
                    </h2>

                    <hr>

                    <p>
                      <strong>Name:</strong>
                      ${safeName}
                    </p>

                    <p>
                      <strong>Email:</strong>
                      ${safeEmail}
                    </p>

                    <p>
                      <strong>Role:</strong>
                      ${safeRole}
                    </p>

                    <p>
                      <strong>Status:</strong>
                      Rejected
                    </p>

                  </div>
                `,
              });
            }

            console.log(
              "✅ Career status emails sent successfully"
            );

          } catch (error) {
            console.error(
              "❌ Microsoft 365 career email error:",
              error
            );
          }

          // ================= SOCKET =================

          const io = req.app.get("io");

          io.emit("statusUpdated");

          res.json({
            success: true,
          });
        }
      );
    }
  );
};

// ================= CREATE CAREER =================
exports.createCareer = (req, res) => {
  const {
    name,
    email,
    role,
    message,
  } = req.body;

  const resume = req.file
    ? req.file.filename
    : null;

  const sql = `
    INSERT INTO careers
    (name, email, role, message, resume)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      email,
      role,
      message,
      resume,
    ],
    async (err) => {
      if (err) {
        return res.status(500).json({
          error: "DB Error",
        });
      }

      // ================= SOCKET =================
      const io = req.app.get("io");

      io.emit("newCareer", {
        name,
        email,
      });

      try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeRole = escapeHtml(role);
        const safeMessage = escapeHtml(message);

        // ============================================================
        // ADMIN EMAIL
        // ============================================================

        await sendMicrosoftEmail({
          to: process.env.EMAIL_TO,

          subject:
            "🚀 New Job Application – MotionPix",

          replyTo: email,

          html: `
            <div style="
              font-family:Arial,sans-serif;
              line-height:1.6;
              color:#333;
            ">

              <h2 style="color:#e50914;">
                New Job Application
              </h2>

              <hr>

              <p>
                <strong>Name:</strong>
                ${safeName}
              </p>

              <p>
                <strong>Email:</strong>
                ${safeEmail}
              </p>

              <p>
                <strong>Role:</strong>
                ${safeRole}
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <div style="
                background:#f5f5f5;
                padding:15px;
                border-radius:8px;
              ">
                ${safeMessage || "No message provided"}
              </div>

              <br>

              <p>
                A new career application has been
                submitted from the MotionPix website.
              </p>

            </div>
          `,
        });

        // ============================================================
        // USER CONFIRMATION EMAIL
        // ============================================================

        await sendMicrosoftEmail({
          to: email,

          subject:
            "Application Received 🎉 – MotionPix",

          html: `
            <div style="
              font-family:Arial,sans-serif;
              background:#f4f6f8;
              padding:20px;
            ">

              <div style="
                max-width:600px;
                margin:auto;
                background:#ffffff;
                border-radius:10px;
                padding:30px;
              ">

                <h2 style="color:#333;">
                  Hello ${safeName},
                </h2>

                <p>
                  Thank you for applying to
                  <strong>MotionPix</strong>.
                </p>

                <p>
                  Your application for
                  <strong>${safeRole}</strong>
                  has been successfully received.
                </p>

                <p>
                  Our team will review your application
                  and contact you regarding the next steps.
                </p>

                <br>

                <p style="color:#555;">
                  We appreciate your interest in joining MotionPix.
                </p>

                <p>
                  <strong>— MotionPix Team</strong>
                </p>

              </div>

            </div>
          `,
        });

        console.log(
          "✅ Career application emails sent successfully"
        );

      } catch (error) {
        console.error(
          "❌ Microsoft 365 career email error:",
          error
        );
      }

      res.json({
        success: true,
      });
    }
  );
};

// ================= GET CAREERS =================
exports.getCareers = (req, res) => {
  db.query(
    "SELECT * FROM careers ORDER BY id DESC",
    (err, result) => {
      if (err) {
        return res.status(500).send("DB Error");
      }

      res.render("admin-career", {
        data: result,
      });
    }
  );
};

// ================= COMPLETE =================
exports.completeCareer = (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE careers SET status='completed' WHERE id=?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).send("DB Error");
      }

      db.query(
        "SELECT name,email,role FROM careers WHERE id=?",
        [id],
        async (err, result) => {
          if (err) {
            return res.status(500).send("DB Error");
          }

          if (!result.length) {
            return res.status(404).send("Application not found");
          }

          const user = result[0];

          // ================= INTERVIEW DATE = 2 DAYS FROM TODAY =================
          // const today = new Date();

          // const interviewDate = new Date(today);

          // interviewDate.setDate(
          //   interviewDate.getDate() + 2
          // );

          try {
            const safeName = escapeHtml(user.name);
            const safeRole = escapeHtml(user.role);

            await sendMicrosoftEmail({
              to: user.email,

              subject:
                "Interview Scheduled 🎯 – MotionPix",

              html: `
                <div style="
                  font-family:Arial,sans-serif;
                  background:#eff6ff;
                  padding:25px;
                  color:#333;
                ">

                  <div style="
                    max-width:600px;
                    margin:auto;
                    background:#ffffff;
                    padding:30px;
                    border-radius:10px;
                  ">

                    <h2>
                      Hello ${safeName},
                    </h2>

                    <p>
                      Congratulations! 🎉
                    </p>

                    <p>
                      Your application for
                      <strong>${safeRole}</strong>
                      has been accepted for the interview stage.
                    </p>

                    <h3>
                      Interview Details
                    </h3>

                    <p>
                      <strong>📅 Date:</strong>
                      ${interviewDate.toDateString()}
                    </p>

                    <p>
                      <strong>⏰ Time:</strong>
                      11:00 AM
                    </p>

                    <br>

                    <p>
                      <strong>— MotionPix Team</strong>
                    </p>

                  </div>

                </div>
              `,
            });

            console.log(
              "✅ Interview email sent successfully"
            );

          } catch (error) {
            console.error(
              "❌ Microsoft 365 interview email error:",
              error
            );
          }

          res.redirect(
            "/api/admin/careers"
          );
        }
      );
    }
  );
};

// ================= DELETE =================
exports.deleteCareer = (req, res) => {
  db.query(
    "DELETE FROM careers WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).send("DB Error");
      }

      res.redirect(
        "/api/admin/careers"
      );
    }
  );
};