const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const { port, baudRate } = require("../config/serialConfig");
const { handleData } = require("../controllers/bmsController");

const serial = new SerialPort(port, { baudRate });
const parser = serial.pipe(new Readline({ delimiter: '\n' }));

parser.on("data", handleData);

serial.on("open", () => {
  console.log(`[✅] Serial Port ${port} opened at ${baudRate} baud`);
});

serial.on("error", err => {
  console.error(`[❌] Serial Port Error: ${err.message}`);
});

module.exports = serial;
