const { encrypt } = require("../utils/encrypt");
const { validateData } = require("../middleware/dataValidator");

function handleData(rawData) {
  console.log("📥 Raw UART Data:", rawData);

  const data = parseJSON(rawData);
  if (!data || !validateData(data)) return;

  const encrypted = encrypt(JSON.stringify(data));

  // store or forward encrypted data
  console.log("🔐 Encrypted Data:", encrypted);
}

function parseJSON(input) {
  try {
    return JSON.parse(input);
  } catch {
    console.warn("⚠️ Invalid JSON Format");
    return null;
  }
}

module.exports = { handleData };
//