const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BatterySpec = sequelize.define('BatterySpec', {
  battery_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'battery_id',
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  voltage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  range: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'battery_specs',
});

BatterySpec.associate = (models) => {
  BatterySpec.belongsTo(models.Battery, {
    foreignKey: 'battery_id',
    as: 'battery',
  });
};

module.exports = BatterySpec;