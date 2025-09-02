const express = require('express');
const router = express.Router();
const equilibriumController = require('../controllers/equilibriumController');

// POST: Set equilibrium parameters
router.post('/set-equilibrium', equilibriumController.setEquilibrium);

// POST: Turn off equilibrium
router.post('/turn-off-equilibrium', equilibriumController.turnOffEquilibrium);

module.exports = router;
