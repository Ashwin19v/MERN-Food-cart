const Admin = require("../../models/adminUser");

exports.AdminFetch = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
