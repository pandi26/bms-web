// backend/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');  // to send HTTP requests to ESP8266

// Endpoint to handle toggle switch state change
router.post('/toggle', async (req, res) => {
  const { state } = req.body;  // state will be either true or false

  try {
    // Send the state to ESP8266 via HTTP (ESP8266 is connected to Wi-Fi)
    const esp8266Response =axios.post('http://192.168.1.58/control', { state: true }, { timeout: 5000 }) // 5 seconds


    if (esp8266Response.status === 200) {
      res.status(200).send({ message: 'Hardware state updated' });
    } else {
      res.status(500).send({ message: 'Failed to communicate with ESP8266' });
    }
  } catch (error) {
    console.error('Error toggling hardware:', error);
    res.status(500).send({ message: 'Failed to toggle hardware' });
  }
});

module.exports = router;
 