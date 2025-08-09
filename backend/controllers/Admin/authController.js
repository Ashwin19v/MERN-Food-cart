const User = require("../../models/adminUser");
const customers = require("../../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get current logged-in user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, currentPassword, password } = req.body;

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If password change is requested
    if (password) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });

      user.password = await bcrypt.hash(password, 10);
    }

    user.name = name || user.name;

    await user.save();
    res.status(200).json({ message: "Profile updated", data: user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error updating profile" });
  }
};

exports.getCustomers = async(req,res)=>{
  try {
    const customersList = await customers.find();
    res.status(200).json({ data: customersList });
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    res.status(500).json({ message: "Server error while fetching customers" });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await customers.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
};
