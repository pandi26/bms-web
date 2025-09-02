// const Sequelize = require('sequelize');
// const sequelize = require('../config/db');

// // Import models
// const Admin = require('./Admin');
// const WarrantyClaim = require('./WarrantyClaim');
// const BatteryPara2 = require('./BatteryPara2'); // ✅ Correct import

// // Export all models and sequelize instance
// module.exports = {
//   sequelize,
//   Sequelize, // Optional: useful if you want access to Sequelize.DataTypes elsewhere
//   Admin,
//   WarrantyClaim,
//   BatteryPara2
// };
// const Battery = require('./Battery');
// const BatterySpec = require('./BatterySpec');

// Battery.hasOne(BatterySpec, {
//   foreignKey: 'batteryid',
//   as: 'specs',
// });

// BatterySpec.belongsTo(Battery, {
//   foreignKey: 'batteryid',
// });

// module.exports = { Battery, BatterySpec };
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// Import models
const Admin = require('./Admin');
const WarrantyClaim = require('./WarrantyClaim');
const BatteryPara2 = require('./BatteryPara2');
const Battery = require('./Battery');
const BatterySpec = require('./BatterySpec');

// Define associations
Battery.hasOne(BatterySpec, {
  foreignKey: 'batteryid',
  as: 'specs',
});

BatterySpec.belongsTo(Battery, {
  foreignKey: 'batteryid',
});

// Export all models and sequelize instance
module.exports = {
  sequelize,
  Sequelize, // Optional: useful for Sequelize.DataTypes
  Admin,
  WarrantyClaim,
  BatteryPara2,
  Battery,
  BatterySpec,
};
