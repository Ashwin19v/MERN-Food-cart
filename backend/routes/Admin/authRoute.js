const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUserProfile,
} = require("../../controllers/Admin/authController");
const auth = require("../../middleware/Admin/auth");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", auth, getUser);
router.put("/user/update", auth, updateUserProfile);

module.exports = router;
