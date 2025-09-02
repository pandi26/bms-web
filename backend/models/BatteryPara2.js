const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BatteryPara2 = sequelize.define('battery_parameters', {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      battery_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      under_voltage_alarm_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      under_voltage_delay_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      over_voltage_alarm_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      over_voltage_delay_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      low_temp_alarm_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      low_temp_delay_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      high_temp_alarm_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      high_temp_delay_value: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      // Model options
    });


module.exports = BatteryPara2;