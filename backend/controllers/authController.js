const User = require('../models/userModel.js');
const { comparePassword, generateToken } = require('../utils/authHelper');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Properly check if userId exists in the user object
    if (!user.userId || user.userId.trim() === '') {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Check user status and proceed accordingly
    if (user.status === 'Active') {
      // Generate JWT token
      const token = generateToken({ id: user.id, email: user.email });

      // Respond with token and user info (including status and userId)
      return res.json({
        token,
        user: {
          id: user.id,
          userId: user.userId,
          username: user.username,
          email: user.email,
          status: user.status,
        },
      });
    } else if (user.status === 'requested') {
      return res.status(403).json({ message: 'Access not granted. Please contact admins.' });
    } else {
      return res.status(403).json({ message: 'Access denied.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
