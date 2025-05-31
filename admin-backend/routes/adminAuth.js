const express = require("express");
const router = express.Router();
const { adminLogin, adminRegister } = require("../controllers/adminAuthController");

router.post("/login", adminLogin);
router.post("/register", adminRegister); // optional

module.exports = router;
