const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

// Protect all cart routes
router.use(auth);

router.get("/cart", cartController.getCart);
router.post("/cart/add", cartController.addToCart);
router.put("/cart/update", cartController.updateCartItem);
router.delete("/cart/items/:productId", cartController.removeFromCart);
router.delete("/cart/clear", cartController.clearCart);

module.exports = router;
