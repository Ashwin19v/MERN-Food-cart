const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
router.use(auth);

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.get("/products/search", productController.searchProducts);
router.get(
  "/products/category/:category",
  productController.getProductsByCategory
);

module.exports = router;
