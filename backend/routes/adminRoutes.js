const express = require("express");
const { adminSignup, adminLogin } = require("../controllers/AdminController"); // Correct import
const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

module.exports = router;
