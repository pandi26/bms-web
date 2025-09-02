const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ Your Sequelize instance

// GET all warranty claim data in descending order (latest first)
router.get('/data', async (req, res) => {
  try {
    const result = await sequelize.query(`
      SELECT 
       *
      FROM warranty_claims
      ORDER BY id DESC
    `, { type: QueryTypes.SELECT });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching warranty claims:", err);
    return res.status(500).json({ error: "Failed to fetch warranty claims" });
  }
});


module.exports = router;
