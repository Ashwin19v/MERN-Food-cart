const Order = require("../../models/Order");
const sendEmail = require("../../middleware/sendEmail");

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error while fetching your orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const order = await Order.findById(req.params.id).populate("user", "email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status || order.orderStatus;
    order.isPaid = isPaid !== undefined ? isPaid : order.isPaid;
    const updated = await order.save();

    res.json(updated);
    await sendEmail(
      order.user.email,
      "Order Status Update",
      `<h2>Your order status has been updated to: ${order.orderStatus}</h2> <p>Order ID: ${order._id}</p>
      <p>Thank you for your patience!</p>`
    );
  } catch (err) {
    res.status(500).json({ message: "Server error while updating status" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.find({ user: req.params.id })
      .populate("user", "name email phone")
      .populate("items.product", "name price image category");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ data: order });
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("items.product", "name price image category")
      .populate("user", "name email phone ")
      .sort("-createdAt");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

module.exports = {
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};
