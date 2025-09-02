// routes/loginDetail1.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');  // MySQL pool

// Route to get only technicians
router.get('/technicians-only', (req, res) => {
  const query = "SELECT username, email, updatedAt FROM technicians";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching technicians:", err);
      return res.status(500).json({ message: "Error fetching technicians" });
    }
    res.json(results);
  });
});

module.exports = router;
