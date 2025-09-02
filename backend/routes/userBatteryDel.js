const express = require("express");
const router = express.Router();
const { User, BatteryData } = require("../models"); // Adjust based on your file structure

// Route to delete a user and their associated data
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Delete the user's associated battery data first
    await BatteryData.destroy({ where: { userId } });  // Assuming you have a `BatteryData` model with a `userId` column
  
    // Then delete the user
    const user = await User.findByPk(userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    await user.destroy();
  
    // Optionally send an email or other notification
    // sendEmail(user.email, 'Your user account has been deleted');
  
    res.json({ message: 'User and associated data deleted successfully' });
  } catch (err) {
    console.error('Error deleting user and data:', err);
    res.status(500).json({ message: 'Error deleting user and associated data' });
  }
});

module.exports = router;
