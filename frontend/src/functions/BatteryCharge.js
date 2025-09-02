import React, { useState, useEffect } from "react";
import Footer from "../navbar/Footer";
import {
  FaBars, FaUserCircle, FaBell, FaBatteryFull, FaChartLine,
  FaHistory, FaSlidersH, FaTools
} from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../functions/styles/BatteryCharge.css";
import "../functions/styles/Stylee.css";

function BatteryCharge() {
  const navigate = useNavigate();  // Hook to navigate
  const [batterySOC, setBatterySOC] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [lifespan, setLifespan] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [safeLimit, setSafeLimit] = useState(0);
  const [ecoMode, setEcoMode] = useState("");
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);  
  const [maxVolt, setMaxVolt] = useState(0);
  const [maxVoltPos, setMaxVoltPos] = useState("");
  const [minVoltPos, setMinVoltPos] = useState("");
  const [remainCap, setRemainCap] = useState(0);
  const [performance, setPerformance] = useState("");
  const [error, setError] = useState(""); // State for error message

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/battery-health");
        const data = response.data;

        // Set the data to respective states
        setBatterySOC(data.soc);
        setTemperature(data.temperature);
        setCycles(data.cycles);
        setVoltage(data.voltage);
        setCurrent(data.current);
        setRemainCap(data.remainingCapacity);
        setPerformance(data.performance);
        setMaxVolt(data.maxVoltage);
        setMaxVoltPos(data.maxVoltagePosition);
        setMinVoltPos(data.minVoltagePosition);
        setEcoMode(data.ecoMode ? "Enabled" : "Disabled");
        setSafeLimit(data.safeChargingLimit);
        setLifespan(data.lifespan);

        // Update graph data (limit to 10 latest points)
        setGraphData(prevData => [
          ...prevData.slice(-10),
          { time: new Date().toLocaleTimeString(), SOC: data.soc, Temp: data.temperature }
        ]);

        setError(""); // Clear error if successful
      } catch (err) {
        console.error("Error fetching battery data:", err);
        setError("Failed to load battery data. Please try again later.");
      }
    };

    fetchBatteryData(); // Initial fetch on page load

    const interval = setInterval(fetchBatteryData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  // Navigate to BatteryMonitor page when notification icon is clicked
  const handleNotificationClick = () => {
    navigate("/functions/BatteryMonitor");  // Navigate to the BatteryMonitor page
  };

  return (
    <div className="rtbDashboard">
      {/* Sidebar */}
      <aside className="rtbSidebar">
        <h2 className="navbar1-logo"></h2>
        <h3 className="rtbSidebarTitle">Current</h3>
        <ReactSpeedometer
          maxValue={10}
          value={current || 0}
          needleColor="white"
          startColor="green"
          endColor="red"
          textColor="white"
          width={150}
          height={100}
          currentValueText={`${current || 0} A`}
        />
        <div className="bate1"> 
          <h3>Battery SOC</h3>
          <div className={`rtbSidebarBox ${batterySOC < 20 ? "rtbBgRed" : "rtbBgGreen"}`}>
            {batterySOC.toFixed(1)}%
          </div>
        </div>
      </aside>

      {/* Main Section */}
      <div className="rtbMain">
        <nav className="rtbNavbar">
          <FaBars className="rtbIcon" />
          <ul className="rtbNavLinks">
                   <li><Link to="/functions/RtbatteryMonitoring"><FaChartLine /> Status</Link></li>
                              <li><Link to="/functions/BatteryCharge"><FaBatteryFull /> Battery Health</Link></li>
                              <li><Link to="/functions/HistoricalDataLogs"><FaHistory /> Historical Data</Link></li>
                              <li><Link to="/functions/ParameterSetting"><FaSlidersH /> Parameter Setting</Link></li>
                              <li><Link to="/functions/ActiveEquilibrium"><FaTools /> ActiveEquilibrium</Link></li>
                              <li><Link to="/functions/EngineeringModel"><FaTools /> Engineering Model</Link></li>
                </ul>
        </nav>

        {/* User profile & notification */}
        <nav className="rtbNavbar2">
          <ul className="rtbNavuser">
            <div className="Hicon">
              <a href="/components/UserProfile"><FaUserCircle /></a>
            </div>
            <div className="rtbNotification" onClick={handleNotificationClick}>
              <FaBell />
              {notifications > 0 && <span className="rtbNotificationBadge">{notifications}</span>}
            </div>
          </ul>
        </nav>

        {/* Battery SOC and Temperature Graph */}
        <div className="rightside2">
          <div className="graphContainer">
            <h3>Battery SOC & Temperature Monitoring</h3>
            <ResponsiveContainer width="50%" height={250}>
              <LineChart data={graphData}>
                <XAxis dataKey="time" stroke="black" />
                <YAxis stroke="black" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="SOC" stroke="green" strokeWidth={2} />
                <Line type="monotone" dataKey="Temp" stroke="red" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Indicator */}
        <div className="leftside2">
         <center> <div className="temperatureContainer">
            <h3>Temperature</h3>
            <ReactSpeedometer
              maxValue={100}
              value={temperature}
              needleColor="green"
              startColor="blue"
              endColor="red"
              textColor="black"
              width={250}
              height={150}
            />
            <div className={`temperatureBox ${temperature > 70 ? "rtbBgRed" : "rtbBgGreen"}`}>
        <center> Temperture    {temperature.toFixed(1)}°C</center>
            </div>
          </div></center>
        </div>

        {/* Battery Details */}
        <div className="bbatery">
          {error && <div className="errorMessage">{error}</div>} {/* Display error if any */}
          <div className="maindata2">
            <h4>State of charge: {batterySOC.toFixed(1)}%</h4>
            <h4>Charge/discharge cycles: {cycles}</h4>
          </div>

          <div className="maindata21">
            <h4>Safe charging limit (%): {safeLimit}%</h4>
            <h4>Energy saving mode: {ecoMode}</h4>
          </div>

          <div className="maindata22">
            <h4>Voltage: {voltage}V</h4>
            <h4>Current: {current}A</h4>
          </div>

          <div className="maindata23">
            <h4>Max volt: {maxVolt}V</h4>
            <h4>Max volt POS: {maxVoltPos}</h4>
            <h4>Min volt POS: {minVoltPos}</h4>
          </div>

          <div className="maindata24">
            <h4>Cycles: {cycles}</h4>
            <h4>RemainCap: {remainCap}%</h4>
          </div>

          <div className="maindata25">
            <h3>Performance: {performance}</h3>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BatteryCharge;
