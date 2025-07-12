const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
} = require("../../controllers/Admin/dashboardController");
const { auth } = require("../../middleware/Admin/auth");

// GET /api/dashboard (protected + admin only)
router.use(auth);
router.get("/", getDashboardStats);

module.exports = router;
