const express = require("express");
const router = express.Router();

const {
  AdminFetch,
} = require("../controllers/chatServiceController/fetchAdmin");
const auth = require("../middleware/auth");

router.get("/fetchAdmin", auth, AdminFetch);

module.exports = router;
