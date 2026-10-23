const express = require("express");
const {
  registerUser,
  loginUser,
  loginDemoUser,
  getProfile,
  updateProfile
} = require("../controllers/authController");

const router = express.Router();

const { protect, demoReadOnly } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/demo-login", loginDemoUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, demoReadOnly, updateProfile);

module.exports = router;
