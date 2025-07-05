const Order = require("../models/Order");

// Create new order
exports.createOrder = async (req, res) => {
  console.log(req.user);
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    console.log(shippingAddress);
    const order = await Order.create({
      user: req.user,
      items,
      totalAmount,
      ShippingAddress: shippingAddress,
      orderStatus: "pending",
      paymentMethod,
    });

    await order.populate("items.product");
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};
// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};
