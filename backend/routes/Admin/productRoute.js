const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/Admin/productController");

const  auth  = require("../../middleware/Admin/auth");
router.use(auth);
// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
