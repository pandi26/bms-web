// ToggleSwitch.js
import React, { useState } from 'react';
import axios from 'axios';

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false); // Initial state: false (off)

  // Handle toggle state change and send to the backend
  const handleToggle = async () => {
    try {
      const newState = !isToggled; // Toggle the current state

      // Send the new state to the Express backend
      const response = await axios.post('http://localhost:5000/api/toggle', {
        state: newState
      });

      if (response.status === 200) {
        setIsToggled(newState); // Update the local toggle state if the request is successful
      }
    } catch (error) {
      console.error('Error toggling:', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
      <label htmlFor="toggleSwitch" style={{ marginRight: '10px' }}>
        Hardware Control
      </label>
      <button
        id="toggleSwitch"
        onClick={handleToggle} // Trigger state change on button click
        style={{
          padding: '10px 20px',
          backgroundColor: isToggled ? 'green' : 'red', // Change color based on state
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {isToggled ? 'ON' : 'OFF'} {/* Change text based on state */}
      </button>
    </div>
  );
};

export default ToggleSwitch;
