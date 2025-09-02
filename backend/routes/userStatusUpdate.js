
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Transporter Error:', error);
  } else {
    console.log('SMTP Transporter is ready to send emails');
  }
});

router.put('/users/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, email } = req.body;

  const allowedStatuses = ['active', 'inactive', 'suspended', 'pending'];

  try {

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    
    if (!status || !allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: `Invalid status: ${status}` });
    }

    user.status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    await user.save();

  
    const response = { message: `User status updated to "${user.status}"`, emailSent: true };

    if (status.toLowerCase() === 'active') {
      if (!email) {
        console.warn('No email provided for notification');
        response.emailSent = false;
        return res.json(response);
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Activation Notification',
        text: `Dear ${user.username},\n\nYour account has been successfully activated.\n\nBest regards,\nYour BMS Team`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Activation email sent to ${email}`);
      } catch (emailErr) {
        console.error('Error sending email:', {
          error: emailErr.message,
          code: emailErr.code,
          response: emailErr.response,
        });
        response.emailSent = false;
      }
    }

    res.json(response);
  } catch (err) {
     
     
    console.error('Error updating user status:', err);
    res.status(500).json({ message: 'Server error updating status' });
  }
});

module.exports = router;