const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // correct path to your db

const WarrantyClaim = sequelize.define('WarrantyClaim', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  battery_serial: DataTypes.STRING,
  purchase_date: DataTypes.DATE,
  tech_verify: {
    type: DataTypes.STRING,
  allowNull: true,
  },
  
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
}, {
  timestamps: true,
  tableName: 'warranty_claims',
});

module.exports = WarrantyClaim;
