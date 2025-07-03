const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
  checkFavorite,
} = require("../controllers/favController");

router.use(auth);

router.post("/add", addToFavorites);
router.get("/get", getFavorites);
router.delete("/:productId", removeFromFavorites);
router.get("/check/:productId", checkFavorite);

module.exports = router;
