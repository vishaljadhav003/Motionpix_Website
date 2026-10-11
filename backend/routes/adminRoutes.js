const express = require("express");

const router = express.Router();

const {
  showForgotPassword,
  sendOtp,
  regenerateOtp,
  verifyOtp,
} = require("../controllers/adminOtpController");

router.get("/forgot-password", showForgotPassword);

router.post("/forgot-password", sendOtp);

router.post("/forgot-password/regenerate", regenerateOtp);

router.post("/verify-otp", verifyOtp);

module.exports = router;