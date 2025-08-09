const Favorite = require("../../models/Fav");

const getFavItems = async (req, res) => {
  try {
    const favItems = await Favorite.find({ user: req.params.id })
      .populate("product")
      .populate("user");
    res.status(200).json(favItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorite items" });
  }
};

module.exports = { getFavItems };
