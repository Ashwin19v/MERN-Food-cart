const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const sendEmail = require("../middleware/sendEmail");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    res.status(201).json("User created successfully");
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is not configured");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // Send login notification email (optional, can be styled with HTML/CSS)
    sendEmail(
      user.email,
      "Login Successful",
      `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
        <h2 style="color: #4CAF50; margin-bottom: 16px;">Login Successful</h2>
        <p style="color: #333; font-size: 16px;">
          Hello <strong>${user.name || user.email}</strong>,
        </p>
        <p style="color: #333; font-size: 16px;">
          You have successfully logged in to your Food Cart account.
        </p>
        <p style="color: #888; font-size: 14px; margin-top: 32px;">
          If this wasn't you, please reset your password immediately.
        </p>
        <div style="margin-top: 24px; text-align: center;">
          <a href="https://your-app-url.com" style="background: #4CAF50; color: #fff; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold;">Go to Food Cart</a>
        </div>
        </div>
      </div>
      `,
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message + "fk" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Error in getUser:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: err.message,
    });
  }
};

exports.updateCredentials = async (req, res) => {
  try {
    const { name, password, currentPassword, phone, address } = req.body;
    const userId = req.user;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If user wants to update password, check currentPassword
    if (password) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Current password is incorrect" });
      }
    }

    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true, select: "-password" },
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};
