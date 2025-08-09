const express = require("express");
const router = express.Router();
const {
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
} = require("../../controllers/Admin/orderController");

const auth = require("../../middleware/Admin/auth");
router.use(auth);

// ✅ Get orders of logged-in user
router.get("/myorders/:id", getMyOrders);

// ✅ Admin: Get all orders
router.get("/", getAllOrders);

// ✅ Admin: Update order status
router.put("/:id/status", updateOrderStatus);

// ✅ Get single order by ID (for user or admin)
router.get("/:id", getOrderById);

// ✅ Admin: Delete an order
router.delete("/:id", deleteOrder);

module.exports = router;
