// routes/loginDetails.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');  // MySQL pool

// Route to get only users
router.get('/users-only', (req, res) => {
  const query = "SELECT username, email, updatedAt FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(results);
  });
});

module.exports = router;
