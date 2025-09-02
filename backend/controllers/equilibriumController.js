const EquilibriumSettings = require('../models/equilibriumSettings');

// POST: Create or update equilibrium settings
exports.setEquilibrium = async (req, res) => {
  const { equilibriumCurrent, numberOfBatteries, startVoltage, diffVoltage, sleepTime } = req.body;

  try {
    // Check if a setting already exists
    let setting = await EquilibriumSettings.findOne({
      where: { status: 'on' }, // Find if an active equilibrium exists
    });

    if (setting) {
      // If an active equilibrium exists, update it
      setting = await setting.update({
        equilibrium_current: equilibriumCurrent,
        number_of_batteries: numberOfBatteries,
        start_voltage: startVoltage,
        diff_voltage: diffVoltage,
        sleep_time: sleepTime,
        status: 'on',
      });
    } else {
      // Otherwise, create a new equilibrium setting
      setting = await EquilibriumSettings.create({
        equilibrium_current: equilibriumCurrent,
        number_of_batteries: numberOfBatteries,
        start_voltage: startVoltage,
        diff_voltage: diffVoltage,
        sleep_time: sleepTime,
        status: 'on',
      });
    }

    res.status(200).json({ message: 'Equilibrium settings updated successfully', setting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error setting equilibrium', error });
  }
};

// POST: Turn off active equilibrium
exports.turnOffEquilibrium = async (req, res) => {
  try {
    const setting = await EquilibriumSettings.findOne({ where: { status: 'on' } });

    if (setting) {
      setting.status = 'off';
      await setting.save();
      res.status(200).json({ message: 'Equilibrium turned off successfully' });
    } else {
      res.status(404).json({ message: 'No active equilibrium found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error turning off equilibrium', error });
  }
};
