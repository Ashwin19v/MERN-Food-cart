const express = require("express");
const router = express.Router();

const { getCartItems } = require("../../controllers/Admin/cartController");
const auth = require("../../middleware/Admin/auth");

router.get("/:id", auth, getCartItems);

module.exports = router;
