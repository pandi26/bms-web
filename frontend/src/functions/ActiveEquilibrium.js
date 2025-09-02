import React, { useState, useEffect } from "react";
import Footer from "../navbar/Footer";
import {
  FaBars, FaUserCircle, FaBell, FaBatteryFull, FaChartLine,
  FaHistory, FaSlidersH, FaTools, FaTimes
} from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";
import { Link } from "react-router-dom";
import "../functions/styles/ActiveEquilibrium.css";
//  import "../functions/styles/Stylee.css";

function ActiveEquilibrium() {
  const [batterySOC, setBatterySOC] = useState(100);
  //const [notifications, setNotifications] = useState(3);
  const [notifications] = useState([]);

  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPort, setSelectedPort] = useState("");
  const [selectedParity, setSelectedParity] = useState("");
  const [selectedBaudRate, setSelectedBaudRate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setBatterySOC((prev) => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 5)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCommSubmit = () => {
    console.log("Selected Comm Port:", selectedPort);
    console.log("Selected Parity:", selectedParity);
    console.log("Selected BaudRate:", selectedBaudRate);
    setShowPopup(false);
  };

  return (
    <div className="rtbDashboard">
      <aside className="rtbSidebar">
        <h2 className="headd">Elaicle</h2>
        <h3 className="rtbSidebarTitle">Current</h3>
        <ReactSpeedometer
          maxValue={10}
          value={batterySOC}
          needleColor="white"
          startColor="green"
          endColor="red"
          textColor="white"
          width={150}
          height={100}
        />
        <h3 className="rtbSidebarTitle1">Battery SOC</h3>
        <div className={`rtbSidebarBox ${batterySOC < 20 ? "rtbBgRed" : "rtbBgGreen"}`}>
          {batterySOC}%
        </div>
      </aside>

      <div className="rtbMain">
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
                                  <li><Link to="/functions/ActiveEquilibrium"><FaTools /> ActiveEquilibrium</Link></li>
                                  <li><Link to="/functions/EngineeringModel"><FaTools /> Engineering Model</Link></li>
                      
                    </ul>
        </nav>

        <div className="lleftside">
          <div className="parmeterSection">
            <h2>Active Equilibrium</h2>
            <label>Equilibrium Current: None</label>
            <input type="number" />
           <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection1">
            <label>Number of Battery: None</label>
            <input type="number" />
            <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection2">
            <label>Equilibrium Start Volt: None</label>
            <input type="number" />
            <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection3">
            <label>Equilibrium diff Volt: None</label>
            <input type="number" />
              <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection4">
            <label>Sleep time: None</label>
            <input type="number" />
             <button className="ButtonSet">Set</button>
          </div>
        </div>

        <div className="rrightside">
          <div className="parmeterSection">
            <h2>Active Equilibrium</h2>
            <label>Equilibrium Current: None</label>
            <input type="number" />
             <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection1">
            <label>Number of Battery: None</label>
            <input type="number" />
              <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection2">
            <label>Equilibrium Start Volt: None</label>
            <input type="number" />
             <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection3">
            <label>Equilibrium diff Volt: None</label>
            <input type="number" />
             <button className="ButtonSet">Set</button>
          </div>

          <div className="parmeterSection4">
            <label>Sleep time: None</label>
            <input type="number" />
             <button className="ButtonSet">Set</button>
          </div>
        </div>

        <div className="bbottom">
          <div className="bottom">
            <label>Equilibrium State: Off</label>
          </div>
          <div className="bottm">
            <label>Equilibrium State: 0 A</label>
          </div>
          <div className="bottm">
            <label>Equilibrium State: 0</label>
          </div>
        </div>

        <nav className="rtbNavbar2">
          <ul className="rtbNavuser">
            <div className="Hicon">
              <a href="http://localhost:3000/components/UserProfile"><FaUserCircle /></a>
            </div>
            <li></li>
            <div className="rtbNotification">
              <FaBell />
              {notifications > 0 && <span className="rtbNotificationBadge">{notifications}</span>}
            </div>
          </ul>
        </nav>

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
              </select>

              <label>Parity:</label>
              <select value={selectedParity} onChange={(e) => setSelectedParity(e.target.value)}>
                <option value="">-- Select Parity --</option>
                <option value="None">None</option>
                <option value="Even">Even</option>
                <option value="Odd">Odd</option>
              </select>

              <label>Baud Rate:</label>
              <select value={selectedBaudRate} onChange={(e) => setSelectedBaudRate(e.target.value)}>
                <option value="">-- Select Baud Rate --</option>
                <option value="9600">9600</option>
                <option value="14400">14400</option>
                <option value="19200">19200</option>
                <option value="38400">38400</option>
                <option value="57600">57600</option>
                <option value="115200">115200</option>
              </select>

              <div className="popupButtons">
                <button onClick={handleCommSubmit}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ActiveEquilibrium;
