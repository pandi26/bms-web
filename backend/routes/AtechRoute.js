const express = require('express');
const router = express.Router();
const Technician = require('../models/Technician'); // Direct import

// GET all technicians from the database using Sequelize model
router.get('/technicians', async (req, res) => {
  try {
    const technicians = await Technician.findAll();
    res.json(technicians);
  } catch (err) {
    console.error("Error fetching technicians data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
