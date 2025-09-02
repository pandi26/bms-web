const express = require("express");
const router = express.Router();
const { technicianSignup, technicianLogin } = require("../controllers/technicianController");

router.post("/signup", technicianSignup);
router.post("/login", technicianLogin);

module.exports = router;
