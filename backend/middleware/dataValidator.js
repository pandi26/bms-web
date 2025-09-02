function validateData(data) {
  if (!data.voltage || !data.temperature) {
    console.warn("⚠️ Missing required fields");
    return false;
  }

  if (data.voltage < 0 || data.voltage > 100) {
    console.warn("⚠️ Unsafe Voltage Detected");
    return false;
  }

  return true;
}

module.exports = { validateData };
