const express = require("express");
const router = express.Router();
const multer = require("multer");
const teamController = require("../controllers/teamController");
const auth = require("../middleware/auth");

// STORAGE (same pattern as careerRoutes.js)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// 🌍 PUBLIC — the React TeamSection reads from here
router.get("/team", teamController.getTeam);

// 🔐 ADMIN (PROTECTED)
router.get("/admin/team", auth, teamController.getAdminTeam);
router.post("/admin/team", auth, upload.single("photo"), teamController.addMember);
router.post(
  "/admin/team/update/:id",
  auth,
  upload.single("photo"),
  teamController.updateMember
);
router.get("/admin/team/delete/:id", auth, teamController.deleteMember);

module.exports = router;
