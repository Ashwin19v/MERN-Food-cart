const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    req.user = decoded.id;
    req.email = user.email;
    req.name = user.name;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token Invalid" });
  }
};

module.exports = auth;
