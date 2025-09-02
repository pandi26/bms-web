const { Sequelize } = require("sequelize");

// Set up Sequelize instance to connect to MySQL database
const sequelize = new Sequelize("bms-web", "root", "", {
    host: "127.0.0.1",  // Using IP address instead of localhost for reliability
    dialect: "mysql",   // MySQL database
    port: 3306,         // Default MySQL port
    logging: console.log,  // Enable logging for SQL queries (helpful for debugging)
});

// Test the connection to the database
sequelize.authenticate()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => console.error("❌ Database connection error:", err));

// Export the sequelize instance for use in models and other files
module.exports = sequelize;
