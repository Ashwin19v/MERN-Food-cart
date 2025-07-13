const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  updateUserProfile,
  getCustomers,
} = require("../../controllers/Admin/authController");
const auth = require("../../middleware/Admin/auth");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", auth, getUser);
router.put("/update", auth, updateUserProfile);
router.get("/customers", auth,  getCustomers)
module.exports = router;
