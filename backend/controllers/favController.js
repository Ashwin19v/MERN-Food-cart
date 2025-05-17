const Favorite = require("../models/Fav");
const Product = require("../models/Product");

// Add to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;

    const favorite = await Favorite.create({
      user: req.user._id,
      product: productId,
    });

    await favorite.populate("product");

    res.status(201).json({
      success: true,
      message: "Added to favorites",
      data: favorite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Item already in favorites",
      });
    }
    res.status(400).json({
      success: false,
      message: "Error adding to favorites",
      error: error.message,
    });
  }
};

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate("product")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching favorites",
      error: error.message,
    });
  }
};

// Remove from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      product: req.params.productId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing from favorites",
      error: error.message,
    });
  }
};

// Check if item is favorited
exports.checkFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      user: req.user._id,
      product: req.params.productId,
    });

    res.status(200).json({
      success: true,
      isFavorite: !!favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking favorite status",
      error: error.message,
    });
  }
};
