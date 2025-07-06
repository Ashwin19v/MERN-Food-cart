const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: [1, "Rating must be above 1"],
      max: [5, "Rating must be below 5"],
    },
    comment: {
      type: String,
      required: [true, "Please provide a review comment"],
      trim: true,
      maxlength: [500, "Review cannot be more than 500 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // orderItem: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Order",
    //   required: [true, "Review must be associated with an order"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
