// module.exports = (sequelize, DataTypes) => {
//     const BatteryData = sequelize.define('BatteryData', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       user_id:{
//           type: DataTypes.VARCHAR(30),
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING(11), // Max length 11 for email
//         allowNull: false,
//       },
//       cell1: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//       },
//       cell2: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//       },
//       cell3: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//       },
//       voltage: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//       },
//       current: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       temperature: {
//         type: DataTypes.FLOAT,
//         allowNull: true,
//       },
//       timestamp: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       event: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.STRING(50),
//         allowNull: true,
//       },
//     }, {
//       tableName: 'battery_data',
//       timestamps: false, // Set this to false if you don't have createdAt/updatedAt
//     });
  
//     return BatteryData;
//   };
  // backend/models/BatteryData.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // your Sequelize instance

const BatteryData = sequelize.define('BatteryData', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.STRING, allowNull: false },
  cell1: DataTypes.FLOAT,
  cell2: DataTypes.FLOAT,
  cell3: DataTypes.FLOAT,
  voltage: DataTypes.FLOAT,
  current: DataTypes.FLOAT,
  temperature: DataTypes.FLOAT,
  timestamp: DataTypes.DATE,
  soc: DataTypes.FLOAT,
  event: DataTypes.STRING,
  status: DataTypes.STRING,
}, {
  tableName: 'battery_data',
  timestamps: false,
});

module.exports = { BatteryData };
