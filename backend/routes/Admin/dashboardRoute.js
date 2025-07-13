const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
} = require("../../controllers/Admin/dashboardController");
const  auth  = require("../../middleware/Admin/auth");


router.use(auth);
router.get("/", getDashboardStats);

module.exports = router;
