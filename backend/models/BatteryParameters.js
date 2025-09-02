const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BatteryParameters = sequelize.define('battery_parameters', {
 
  //   user_id: {
  //   type: DataTypes.STRING, // ✅ Use STRING for VARCHAR fields
  //   allowNull: false,
  // },

  
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  under_voltage_alarm_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  under_voltage_delay_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  over_voltage_alarm_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  over_voltage_delay_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  low_temp_alarm_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  low_temp_delay_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  high_temp_alarm_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  high_temp_delay_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false // IMPORTANT
});

module.exports = BatteryParameters;
