const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

router.post('/submit', async (req, res) => {
  try {
    console.log("Received Warranty Claim:", req.body);

    const {
      user_id,              // ✅ Get user_id from request body
      userName,
      userEmail,
      phone,
      address,
      batterySerialNumber,
      issueDescription,
      purchaseDate
    } = req.body;

    const timestamp = new Date();

    // ✅ Insert including user_id
    await sequelize.query(`
      INSERT INTO warranty_claims 
      (user_id, name, email, phone, address, battery_serial, issue_description, purchase_date, submitted_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, {
      replacements: [
        user_id,
        userName,
        userEmail,
        phone,
        address,
        batterySerialNumber,
        issueDescription,
        purchaseDate,
        timestamp
      ],
      type: sequelize.QueryTypes.INSERT
    });

    res.status(201).json({ message: "Warranty claim submitted successfully" });

  } catch (error) {
    console.error("Warranty Claim Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
