const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.SERIAL_PORT,
  baudRate: parseInt(process.env.BAUD_RATE),
};
