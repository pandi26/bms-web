const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { BatteryData } = require('../models/BatteryData');
const sequelize = require('../config/db');



router.post('/bmsdata-mysql', async (req, res) => {
  try {
    
   const userId = req.body.userId ||"e1ce775d-df09-4aa1-a";
    if (!userId) {
      return res.status(403).json({ success: false, message: 'No user ID provided' });
    }

    // Step 2: Validate input using Joi schema
    const schema = Joi.object({
      Cell1: Joi.number().optional().default(0),
      Cell2: Joi.number().optional().default(0),
      Cell3: Joi.number().optional().default(0),
      Voltage: Joi.number().optional().default(0),
      Current: Joi.number().optional().default(0),
      Temperature: Joi.number().optional().default(0),
      SOC: Joi.number().optional().default(0),
      event: Joi.string().trim().allow('').optional().default('--'),
      userId: Joi.string().required()

    });

    const { error, value } = schema.validate({ ...req.body, userId });
    if (error) {
      console.error('Validation Error:', error.details);
      return res.status(400).json({
        success: false,
        message: `Validation error: ${error.details[0].message}`
      });
    }

    const { Cell1, Cell2, Cell3, Voltage, Current, Temperature, SOC, event } = value;

    // Step 3: Determine status based on voltage thresholds
    const UNDER_VOLTAGE_THRESHOLD = parseFloat(process.env.UNDER_VOLTAGE_THRESHOLD) || 2.5;
    const OVER_VOLTAGE_THRESHOLD = parseFloat(process.env.OVER_VOLTAGE_THRESHOLD) || 4.5;

    const voltages = [Cell1, Cell2, Cell3];
    let status = 'NOMINAL';
    if (voltages.some(v => v < UNDER_VOLTAGE_THRESHOLD)) {
      status = 'Under Voltage';
    } else if (voltages.some(v => v > OVER_VOLTAGE_THRESHOLD)) {
      status = 'Over Voltage';
    }

    // Step 4: Insert data into the database
    const timestamp = new Date();

    const result = await BatteryData.create({
      user_id: userId,
      cell1: Cell1,
      cell2: Cell2,
      cell3: Cell3,
      voltage: Voltage,
      current: Current,
      temperature: Temperature,
      timestamp,
      soc: SOC,
      event,
      status,
    });

    // Step 5: Return success response
    return res.status(200).json({
      success: true,
      message: 'Data inserted successfully',
      insertId: result.id,
      status,
    });

  } catch (err) {
    // Catch unexpected server/database errors
    console.error('Server Error:', err.message, err.stack);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while saving data',
    });
  }
});


module.exports = router;
