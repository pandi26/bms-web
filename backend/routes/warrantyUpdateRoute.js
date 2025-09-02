const express = require('express');
const router = express.Router();
const { WarrantyClaim } = require('../models'); 
const twilio = require('twilio');

// Twilio config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;
const client = twilio(accountSid, authToken);

// Update warranty claim status
router.put('/update/:id', async (req, res) => {
  try {
    const claimId = req.params.id;
    const { status } = req.body;

    console.log('Incoming Update Request - Claim ID:', claimId, ', New Status:', status);

    const warrantyClaim = await WarrantyClaim.findByPk(claimId);

    if (!warrantyClaim) {
      console.log(`Warranty claim with ID ${claimId} not found`);
      return res.status(404).json({ message: `Warranty claim with ID ${claimId} not found` });
    }

    warrantyClaim.status = status;
    await warrantyClaim.save();

    console.log(`Warranty claim with ID ${claimId} updated successfully`);

    // 🟢 Send WhatsApp message if status is Approved or Rejected
    const lowerCaseStatus = status.toLowerCase();
    if (lowerCaseStatus === 'approved' || lowerCaseStatus === 'rejected') {
      const customerPhone = warrantyClaim.phone; // Phone number from DB
      const whatsappTo = `whatsapp:+91${customerPhone}`; // Format properly with country code
      
      let messageBody = '';

      if (lowerCaseStatus === 'approved') {
        messageBody = `Hello ${warrantyClaim.name}, your warranty claim (ID: ${claimId}) has been APPROVED! 🎉 We will contact you shortly for further process.`;
      } else if (lowerCaseStatus === 'rejected') {
        messageBody = `Hello ${warrantyClaim.name}, we regret to inform you that your warranty claim (ID: ${claimId}) has been REJECTED. 😔 Please contact support for more details.`;
      }

      console.log(`Attempting to send WhatsApp message to: ${whatsappTo}`);
      
      try {
        const message = await client.messages.create({
          body: messageBody,
          from: whatsappFrom,
          to: whatsappTo,
        });

        console.log(`WhatsApp message sent to ${customerPhone} with status: ${status}`);
      } catch (twilioError) {
        console.error('Failed to send WhatsApp message:', twilioError);
        return res.status(500).json({ message: 'Failed to send WhatsApp message' });
      }
    }

    res.json({ message: `Warranty claim with ID ${claimId} updated successfully` });

  } catch (error) {
    console.error('Error updating warranty status:', error);
    res.status(500).json({ message: 'Server error while updating warranty status' });
  }
});

module.exports = router;
