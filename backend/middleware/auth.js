const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("tojen", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = { _id: decoded.id };
    // req.user = { _id: decoded._id };
    req.user = decoded.id;
    // console.log("req user",req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token Invalid" });
  }
};

module.exports = auth;
