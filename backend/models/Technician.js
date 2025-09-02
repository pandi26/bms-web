    const { DataTypes } = require("sequelize");
    const sequelize = require("../config/db");  // ✅ Import sequelize properly

    const Technician = sequelize.define("technicians", {  // ✅ Ensure table name is lowercase
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER },
        address: { type: DataTypes.STRING },
        phone: { type: DataTypes.STRING },
        expertise: { type: DataTypes.STRING, allowNull: false },
    }, { 
        timestamps: true,  // ✅ Disable timestamps if not needed
        tableName: "technicians"  // ✅ Ensure table name matches MySQL
    });

    module.exports = Technician;
