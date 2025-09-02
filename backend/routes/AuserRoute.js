// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure this is the correct Sequelize instance

// GET all users from the database
router.get('/users', async (req, res) => {
  try {
    const result = await sequelize.query(
      "SELECT * FROM users", // Select all users
      {
        type: QueryTypes.SELECT
      }
    );

    res.json(result); // Send all users data as response
  } catch (err) {
    console.error("Error fetching users data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
