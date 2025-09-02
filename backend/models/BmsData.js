// models/BmsData.js
module.exports = (sequelize, DataTypes) => {
    const BmsData = sequelize.define('BmsData', {
      voltage: DataTypes.FLOAT,
      temperature: DataTypes.FLOAT,
    }, {
      tableName: 'bms_data', // 👈 This must match your actual SQL table name
      timestamps: false,     // Optional: disables createdAt/updatedAt if not needed
    });
  
    return BmsData;
  };
  