import React, { useState } from 'react';
import './styles/batteryBalance.css'; // Update your CSS based on new classes too!

const BatteryBalance = () => {
  const [message, setMessage] = useState('');
  const [balancingCell, setBalancingCell] = useState(null); // Track which cell is balancing

  const parameterTips = [
    { parameter: 'Under Voltage Limit', recommended: '2.8V - 3.0V', description: 'Avoid deep discharge and protect battery life.' },
    { parameter: 'Over Voltage Limit', recommended: '4.15V - 4.20V', description: 'Prevents overcharging and heating.' },
    { parameter: 'Low Temperature Limit', recommended: '0°C', description: 'Do not charge battery below this temperature.' },
    { parameter: 'High Temperature Limit', recommended: '45°C - 50°C', description: 'Stop charging or discharging above this range.' },
    { parameter: 'Recommended Battery Size', recommended: '100W load = 12V 10Ah', description: 'Choose based on device power needs.' },
  ];

  const cells = [
    { id: 1, temperature: 50, capacity: 85, voltage: 3.60, cycles: 200, chargeStatus: 'Charging', needsBalance: true },
    { id: 2, temperature: 30, capacity: 90, voltage: 3.80, cycles: 150, chargeStatus: 'Full', needsBalance: false },
    { id: 3, temperature: 40, capacity: 75, voltage: 3.65, cycles: 180, chargeStatus: 'Charging', needsBalance: true },
  ];

  const handleBalance = (cellId) => {
    setBalancingCell(cellId);
    setMessage('');
    setTimeout(() => {
      setMessage(`✅ Cell ${cellId} balanced successfully!`);
      setBalancingCell(null);
    }, 1500); // Simulate balancing delay
  };

  return (
    <div className="battery-balance-container">
      <h1>🔋 Battery Balancing & Setup Tips</h1>
      <p className="subtitle">Monitor your cells and apply the best practices for maximum battery life.</p>

      {message && <div className="message success">{message}</div>}

      <div className="setup-tips card">
        <h2>⚙️ Recommended Settings</h2>
        <table className="tips-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Recommended Range</th>
              <th>Why It Matters</th>
            </tr>
          </thead>
          <tbody>
            {parameterTips.map((tip, index) => (
              <tr key={index}>
                <td>{tip.parameter}</td>
                <td>{tip.recommended}</td>
                <td>{tip.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="maintenance-tips card">
        {cells.some(cell => cell.temperature > 45) && (
          <p className="warning">⚠️ High temperature detected in one or more cells! Please cool them immediately.</p>
        )}
        {cells.every(cell => cell.capacity > 80) && (
          <p className="good">✅ All cells are in excellent health!</p>
        )}
      </div>

      <div className="cells-status card">
        <h2>📋 Cells Status</h2>
        <table className="balance-table">
          <thead>
            <tr>
              <th>Cell ID</th>
              <th>Status</th>
              <th>Voltage (V)</th>
              <th>Capacity (%)</th>
              <th>Temperature (°C)</th>
              <th>Cycles</th>
              <th>Charge Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cells.map(cell => (
              <tr key={cell.id} className={cell.temperature > 45 ? 'high-temp' : ''}>
                <td>Cell {cell.id}</td>
                <td>
                  <span className={`status-badge ${cell.needsBalance ? 'needs' : 'balanced'}`}>
                    {cell.needsBalance ? 'Needs Balance' : 'Balanced'}
                  </span>
                </td>
                <td>{cell.voltage}</td>
                <td>{cell.capacity}%</td>
                <td>{cell.temperature}°C</td>
                <td>{cell.cycles}</td>
                <td>{cell.chargeStatus}</td>
                <td>
                  {cell.needsBalance ? (
                    <button 
                      onClick={() => handleBalance(cell.id)}
                      disabled={balancingCell === cell.id}
                      className="balance-button"
                    >
                      {balancingCell === cell.id ? 'Balancing...' : 'Balance'}
                    </button>
                  ) : (
                    <span className="already-balanced">Balanced</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatteryBalance;
