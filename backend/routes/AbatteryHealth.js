
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db');

// GET all BMS data in descending order (latest first) for a specific userId
router.get('/bmsdata/data2', async (req, res) => {
  const { userId } = req.query; // Get userId from query parameters

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" }); // Return error if userId is not provided
  }

  try {
    const result = await sequelize.query(
      "SELECT * FROM battery_data WHERE user_id = :userId ORDER BY timestamp DESC",
      {
        replacements: { userId }, // Safely inject the userId into the query
        type: QueryTypes.SELECT
      }
    );

    res.json(result); // Send data directly
  } catch (err) {
    console.error("Error fetching BMS data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;