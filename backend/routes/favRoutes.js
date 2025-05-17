const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  checkFavorite,
} = require("../controllers/favController");

// Protect all favorite routes
router.use(auth);

router.post("/favorites", addToFavorites);
router.get("/favorites", getFavorites);
router.delete("/favorites/:productId", removeFromFavorites);
router.get("/favorites/check/:productId", checkFavorite);

module.exports = router;
