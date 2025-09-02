// backend/routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure this is Sequelize instance

// GET all BMS data in descending order (latest first)
router.get('/bmsdata/data', async (req, res) => {
  try {
    const result = await sequelize.query("SELECT * FROM battery_data ORDER BY timestamp DESC", {
      type: QueryTypes.SELECT
    });

    res.json(result); // Send data directly
  } catch (err) {
    console.error("Error fetching BMS data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
