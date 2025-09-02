const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Fetch all user login details
router.get("/users", async (req, res) => {
  try {
    const query = "SELECT email, role, timestamp FROM users ORDER BY timestamp DESC";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching user logins:", err);
        return res.status(500).json({ message: "Server error while fetching users" });
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
});

// Fetch all technician login details
router.get("/techni", async (req, res) => {
  try {
    const query = "SELECT email, role, timestamp FROM technicians ORDER BY timestamp DESC";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching technician logins:", err);
        return res.status(500).json({ message: "Server error while fetching technicians" });
      }
      res.json(results);
    });
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
});

module.exports = router;
