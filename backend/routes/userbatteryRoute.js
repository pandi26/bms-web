const express = require('express');
const router = express.Router();
const { Battery, BatterySpec } = require('../models');

router.get('/by-battery/:batteryId', async (req, res) => {
  const { batteryId } = req.params;
  if (!batteryId || batteryId === 'na') {
    return res.status(400).json({ error: 'Invalid battery ID' });
  }
  try {
    const battery = await Battery.findOne({
      where: { battery_id: batteryId },
      include: [
        {
          model: BatterySpec,
          as: 'specs',
          required: false,
        },
      ],
    });

    if (!battery) {
      return res.status(404).json({ error: 'No battery found for this battery ID' });
    }

    res.json({
      userId: battery.user_id,
      batteryId: battery.batteryid,
      imageUrl: battery.imageUrl || null,
      specs: battery.specs
        ? {
            capacity: battery.specs.capacity || '',
            type: battery.specs.type || '',
            voltage: battery.specs.voltage || '',
            weight: battery.specs.weight || '',
            range: battery.specs.range || '',
            warranty: battery.specs.warranty || '',
          }
        : {},
      purchaseDetails: battery.purchaseDetails || {
        purchaseDate: '',
        orderId: '',
        price: '',
        warrantyEnd: '',
      },
    });
  } catch (err) {
    console.error('Error fetching battery:', err);
    res.status(500).json({ error: 'Failed to fetch battery details' });
  }
});

// Keep existing endpoint if needed for other purposes
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const battery = await Battery.findOne({
      where: { user_id: userId },
      include: [{ model: BatterySpec, as: 'specs', required: false }],
    });
    if (!battery) {
      return res.status(404).json({ error: 'No battery found for this user' });
    }
    res.json({
      userId: battery.user_id,
      batteryId: battery.batteryid,
      imageUrl: battery.imageUrl || null,
      specs: battery.specs || {},
      purchaseDetails: battery.purchaseDetails || {},
    });
  } catch (err) {
    console.error('Error fetching battery:', err);
    res.status(500).json({ error: 'Failed to fetch battery details' });
  }
});

module.exports = router;