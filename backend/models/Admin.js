
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("admins", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // ✅ Ensures no duplicate emails
      validate: {
        isEmail: true,  // ✅ Validates correct email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true, // Age is optional but can be required if needed
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, // Address is optional
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, // Phone is optional
      validate: {
        isNumeric: true, // Ensures only numbers are entered
        len: [10, 15],  // Phone number should be between 10 and 15 digits
      },
    },
  }, { timestamps: true });

module.exports = Admin;
