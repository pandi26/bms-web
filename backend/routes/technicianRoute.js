// routes/technicianRoutes.js
const express = require("express");
const router = express.Router();
const { QueryTypes } = require("sequelize");
const sequelize = require('../config/db');

// Route to get technician profile by email
router.get('/profile/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email);

  try {
    const [technician] = await sequelize.query(
      'SELECT username, email, phone, address, age, expertise FROM technicians WHERE email = ?',
      {
        replacements: [email],
        type: QueryTypes.SELECT
      }
    );

    if (!technician) {
      return res.status(404).json({ error: 'Technician not found' });
    }

    res.json(technician);
  } catch (error) {
    console.error('Error fetching technician profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
