const Order = require("../../models/Order");

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
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status || order.orderStatus;
    order.isPaid = isPaid !== undefined ? isPaid : order.isPaid;

    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error while updating status" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check ownership or admin
    if (
      req.user._id.toString() !== order.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email phone")
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
