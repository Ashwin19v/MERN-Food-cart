const Order = require("../models/Order");
const sendEmail = require("../middleware/sendEmail");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user,
      items,
      totalAmount,
      ShippingAddress: shippingAddress,
      orderStatus: "pending",
      paymentMethod,
    });

    await order.populate("items.product");

    // Generate HTML for items
    const itemsHTML = order.items
      .map(
        (item) => `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; text-align: left;">
              <img src="${item.product.image}" alt="${
          item.product.name
        }" style="width: 70px; border-radius: 5px;" />
            </td>
            <td style="padding: 10px; text-align: left;">
              <strong>${item.product.name}</strong><br />
              Quantity: ${item.quantity}
            </td>
            <td style="padding: 10px; text-align: right;">
              $${(item.product.price * item.quantity).toFixed(2)}
            </td>
          </tr>
        `
      )
      .join("");

    // Enhanced HTML email template
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background: #f9f9f9;">
        <h2 style="text-align: center; color: #4CAF50;">Order Confirmation</h2>
        <p style="font-size: 16px;">Hello ${req.name},</p>
        <p style="font-size: 16px;">Thank you for your order! Your order will reach you soon at:</p>
        <p style="font-size: 16px; font-weight: bold; color: #555; background: #eee; padding: 10px; border-radius: 5px;">
          ${shippingAddress}
        </p>

        <h3 style="margin-top: 20px; color: #333;">Order Details:</h3>
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

        <p style="font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px;">
          Total Amount: <span style="color: #4CAF50;">$${totalAmount.toFixed(
            2
          )}</span>
        </p>

        <p style="font-size: 16px; margin-top: 10px;">
          Delivery Status: <strong style="color: #FF9800;">${
            order.orderStatus
          }</strong>
        </p>

        <p style="margin-top: 20px; font-size: 14px; color: #777;">
          Payment Method: <strong>${paymentMethod}</strong>
        </p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">Track Your Order</a>
        </div>

        <p style="margin-top: 30px; font-size: 14px; color: #777; text-align: center;">
          Thank you for shopping with us!
        </p>
      </div>
    `;

    await sendEmail(req.email, "Order Confirmation", emailHTML);

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
