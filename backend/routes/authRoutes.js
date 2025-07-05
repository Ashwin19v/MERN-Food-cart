const express = require("express");
const { register, login, getUser, updateCredentials } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", auth, getUser);
router.put("/user/update",auth,updateCredentials);
module.exports = router;
