import React, { useState, useEffect } from "react";
import Footer from "../navbar/Footer";
import {
  FaBars,
  FaUserCircle,
  FaBell,
  FaBatteryFull,
  FaChartLine,
  FaHistory,
  FaCogs,
  FaSlidersH,
  FaTools,
  FaTimes,
} from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";
import { Link } from "react-router-dom";
import "../functions/styles/EngineeringModel.css";
import "../functions/styles/Stylee.css";

function EngineeringModel() {
  const [batterySOC, setBatterySOC] = useState(100);
  const [notifications, setNotifications] = useState(3);
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPort, setSelectedPort] = useState("");
  const [selectedParity, setSelectedParity] = useState("");
  const [selectedBaudRate, setSelectedBaudRate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setBatterySOC((prev) =>
        Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 5))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBalanceTesting = () => {
    console.log("Balance Testing Started...");
    alert("Balance Testing in Progress...");
  };

  return (
    <div className="rtbDashboard">
      <aside className="rtbSidebar">
        <h2 className="headd">Elaicle</h2>
        <h3 className="rtbSidebarTitle">Current</h3>
        <ReactSpeedometer
          maxValue={100}
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

      <div className="hrtbMain">
        <div className="controlManagerHeader">
          <h2>Control Manager</h2>
          {["Balance Testing", "Current 0A calibration", "BMS Sleep", "Current calibration", "Restart Bms", "Current Accuracy test"].map((label, index) => (
            <button  key={index} className="balanceTestButton" onClick={handleBalanceTesting}>
              {label}
            </button>
          ))}
        </div>

        <div className="cmh2">
          <h3>BMS Address Manager</h3>
          <input type="text" placeholder="Board No:" />
          <input type="text" placeholder="Slave Num:" />
          <button className="ButtonSet">Read</button>
          <button className="ButtonSet">Set</button>
        </div>

      

        <div className="cmh3">
          <h3>WakeUp Method</h3>
          {["Key", "Button", "485", "CAN", "CURRENT"].map((method, index) => (
            <button className="ButtonSet" key={index}>{method}</button>
          ))}
        </div> 
        
         <div className="cmh4">
          Fan ON(`C`):<input type="text" placeholder="Board No:" />
          MosTemp :<input type="text" placeholder="Slave Num:" />
          Heat ON (`C) :<input type="text" placeholder="Slave Num:" />
          Key COntrol MOS :<input type="text" placeholder="Slave Num:" />
          <button className="ButtonSet">Read</button>
          <button className="ButtonSet">Set</button>
        </div>

        <div className="cmh5">
          Inverter Manager<input type="text" placeholder="Board No:" />
          Comm Type<input type="text" placeholder="Slave Num:" />
            <button className="ButtonSet">Select</button>
          <button className="ButtonSet">Read</button>
        </div>

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
            {[
              { to: "/functions/RtbatteryMonitoring", icon: FaChartLine, label: "Status" },
              { to: "/functions/BatteryCharge", icon: FaBatteryFull, label: "Battery Health" },
              { to: "/functions/HistoricalDataLogs", icon: FaHistory, label: "Historical Data" },
              { to: "/functions/ParameterSetting", icon: FaSlidersH, label: "Parameter Setting" },
              { to: "/functions/ActiveEquilibrium", icon: FaTools, label: "ActiveEquilibrium" },
              { to: "/functions/EngineeringModel", icon: FaTools, label: "Engineering Model" }
            ].map(({ to, icon: Icon, label }, index) => (
              <li key={index}><Link to={to}><Icon /> {label}</Link></li>
            ))}
          </ul>
        </nav>

       <nav className="rtbNavbar2">
                 <ul className="rtbNavuser">
                 <div className="Hicon"> <a href="http://localhost:3000/components/UserProfile"><FaUserCircle /></a></div> <li>  </li>
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
                {["COM1", "COM2", "COM3", "COM4"].map((port) => (
                  <option key={port} value={port}>{port}</option>
                ))}
              </select>
              <label>Parity:</label>
              <select value={selectedParity} onChange={(e) => setSelectedParity(e.target.value)}>
                {["None", "Even", "Odd"].map((parity) => (
                  <option key={parity} value={parity}>{parity}</option>
                ))}
              </select>
              <label>Baud Rate:</label>
              <select value={selectedBaudRate} onChange={(e) => setSelectedBaudRate(e.target.value)}>
                {["9600", "14400", "19200", "38400", "57600", "115200"].map((rate) => (
                  <option key={rate} value={rate}>{rate}</option>
                ))}
              </select>
              <div className="popupButtons">
                <button onClick={() => console.log("Refreshing Port...")}>Refresh Port</button>
                <button onClick={() => console.log("Opening Port...")}>Open Port</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EngineeringModel;
