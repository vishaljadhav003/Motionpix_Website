const express = require("express");
const router = express.Router();
const multer = require("multer");

const careerController = require("../controllers/careerController");
const auth = require("../middleware/auth");

// ================= STORAGE =================

const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});


// ================= USER =================
router.post(
  "/career",
  upload.single("resume"),
  careerController.createCareer
);

// ================= ADMIN (PROTECTED) =================
router.get(
  "/admin/careers",
  auth,
  careerController.getCareers
);

router.get(
  "/career/complete/:id",
  auth,
  careerController.completeCareer
);

router.get(
  "/career/delete/:id",
  auth,
  careerController.deleteCareer
);

router.post(
  "/career/status",
  auth,
  careerController.updateStatus
);

module.exports = router;
