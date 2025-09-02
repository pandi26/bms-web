// const express = require('express');
// const router = express.Router();
// const { QueryTypes } = require('sequelize');
// const sequelize = require('../config/db'); // Sequelize instance

// // Get battery health data
// router.get('/battery-health', async (req, res) => {
//   try {
//     const result = await sequelize.query("SELECT * FROM battery_data ORDER BY timestamp DESC LIMIT 1", {
//       type: QueryTypes.SELECT
//     });

//     if (result.length > 0) {
//       const data = result[0]; // Take the first row of the result

//       // Identify max and min voltage cells
//       const cells = {
//         cell1: data.cell1 || 0,
//         cell2: data.cell2 || 0,
//         cell3: data.cell3 || 0,
//       };

//       const maxVolt = Math.max(cells.cell1, cells.cell2, cells.cell3);
//       const minVolt = Math.min(cells.cell1, cells.cell2, cells.cell3);

//       let maxVoltPos, minVoltPos;

//       if (maxVolt === cells.cell1) {
//         maxVoltPos = 'Cell 1';
//       } else if (maxVolt === cells.cell2) {
//         maxVoltPos = 'Cell 2';
//       } else {
//         maxVoltPos = 'Cell 3';
//       }

//       if (minVolt === cells.cell1) {
//         minVoltPos = 'Cell 1';
//       } else if (minVolt === cells.cell2) {
//         minVoltPos = 'Cell 2';
//       } else {
//         minVoltPos = 'Cell 3';
//       }

//       // Calculate remainingCapacity as (SOC - 100)
//       const soc = data.soc || 0;
//       const remainingCapacity = soc - 100;

//       // Send the data as JSON
//       res.json({
//         soc: soc,
//         temperature: data.temperature || 0,
//         cell1: data.cell1,
//         cell2: data.cell2,
//         cell3: data.cell3,
//         cycles: data.cycles || 10,
//         voltage: data.voltage || 10,
//         current: data.current || 10,
//         remainingCapacity: remainingCapacity,
//         performance: data.performance || "good",
//         maxVoltage: maxVolt,
//         maxVoltagePosition: maxVoltPos,
//         minVoltagePosition: minVoltPos,
//         ecoMode: data.eco_mode || "Disabled",
//         safeChargingLimit: data.safe_charging_limit || 80,
//         lifespan: data.lifespan || 0
//       });
//     } else {
//       res.status(404).json({ error: 'Battery data not found' });
//     }
//   } catch (error) {
//     console.error('Error executing query', error);
//     res.status(500).json({ error: 'Database query failed' });
//   }
// });

// module.exports = router;
