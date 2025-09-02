const express = require('express');
const router = express.Router();
const Technician = require('../models/Technician'); // Direct import

// GET all technicians from the database using Sequelize model

//Delete battery data by technician email
router.delete('/technicians-d/:email', async (req, res) => {
  try {
    const email = req.params.email;
    await Technician.destroy({ where: { email } });
    res.json({ message: 'Battery data deleted successfully' });
  } catch (err) {
    console.error('Error deleting battery data:', err);
    res.status(500).json({ message: 'Error deleting battery data' });
  }
});


module.exports = router;
