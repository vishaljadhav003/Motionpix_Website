
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const careerController = require("../controllers/careerController");
const auth = require("../middleware/auth");

// ================= STORAGE =================

const uploadDir = path.resolve(__dirname, "../uploads");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const safeName = path
      .basename(file.originalname)
      .replace(/[^\w.-]/g, "_");

    cb(null, `${Date.now()}-${safeName}`);
  },
});

// ================= FILE VALIDATION =================

const allowedExtensions = [".pdf", ".doc", ".docx"];

const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },

  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return cb(new Error("Only PDF, DOC and DOCX files are allowed."));
    }

    cb(null, true);
  },
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

// Resume preview / download (Protected)
router.get(
  "/admin/careers/:id/resume",
  auth,
  careerController.getCareerResume
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
