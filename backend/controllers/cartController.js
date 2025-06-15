const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Helper: Recalculate total cart amount
const calculateTotalAmount = async (cartItems) => {
  let total = 0;
  for (const item of cartItems) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};

exports.getCart = async (req, res) => {
  try {
    console.log("User from request:", req.user);
    let cart = await Cart.findOne({ user: req.user }).populate(
      "items.product",
      "name price image"
    );

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        totalAmount: 0,
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};


// Get user's cart
// exports.getCart = async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ user: req.user._id }).populate(
//       "items.product",
//       "name price image"
//     );

//     if (!cart) {
//       cart = await Cart.create({
//         user: req.user._id,
//         items: [],
//         totalAmount: 0,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: cart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching cart",
//       error: error.message,
//     });
//   }
// };

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user;

    const { productId, quantity, } = req.body;
    console.log("ids", userId, productId, quantity);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
        totalAmount: product.price * quantity,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      cart.totalAmount = await calculateTotalAmount(cart.items);
      await cart.save();
    }

    await cart.populate("items.product", "name price image");

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding item to cart",
      error: error.message,
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    console.log(item, "item in update cart item");

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    item.quantity = quantity;
    cart.totalAmount = await calculateTotalAmount(cart.items);

    await cart.save();
    await cart.populate("items.product", "name price image");

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating cart",
      error: error.message,
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Product ID to remove:", productId);
    // Pull the product from the cart items array
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId",
      });
    }
    const cart = await Cart.findOneAndUpdate(
      { user: req.user },
      { $pull: { items: { product: new mongoose.Types.ObjectId(productId) } } },
      { new: true }
    ).populate("items.product", "name price image");
    console.log(cart, "cart in remove from cart");
    if (!cart) {
      console.log("jdjfnd")
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Recalculate totalAmount after removing the item
    cart.totalAmount = await calculateTotalAmount(cart.items);
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error removing item from cart",
      error: error.message,
    });
  }
};


// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();
    await cart.populate("items.product", "name price image");

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error clearing cart",
      error: error.message,
    });
  }
};