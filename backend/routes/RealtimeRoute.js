
const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');
const jwt = require('jsonwebtoken');

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.error('No Authorization header provided');
    return res.status(401).json({ success: false, message: 'No Authorization header, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.error('No token provided in Authorization header');
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error('Token payload does not contain id:', decoded);
      return res.status(401).json({ success: false, message: 'Invalid token payload, missing id' });
    }
    req.user = decoded; // Attach user info (e.g., { id: userId })
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ success: false, message: `Invalid or expired token: ${err.message}` });
  }
};

// GET: Fetch battery data for the authenticated user
router.get('/bmsdata-user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await sequelize.query(
      'SELECT * FROM battery_data WHERE userId = :userId ORDER BY timestamp DESC LIMIT 1',
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!rows || rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No data available for this user',
        data: {}
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Fetch failed',
      error: err.message,
    });
  }
});

// GET: Fetch all battery data (unchanged)
router.get('/bmsdata-all', async (req, res) => {
  try {
    const [rows] = await sequelize.query('SELECT * FROM battery_data ORDER BY timestamp DESC', {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({
      success: false,
      message: 'Fetch failed',
      error: err.message,
    });
  }
});

module.exports = router;