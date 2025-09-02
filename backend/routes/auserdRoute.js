const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel'); // ✅ Correct import

router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const deleted = await User.destroy({
      where: { userId } // 🔁 Match your DB column name exactly
    });

    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
