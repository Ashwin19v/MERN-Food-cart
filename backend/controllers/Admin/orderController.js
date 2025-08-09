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
    const { status, isPaid, deliveryPerson, estimatedDeliveryTime } = req.body;

    const order = await Order.findById(req.params.id)
      .populate("user", "email name")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update order details
    order.orderStatus = status || order.orderStatus;
    order.isPaid = isPaid !== undefined ? isPaid : order.isPaid;

    const updated = await order.save();

    // Prepare HTML for email
    const itemsHTML = order.items
      .map(
        (item) => `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; text-align: left;">
              <img src="${item.product.image}" alt="${
          item.product.name
        }" style="width: 60px; border-radius: 5px;" />
            </td>
            <td style="padding: 10px; text-align: left;">
              ${item.product.name} (x${item.quantity})
            </td>
            <td style="padding: 10px; text-align: right;">
              $${(item.product.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        `
      )
      .join("");

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Order Status Update</h2>
        <p>Hello ${order.user.name || "Customer"},</p>
        <p>Your order status has been updated to:</p>
        <p style="font-weight: bold; color: #FF9800; font-size: 18px;">${
          order.orderStatus
        }</p>
        <p>Delivery Person: ${deliveryPerson || "Not Assigned"}</p>
        <p>Estimated Delivery Time: ${
          estimatedDeliveryTime || "Not Specified"
        }</p>
        <h3>Order Summary:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background: #f0f0f0;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px; text-align: left;">Details</th>
              <th style="padding: 10px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <p style="margin-top: 20px; font-size: 16px;">
          <strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}
        </p>

       

        <p style="margin-top: 20px; font-size: 14px; color: #777;">
          Order ID: ${order._id}
        </p>

        <p style="margin-top: 20px; font-size: 14px; text-align: center; color: #555;">
          Thank you for shopping with us!
        </p>
      </div>
    `;

    await sendEmail(order.user.email, "Order Status Update", emailHTML);

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: updated,
    });
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

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting order" });
  }
};

module.exports = {
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderById,
};
