const Review = require("../models/Review");
const Order = require("../models/Order");

// Create review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment, orderId } = req.body;

    // Check if user has purchased the product
    const order = await Order.findOne({
      _id: orderId,
      user: req.user._id,
      "items.product": productId,
      orderStatus: "delivered",
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "You can only review products you have purchased and received",
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
      orderItem: orderId,
    });

    await review.populate("user", "name");

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }
    res.status(400).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Get product reviews
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or not authorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};
