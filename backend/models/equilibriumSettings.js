const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EquilibriumSettings = sequelize.define('EquilibriumSettings', {
  equilibrium_current: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  number_of_batteries: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_voltage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  diff_voltage: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  sleep_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('off', 'on'),
    defaultValue: 'off',
  },
}, {
  tableName: 'equilibrium_settings',
  timestamps: true,
});

module.exports = EquilibriumSettings;
