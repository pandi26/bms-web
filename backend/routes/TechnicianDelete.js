// Backend route to delete technician and their associated data
const express = require("express");
const router = express.Router();

router.delete('/technicians-d/:id', async (req, res) => {
    try {
      const technicianId = req.params.id;
  
      // Delete technician's associated battery data first
      await BatteryData.destroy({ where: { technicianId } });  // Assuming you have a `BatteryData` model
  
      // Then delete the technician
      const technician = await Technician.findByPk(technicianId);
  
      if (!technician) {
        return res.status(404).json({ message: 'Technician not found' });
      }
  
      await technician.destroy();
  
      // Optionally send an email or other notification
      // sendEmail(technician.email, 'Your technician account has been deleted');
  
      res.json({ message: 'Technician and associated data deleted successfully' });
    } catch (err) {
      console.error('Error deleting technician and data:', err);
      res.status(500).json({ message: 'Error deleting technician and associated data' });
    }
  });
  module.exports = router;