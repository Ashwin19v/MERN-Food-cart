const Cart = require("../../models/Cart");

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.params.id })
      .populate("items.product")
      .populate("user");
    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

module.exports = { getCartItems };
