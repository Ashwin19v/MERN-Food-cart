const express = require("express");
const router = express.Router();

const { getFavItems } = require("../../controllers/Admin/favController");
const auth = require("../../middleware/Admin/auth");
router.get("/:id", auth, getFavItems);
module.exports = router;
