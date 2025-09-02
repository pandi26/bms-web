import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../navbar/Footer";
import {
  FaBars, FaUserCircle, FaBell, FaBatteryFull, FaChartLine,
  FaHistory, FaSlidersH, FaTools, FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";
import "../functions/styles/ActiveEquilibrium.css";
import "../functions/styles/Stylee.css";
import "../functions/styles/batteryMonitor.css";

const BatteryMonitor = () => {
  const [batteryData, setBatteryData] = useState(null);
  const [alarms, setAlarms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPort, setSelectedPort] = useState("");
  const [selectedParity, setSelectedParity] = useState("");
  const [selectedBaudRate, setSelectedBaudRate] = useState("");

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        setError(null); // Clear previous errors
        const response = await axios.get('http://localhost:5000/api/battery24/monitor');
        
        // Check if response is successful
        if (response.data && response.data.success) {
          const { batteryData: battery, alarms: batteryAlarms } = response.data.data;
          
          setBatteryData(battery);
          setAlarms(batteryAlarms);
          
          // Count active alarms for notification badge
          const activeAlarms = Object.values(batteryAlarms || {}).filter(alarm => alarm === true).length;
          setNotifications(activeAlarms);
          
          setLoading(false);
        } else {
          throw new Error(response.data?.message || 'Failed to fetch battery data');
        }
      } catch (error) {
        console.error("Error fetching battery data:", error);
        setError(error.response?.data?.message || error.message || 'Failed to fetch battery data');
        setLoading(false);
        
        // Set default values to prevent crashes
        setBatteryData({
          cell1: 0,
          cell2: 0,
          cell3: 0,
          temperature: 0,
          current: 0
        });
        setAlarms({
          undervoltage: false,
          overvoltage: false,
          undertemperature: false,
          overtemperature: false
        });
      }
    };

    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCommSubmit = () => {
    if (!selectedPort || !selectedParity || !selectedBaudRate) {
      alert('Please select all communication parameters');
      return;
    }
    
    console.log("Selected Comm Port:", selectedPort);
    console.log("Selected Parity:", selectedParity);
    console.log("Selected BaudRate:", selectedBaudRate);
    setShowPopup(false);
    
    // Here you can make an API call to save these settings
    // axios.post('http://localhost:5000/api/comm/settings', { port: selectedPort, parity: selectedParity, baudRate: selectedBaudRate });
  };

  // Calculate average voltage for speedometer
  const getAverageVoltage = () => {
    if (!batteryData) return 0;
    return ((batteryData.cell1 + batteryData.cell2 + batteryData.cell3) / 3).toFixed(2);
  };

  // Get speedometer color based on voltage
  const getSpeedometerValue = () => {
    if (!batteryData) return 0;
    const avgVoltage = parseFloat(getAverageVoltage());
    // Convert voltage to percentage (assuming 3.7V nominal, 4.2V max, 3.0V min)
    return Math.min(Math.max(((avgVoltage - 3.0) / (4.2 - 3.0)) * 100, 0), 100);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading battery data...</p>
      </div>
    );
  }

  return (
    <div className="rtbDashboard">
      <aside className="rtbSidebar">
        <h2 className="navbar1-logo"></h2>
        <h3 className="rtbSidebarTitle">Battery Status</h3>
        <ReactSpeedometer
          maxValue={100}
          value={getSpeedometerValue()}
          needleColor="white"
          startColor="green"
          endColor="red"
          textColor="white"
          width={150}
          height={100}
          segments={5}
          valueTextFontSize="12px"
          labelFontSize="10px"
        />
        <h3 className="rtbSidebarTitle1">Avg Voltage</h3>
        <div className="rtbSidebarBox rtbBgGreen">
          {getAverageVoltage()} V
        </div>
       
      </aside>

      <div className="rtbMain">
        {/* Top Navbar */}
        <nav className="rtbNavbar">
          <FaBars className="rtbIcon" onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="menuCard">
              <ul>
                <li><button>Board</button></li>
                <li><button onClick={() => setShowPopup(true)}>Comm</button></li>
                <li><button onClick={() => window.location.reload()}>Refresh</button></li>
              </ul>
            </div>
          )}
          <ul className="rtbNavLinks">
            <li><Link to="/functions/RtbatteryMonitoring"><FaChartLine /> Status</Link></li>
            <li><Link to="/functions/BatteryCharge"><FaBatteryFull /> Battery Health</Link></li>
            <li><Link to="/functions/HistoricalDataLogs"><FaHistory /> Historical Data</Link></li>
            <li><Link to="/functions/ParameterSetting"><FaSlidersH /> Parameter Setting</Link></li>
            <li><Link to="/functions/BatteryMonitor"><FaTools /> Battery Notification</Link></li>
            <li><Link to="/dashboard"> Dashboard</Link></li>
          </ul>
        </nav>

        {/* Second Navbar */}
        <nav className="rtbNavbar2">
          <ul className="rtbNavuser">
            <div className="Hicon">
              <a href="http://localhost:3000/components/UserProfile"><FaUserCircle /></a>
            </div>
            <li></li>
            <div className="rtbNotification">
              <div className="notificationIconWrapper">
                <FaBell />
                {notifications > 0 && (
                  <span className="notificationBadge">{notifications}</span>
                )}
              </div>
            </div>
          </ul>
        </nav>

        {/* Error Display */}
        {error && (
          <div className="errorMessage">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {/* Popup for Comm Settings */}
        {showPopup && (
          <div className="popupOverlay">
            <div className="popupContent">
              <FaTimes className="popupCloseIcon" onClick={() => setShowPopup(false)} />
              <h3>Select Communication Port</h3>

              <label>Comm Port:</label>
              <select value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)}>
                <option value="">-- Select Port --</option>
                <option value="COM1">COM1</option>
                <option value="COM2">COM2</option>
                <option value="COM3">COM3</option>
                <option value="COM4">COM4</option>
                <option value="COM5">COM5</option>
                <option value="COM6">COM6</option>
              </select>

              <label>Parity:</label>
              <select value={selectedParity} onChange={(e) => setSelectedParity(e.target.value)}>
                <option value="">-- Select Parity --</option>
                <option value="None">None</option>
                <option value="Even">Even</option>
                <option value="Odd">Odd</option>
                <option value="Mark">Mark</option>
                <option value="Space">Space</option>
              </select>

              <label>Baud Rate:</label>
              <select value={selectedBaudRate} onChange={(e) => setSelectedBaudRate(e.target.value)}>
                <option value="">-- Select Baud Rate --</option>
                <option value="1200">1200</option>
                <option value="2400">2400</option>
                <option value="4800">4800</option>
                <option value="9600">9600</option>
                <option value="14400">14400</option>
                <option value="19200">19200</option>
                <option value="38400">38400</option>
                <option value="57600">57600</option>
                <option value="115200">115200</option>
              </select>

              <div className="popupButtons">
                <button onClick={handleCommSubmit} className="confirmBtn">Confirm</button>
                <button onClick={() => setShowPopup(false)} className="cancelBtn">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Main Battery Monitoring Info */}
        <div className="batteryMonitorContent">
          <h1 className="batteryTitle">🔋 Battery Notification Dashboard</h1>

          {batteryData && alarms && (
            <div className="batteryGrid">
              {/* Battery Voltages */}
              <div className="batteryCard">
                <h2>📊 Cell Voltages</h2>
                <ul className="batteryList">
                  <li>
                    <span>Cell 1:</span> 
                    <span className={batteryData.cell1 < 3.0 ? 'voltage-low' : batteryData.cell1 > 4.2 ? 'voltage-high' : 'voltage-normal'}>
                      {batteryData.cell1.toFixed(2)} V
                    </span>
                  </li>
                  <li>
                    <span>Cell 2:</span> 
                    <span className={batteryData.cell2 < 3.0 ? 'voltage-low' : batteryData.cell2 > 4.2 ? 'voltage-high' : 'voltage-normal'}>
                      {batteryData.cell2.toFixed(2)} V
                    </span>
                  </li>
                  <li>
                    <span>Cell 3:</span> 
                    <span className={batteryData.cell3 < 3.0 ? 'voltage-low' : batteryData.cell3 > 4.2 ? 'voltage-high' : 'voltage-normal'}>
                      {batteryData.cell3.toFixed(2)} V
                    </span>
                  </li>
                </ul>
                <div className="averageVoltage">
                  <strong>Average: {getAverageVoltage()} V</strong>
                </div>
              </div>

              {/* Temperature */}
              <div className="batteryCard">
                <h2>🌡️ Temperature</h2>
                <div className={`batteryTemp ${
                  batteryData.temperature < 0 ? 'temp-low' : 
                  batteryData.temperature > 45 ? 'temp-high' : 'temp-normal'
                }`}>
                  {batteryData.temperature.toFixed(1)} °C
                </div>
                <div className="tempStatus">
                  {batteryData.temperature < 0 ? '❄️ Too Cold' : 
                   batteryData.temperature > 45 ? '🔥 Too Hot' : '✅ Normal'}
                </div>
              </div>

              {/* Current */}
              <div className="batteryCard">
                <h2>⚡ Current</h2>
                <div className="batteryCurrent">
                  {batteryData.current.toFixed(2)} A
                </div>
                <div className="currentDirection">
                  {batteryData.current > 0 ? '🔋 Charging' : 
                   batteryData.current < 0 ? '⚡ Discharging' : '⏹️ Idle'}
                </div>
              </div>

              {/* Alarms */}
              <div className="batteryCard alarmCard">
                <h2>🚨 Alarms Status</h2>
                <ul className="alarmList">
                  <li style={{ color: alarms.undervoltage ? '#ff4444' : '#44ff44' }}>
                    {alarms.undervoltage ? '⚠️ Under Voltage Triggered' : '✅ Under Voltage Normal'}
                  </li>
                  <li style={{ color: alarms.overvoltage ? '#ff4444' : '#44ff44' }}>
                    {alarms.overvoltage ? '⚠️ Over Voltage Triggered' : '✅ Over Voltage Normal'}
                  </li>
                  <li style={{ color: alarms.undertemperature ? '#ff4444' : '#44ff44' }}>
                    {alarms.undertemperature ? '⚠️ Under Temperature Triggered' : '✅ Under Temperature Normal'}
                  </li>
                  <li style={{ color: alarms.overtemperature ? '#ff4444' : '#44ff44' }}>
                    {alarms.overtemperature ? '⚠️ Over Temperature Triggered' : '✅ Over Temperature Normal'}
                  </li>
                </ul>
                
                {/* Overall Status */}
                <div className="overallStatus">
                  {Object.values(alarms).some(alarm => alarm) ? (
                    <div className="statusDanger">🚨 ALARM ACTIVE</div>
                  ) : (
                    <div className="statusNormal">✅ ALL SYSTEMS NORMAL</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Last Updated */}
          {batteryData && batteryData.timestamp && (
            <div className="lastUpdated">
              <small>Last updated: {new Date(batteryData.timestamp).toLocaleString()}</small>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BatteryMonitor;