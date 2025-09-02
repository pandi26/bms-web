const express = require('express');
const router = express.Router();
const BatteryPara2 = require('../models/BatteryPara2'); // ✅ Correct model import

// POST route to insert parameters
router.post('/battery/parameter2', async (req, res) => {
  try {
    const {
      userEmail,
      batteryId,
      alarmValue,
      delayValue,
      ovAlarmValue,
      ovDelayValue,
      lowTempAlarm,
      lowTempDelay,
      highTempAlarm,
      highTempDelay
    } = req.body;

    // Validate inputs
    if (!userEmail || !batteryId) {
      return res.status(400).json({ message: 'Email and Battery ID are required' });
    }

    // Ensure all parameter values are numbers
    if (
      isNaN(alarmValue) || isNaN(delayValue) || isNaN(ovAlarmValue) || isNaN(ovDelayValue) ||
      isNaN(lowTempAlarm) || isNaN(lowTempDelay) || isNaN(highTempAlarm) || isNaN(highTempDelay)
    ) {
      return res.status(400).json({ message: 'All parameter values must be valid numbers' });
    }

    // Create new battery parameters record
    const newParameters = await BatteryPara2.create({
      email: userEmail,
      battery_id: batteryId,
      under_voltage_alarm_value: alarmValue,
      under_voltage_delay_value: delayValue,
      over_voltage_alarm_value: ovAlarmValue,
      over_voltage_delay_value: ovDelayValue,
      low_temp_alarm_value: lowTempAlarm,
      low_temp_delay_value: lowTempDelay,
      high_temp_alarm_value: highTempAlarm,
      high_temp_delay_value: highTempDelay,
    });

    res.status(201).json({
      message: 'Battery parameters saved successfully!',
      data: newParameters,
    });

  } catch (error) {
    console.error('Error saving parameters:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
