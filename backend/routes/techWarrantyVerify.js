// backend/routes/techWarrantyVerify.js
const express = require('express');
const router = express.Router();
const { WarrantyClaim } = require('../models');


router.put('/techverify/:id', async (req, res) => {
  try {
    const claimId = req.params.id;
    const { tech_verify } = req.body;

    console.log('Updating tech verification for claim ID:', claimId, 'to', tech_verify);
    console.log(current_data);

    const warrantyClaim = await WarrantyClaim.findByPk(claimId);

    if (!warrantyClaim) {
      return res.status(404).json({ message: `Claim with ID ${claimId} not found` });
    }

    warrantyClaim.tech_verify = tech_verify;
    await warrantyClaim.save();

    res.json({ message: `Claim ${claimId} updated successfully` });
  } catch (error) {
    console.error('Error updating tech verification:', error);
    res.status(500).json({ message: 'Error updating tech verification' });
  }
});

module.exports = router;
