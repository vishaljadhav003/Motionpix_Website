const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");
const auth = require("../middleware/auth");

// 🌍 PUBLIC — the React site reads editable text from here
router.get("/content/:page", contentController.getContentByPage);

// 🔐 ADMIN (PROTECTED)
router.get("/admin/content", auth, contentController.getAdminContent);
router.post("/admin/content", auth, contentController.saveContent);
router.get("/admin/content/delete/:id", auth, contentController.deleteContent);

module.exports = router;
