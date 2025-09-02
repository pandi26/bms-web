// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { QueryTypes } = require("sequelize");
const sequelize = require('../config/db');

// Route to get user profile by email
router.get('/email/:email', async (req, res) => {
  const email = decodeURIComponent(req.params.email);

  try {
    const [user] = await sequelize.query(
      'SELECT username, email, age, address, phone FROM users WHERE email = ?',
      {
        replacements: [email],
        type: QueryTypes.SELECT
      }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
