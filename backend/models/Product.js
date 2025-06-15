const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);