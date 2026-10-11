require("dotenv").config();

const crypto = require("crypto");

const db = require("../config/db");
const dbPromise = db.promise();

const {
  sendMicrosoftEmail,
  escapeHtml,
} = require("../services/microsoftMail");


// ============================================================
// ADMIN EMAIL
// ============================================================

const ADMIN_EMAIL = "info@motionpixindia.com";


// ============================================================
// OTP SETTINGS
// ============================================================

const OTP_EXPIRY_SECONDS = 30;

// Maximum 3 incorrect OTP attempts
const MAX_OTP_ATTEMPTS = 3;

const MAX_OTP_REQUESTS = 5;
const OTP_REQUEST_WINDOW_MINUTES = 15;


// ============================================================
// HASH OTP
// ============================================================

const hashOtp = (otp) => {
  return crypto
    .createHash("sha256")
    .update(`${otp}:${process.env.OTP_HASH_SECRET}`)
    .digest("hex");
};


// ============================================================
// GENERATE OTP
// ============================================================

const generateOtp = () => {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
};


// ============================================================
// GET FORGOT PASSWORD PAGE
// ============================================================

const showForgotPassword = (req, res) => {
  res.render("forgotpassword", {
    otpSent: false,
    otpExpired: false,
    error: null,
    success: null,
  });
};


// ============================================================
// SEND OTP
// ============================================================

const sendOtp = async (req, res) => {
  try {
    const email =
      String(req.body.email || "")
        .trim()
        .toLowerCase();


    // --------------------------------------------------------
    // ONLY ALLOWED ADMIN EMAIL
    // --------------------------------------------------------

    if (email !== ADMIN_EMAIL) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: false,
        error: "Unable to process this request.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // FIND ADMIN
    // --------------------------------------------------------

    const [admins] = await dbPromise.query(
      `
      SELECT id, username, email
      FROM admin
      WHERE email = ?
      LIMIT 1
      `,
      [ADMIN_EMAIL]
    );


    if (!admins.length) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: false,
        error: "Unable to process this request.",
        success: null,
      });
    }


    const admin = admins[0];


    // --------------------------------------------------------
    // RATE LIMIT OTP REQUESTS
    // Maximum 5 requests within 15 minutes
    // --------------------------------------------------------

    const [requestCount] = await dbPromise.query(
      `
      SELECT COUNT(*) AS total
      FROM admin_password_resets
      WHERE admin_id = ?
      AND created_at >= DATE_SUB(NOW(), INTERVAL ? MINUTE)
      `,
      [
        admin.id,
        OTP_REQUEST_WINDOW_MINUTES,
      ]
    );


    if (Number(requestCount[0].total) >= MAX_OTP_REQUESTS) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: false,
        error:
          "Too many OTP requests. Please try again later.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // INVALIDATE PREVIOUS ACTIVE OTP
    // --------------------------------------------------------

    await dbPromise.query(
      `
      UPDATE admin_password_resets
      SET used_at = NOW()
      WHERE admin_id = ?
      AND used_at IS NULL
      `,
      [admin.id]
    );


    // --------------------------------------------------------
    // GENERATE NEW OTP
    // --------------------------------------------------------

    const otp = generateOtp();

    const tokenHash = hashOtp(otp);

    const expiresAt = new Date(
      Date.now() + OTP_EXPIRY_SECONDS * 1000
    );


    // --------------------------------------------------------
    // SAVE HASH ONLY
    // --------------------------------------------------------

    await dbPromise.query(
      `
      INSERT INTO admin_password_resets
      (
        admin_id,
        token_hash,
        expires_at,
        attempts
      )
      VALUES (?, ?, ?, 0)
      `,
      [
        admin.id,
        tokenHash,
        expiresAt,
      ]
    );


    // --------------------------------------------------------
    // EMAIL
    // --------------------------------------------------------

    const safeOtp = escapeHtml(otp);

    await sendMicrosoftEmail({
      to: ADMIN_EMAIL,

      subject:
        "MotionPix Admin - Your OTP",

      html: `
        <!DOCTYPE html>

        <html>

        <body
          style="
            margin:0;
            padding:30px;
            background:#0a0f1c;
            font-family:Arial,sans-serif;
          "
        >

          <div
            style="
              max-width:500px;
              margin:auto;
              background:#111827;
              padding:30px;
              border-radius:16px;
              color:white;
            "
          >

            <h2>
              MotionPix Admin
            </h2>

            <p>
              Your secure admin authentication OTP is:
            </p>

            <div
              style="
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                text-align:center;
                padding:20px;
                background:#1f2937;
                border-radius:12px;
                margin:20px 0;
              "
            >
              ${safeOtp}
            </div>

            <p>
              This OTP is valid for
              <strong>30 seconds</strong>.
            </p>

            <p>
              You have a maximum of
              <strong>3 incorrect attempts</strong>.
            </p>

            <p>
              If this request was not made by you,
              please ignore this email.
            </p>

          </div>

        </body>

        </html>
      `,

      replyTo: ADMIN_EMAIL,
    });


    // --------------------------------------------------------
    // OTP SESSION
    // --------------------------------------------------------

    req.session.otpEmail = ADMIN_EMAIL;
    req.session.otpSentAt = Date.now();


    return res.render("forgotpassword", {
      otpSent: true,
      otpExpired: false,
      error: null,
      success:
        "OTP has been sent to your registered admin email.",
    });

  } catch (error) {

    console.error(
      "SEND OTP ERROR:",
      error
    );

    return res.render("forgotpassword", {
      otpSent: false,
      otpExpired: false,
      error:
        "Unable to send OTP. Please try again.",
      success: null,
    });
  }
};


// ============================================================
// REGENERATE OTP
// ============================================================

const regenerateOtp = async (req, res) => {
  return sendOtp(
    {
      ...req,

      body: {
        email: ADMIN_EMAIL,
      },
    },
    res
  );
};


// ============================================================
// VERIFY OTP
// ============================================================

const verifyOtp = async (req, res) => {
  try {

    const email =
      String(req.body.email || "")
        .trim()
        .toLowerCase();

    const otp =
      String(req.body.otp || "")
        .trim();


    // --------------------------------------------------------
    // BASIC VALIDATION
    // --------------------------------------------------------

    if (
      email !== ADMIN_EMAIL ||
      !/^\d{6}$/.test(otp)
    ) {
      return res.render("forgotpassword", {
        otpSent: true,
        otpExpired: false,
        error: "Invalid OTP.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // REQUIRE OTP SESSION
    // --------------------------------------------------------

    if (
      !req.session ||
      req.session.otpEmail !== ADMIN_EMAIL ||
      !req.session.otpSentAt
    ) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: true,
        error:
          "OTP session expired. Please generate a new OTP.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // FIND ADMIN
    // --------------------------------------------------------

    const [admins] = await dbPromise.query(
      `
      SELECT id, username, email
      FROM admin
      WHERE email = ?
      LIMIT 1
      `,
      [ADMIN_EMAIL]
    );


    if (!admins.length) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: true,
        error:
          "Authentication failed.",
        success: null,
      });
    }


    const admin = admins[0];


    // --------------------------------------------------------
    // GET LATEST ACTIVE OTP
    // --------------------------------------------------------

    const [rows] = await dbPromise.query(
      `
      SELECT
        id,
        token_hash,
        expires_at,
        attempts
      FROM admin_password_resets
      WHERE admin_id = ?
      AND used_at IS NULL
      ORDER BY id DESC
      LIMIT 1
      `,
      [admin.id]
    );


    if (!rows.length) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: true,
        error:
          "OTP expired. Please generate a new OTP.",
        success: null,
      });
    }


    const reset = rows[0];


    // --------------------------------------------------------
    // EXPIRY CHECK
    // --------------------------------------------------------

    if (
      new Date(reset.expires_at).getTime() <=
      Date.now()
    ) {

      await dbPromise.query(
        `
        UPDATE admin_password_resets
        SET used_at = NOW()
        WHERE id = ?
        AND used_at IS NULL
        `,
        [reset.id]
      );


      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: true,
        error:
          "OTP expired. Please generate a new OTP.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // ATTEMPT LIMIT CHECK
    // --------------------------------------------------------

    if (
      Number(reset.attempts) >= MAX_OTP_ATTEMPTS
    ) {

      await dbPromise.query(
        `
        UPDATE admin_password_resets
        SET used_at = NOW()
        WHERE id = ?
        AND used_at IS NULL
        `,
        [reset.id]
      );


      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: true,
        error:
          "Too many incorrect OTP attempts. Please generate a new OTP.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // HASH USER OTP
    // --------------------------------------------------------

    const submittedHash =
      hashOtp(otp);


    // --------------------------------------------------------
    // SAFE HASH COMPARISON
    // --------------------------------------------------------

    const storedBuffer =
      Buffer.from(
        reset.token_hash,
        "hex"
      );

    const submittedBuffer =
      Buffer.from(
        submittedHash,
        "hex"
      );


    const isValid =
      storedBuffer.length === submittedBuffer.length &&
      crypto.timingSafeEqual(
        storedBuffer,
        submittedBuffer
      );


    // --------------------------------------------------------
    // INVALID OTP
    // --------------------------------------------------------

    if (!isValid) {

      /*
       * Atomically increase the attempt counter.
       *
       * On the 3rd incorrect attempt:
       * - attempts becomes 3
       * - OTP is immediately marked as used
       * - OTP can no longer be verified
       */

      const [attemptResult] = await dbPromise.query(
        `
        UPDATE admin_password_resets
        SET
          attempts = attempts + 1,
          used_at =
            CASE
              WHEN attempts + 1 >= ?
              THEN NOW()
              ELSE used_at
            END
        WHERE id = ?
        AND used_at IS NULL
        AND attempts < ?
        `,
        [
          MAX_OTP_ATTEMPTS,
          reset.id,
          MAX_OTP_ATTEMPTS,
        ]
      );


      /*
       * If another request already consumed
       * the OTP/attempt limit, do not allow
       * this request to continue.
       */

      if (attemptResult.affectedRows === 0) {
        return res.render("forgotpassword", {
          otpSent: false,
          otpExpired: true,
          error:
            "Too many incorrect OTP attempts. Please generate a new OTP.",
          success: null,
        });
      }


      const newAttemptCount =
        Number(reset.attempts) + 1;


      // ------------------------------------------------------
      // THIRD WRONG ATTEMPT
      // ------------------------------------------------------

      if (
        newAttemptCount >= MAX_OTP_ATTEMPTS
      ) {

        /*
         * Remove OTP session information.
         * The OTP is already invalidated in DB.
         */

        delete req.session.otpEmail;
        delete req.session.otpSentAt;


        return res.render("forgotpassword", {
  otpSent: false,
  otpExpired: true,
  error:
    "Too many incorrect OTP attempts. This OTP has expired. Please generate a new OTP.",
  success: null,
});
      }


      // ------------------------------------------------------
      // FIRST / SECOND WRONG ATTEMPT
      // ------------------------------------------------------

      return res.render("forgotpassword", {
        otpSent: true,
        otpExpired: false,
        error: "Invalid OTP.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // MARK OTP AS USED
    // --------------------------------------------------------

    const [usedResult] = await dbPromise.query(
      `
      UPDATE admin_password_resets
      SET used_at = NOW()
      WHERE id = ?
      AND used_at IS NULL
      `,
      [reset.id]
    );


    /*
     * Prevent the same OTP from being used
     * by simultaneous requests.
     */

    if (usedResult.affectedRows !== 1) {
      return res.render("forgotpassword", {
        otpSent: false,
        otpExpired: true,
        error:
          "OTP has already been used. Please generate a new OTP.",
        success: null,
      });
    }


    // --------------------------------------------------------
    // CLEAR OTP SESSION DATA
    // --------------------------------------------------------

    delete req.session.otpEmail;
    delete req.session.otpSentAt;


    // --------------------------------------------------------
    // REGENERATE SESSION
    // --------------------------------------------------------

    req.session.regenerate((sessionError) => {

      if (sessionError) {

        console.error(
          "SESSION REGENERATE ERROR:",
          sessionError
        );

        return res.render("forgotpassword", {
          otpSent: false,
          otpExpired: true,
          error:
            "Authentication failed. Please try again.",
          success: null,
        });
      }


      // ------------------------------------------------------
      // ADMIN AUTHENTICATED
      // ------------------------------------------------------

      req.session.isAuth = true;

      req.session.adminId = admin.id;

      req.session.username = admin.username;

      req.session.adminEmail = admin.email;

      req.session.authMethod = "otp";


      // ------------------------------------------------------
      // ADMIN SESSION EXPIRY
      // ------------------------------------------------------

      req.session.cookie.maxAge =
        30 * 60 * 1000;


      return res.redirect("/api/admin");

    });

  } catch (error) {

    console.error(
      "VERIFY OTP ERROR:",
      error
    );

    return res.render("forgotpassword", {
      otpSent: false,
      otpExpired: true,
      error:
        "Unable to verify OTP. Please try again.",
      success: null,
    });
  }
};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  showForgotPassword,
  sendOtp,
  regenerateOtp,
  verifyOtp,
};