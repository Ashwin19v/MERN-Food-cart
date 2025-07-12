const Order = require("../../models/Order")


// Get dashboard analytics
const getDashboardStats = async (req, res) => {
  try {
    // Get today's date range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Get today's orders
    const todaysOrders = await Order.find({
      createdAt: { $gte: todayStart, $lte: todayEnd },
    });

    const totalOrdersToday = todaysOrders.length;

    // Calculate today's revenue
    const totalRevenueToday = todaysOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    // Count items sold today
    const itemCount = {};
    for (const order of todaysOrders) {
      for (const item of order.items) {
        itemCount[item.name] = (itemCount[item.name] || 0) + item.quantity;
      }
    }

    // Get most popular item
    let mostPopularItem = "None";
    let maxCount = 0;
    for (const [item, count] of Object.entries(itemCount)) {
      if (count > maxCount) {
        mostPopularItem = item;
        maxCount = count;
      }
    }

    // Get current active orders
    const activeStatuses = ["Pending", "Preparing", "Ready"];
    const activeOrders = await Order.countDocuments({
      orderStatus: { $in: activeStatuses },
    });

    res.json({
      totalOrdersToday,
      totalRevenueToday,
      mostPopularItem,
      activeOrders,
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ message: "Server error in dashboard stats" });
  }
};

module.exports = { getDashboardStats };
