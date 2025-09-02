import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BatteryStatus() {
  const [batteryData, setBatteryData] = useState(null);

  useEffect(() => {
    // Fetch real-time battery data from the backend API
    axios.get('http://localhost:5000/api/battery-status')
      .then((response) => {
        setBatteryData(response.data);
      })
      .catch((error) => console.error('Error fetching battery data:', error));
  }, []);

  if (!batteryData) {
    return <div>Loading battery data...</div>;
  }

  return (
    <div>
      <h1>Battery Health Status</h1>
      <ul>
        <li>Voltage: {batteryData.voltage} V</li>
        <li>Current: {batteryData.current} A</li>
        <li>Temperature: {batteryData.temperature} °C</li>
        <li>Charge Status: {batteryData.chargeStatus}%</li>
        {batteryData.alert && <li style={{ color: 'red' }}>Alert: {batteryData.alert}</li>}
      </ul>
    </div>
  );
}

export default BatteryStatus;
