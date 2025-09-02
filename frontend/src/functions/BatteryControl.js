import React, { useState } from 'react';
import Axios from 'axios';

const BatteryControl = () => {
  const [switchState, setSwitchState] = useState('OFF');

  // Send ON/OFF control command to backend
  const controlSwitch = async (state) => {
    try {
      await Axios.post('http://localhost:5000/api/control-hardware', { state });
      setSwitchState(state); // Update the UI with the current state
    } catch (error) {
      console.error('Error controlling switch:', error);
    }
  };

  return (
    <div>
      <h2>Hardware Control</h2>
      <button onClick={() => controlSwitch('ON')}>
        Turn ON Hardware
      </button>
      <button onClick={() => controlSwitch('OFF')}>
        Turn OFF Hardware
      </button>
      <p>Switch State: {switchState}</p>
    </div>
  );
};

export default BatteryControl;
