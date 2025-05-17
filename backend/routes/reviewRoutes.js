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
router.post("/reviews", createReview);
router.get("/products/:productId/reviews", getProductReviews);
router.patch("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

module.exports = router;
