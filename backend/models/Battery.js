const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path to your Sequelize config

const Battery = sequelize.define('Battery', {
  battery_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'battery_id',
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purchaseDetails: {
    type: DataTypes.JSON,
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
  tableName: 'batteries',
});

Battery.associate = (models) => {
  Battery.hasOne(models.BatterySpec, {
    foreignKey: 'battery_id',
    as: 'specs',
  });
};

module.exports = Battery;