const express = require("express");
const router = express.Router();
const {
  createOrder,

  getUserOrders,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
router.use(auth);

// User routes
router.post("/orders", createOrder);
router.get("/orders/me", getUserOrders);

module.exports = router;
