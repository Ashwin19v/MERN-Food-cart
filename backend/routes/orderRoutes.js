const express = require("express");
const router = express.Router();
const {
  createOrder,

  getUserOrders,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
router.use(auth);

// User routes
router.post("/add", createOrder);
router.get("/get", getUserOrders);

module.exports = router;
