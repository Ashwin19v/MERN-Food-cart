const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.use(auth);

// Review routes
router.post("/add", createReview);
router.get("/:productId", getProductReviews);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
