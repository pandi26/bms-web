import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaBell, FaBatteryFull, FaChartLine, FaHistory, FaSlidersH, FaTools } from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import mqtt from "mqtt";
import Footer from "../navbar/Footer";
import "../functions/styles/ParameterSetting.css";
import "../functions/styles/Stylee.css";

function ParameterSetting() {
  const [batterySOC] = useState(76);
  const [batteryCurrent] = useState(1.53);
  const [notifications] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clientRef, setClientRef] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // State objects for parameter groups
  const [underVoltageInputs, setUnderVoltageInputs] = useState({
    alarmValue: "",
    protectValue1: "",
    protectDelay1: "",
    protectValue2: "",
    protectDelay2: "",
    protectRecovery2: "",
    protectRecoveryDelay2: "",
  });

  const [overVoltageInputs, setOverVoltageInputs] = useState({
    ovAlarmValue: "",
    ovProtectValue1: "",
    ovProtectDelay1: "",
    ovProtectValue2: "",
    ovProtectDelay2: "",
    ovProtectRecovery2: "",
    ovProtectRecoveryDelay2: "",
  });

  const [chargingHighTempInputs, setChargingHighTempInputs] = useState({
    highTempAlarm: "",
    highTempProtectValue1: "",
    highTempProtectDelay1: "",
    highTempProtectValue2: "",
    highTempProtectDelay2: "",
    highTempProtectRecovery2: "",
    highTempProtectRecoveryDelay2: "",
  });

  const [chargingLowTempInputs, setChargingLowTempInputs] = useState({
    lowTempAlarm: "",
    lowTempProtectValue1: "",
    lowTempProtectDelay1: "",
    lowTempProtectValue2: "",
    lowTempProtectDelay2: "",
    lowTempProtectRecovery2: "",
    lowTempProtectRecoveryDelay2: "",
  });

  const [dischargingHighTempInputs, setDischargingHighTempInputs] = useState({
    highTempAlarm: "",
    highTempProtectValue1: "",
    highTempProtectDelay1: "",
    highTempProtectValue2: "",
    highTempProtectDelay2: "",
    highTempProtectRecovery2: "",
    highTempProtectRecoveryDelay2: "",
  });

  const [dischargingLowTempInputs, setDischargingLowTempInputs] = useState({
    lowTempAlarm: "",
    lowTempProtectValue1: "",
    lowTempProtectDelay1: "",
    lowTempProtectValue2: "",
    lowTempProtectDelay2: "",
    lowTempProtectRecovery2: "",
    lowTempProtectRecoveryDelay2: "",
  });

  const [chargingOverCurrentInputs, setChargingOverCurrentInputs] = useState({
    chargeCurrentAlarm: "",
    chargeCurrentProtectValue1: "",
    chargeCurrentProtectDelay1: "",
    chargeCurrentProtectValue2: "",
    chargeCurrentProtectDelay2: "",
    chargeCurrentProtectRecovery2: "",
    chargeCurrentProtectRecoveryDelay2: "",
  });

  const [dischargingOverCurrentInputs, setDischargingOverCurrentInputs] = useState({
    dischargeCurrentAlarm: "",
    dischargeCurrentProtectValue1: "",
    dischargeCurrentProtectDelay1: "",
    dischargeCurrentProtectValue2: "",
    dischargeCurrentProtectDelay2: "",
    dischargeCurrentProtectRecovery2: "",
    dischargeCurrentProtectRecoveryDelay2: "",
  });

  const [underVoltageConverted, setUnderVoltageConverted] = useState({ ...underVoltageInputs });
  const [overVoltageConverted, setOverVoltageConverted] = useState({ ...overVoltageInputs });
  const [chargingHighTempConverted, setChargingHighTempConverted] = useState({ ...chargingHighTempInputs });
  const [chargingLowTempConverted, setChargingLowTempConverted] = useState({ ...chargingLowTempInputs });
  const [dischargingHighTempConverted, setDischargingHighTempConverted] = useState({ ...dischargingHighTempInputs });
  const [dischargingLowTempConverted, setDischargingLowTempConverted] = useState({ ...dischargingLowTempInputs });
  const [chargingOverCurrentConverted, setChargingOverCurrentConverted] = useState({ ...chargingOverCurrentInputs });
  const [dischargingOverCurrentConverted, setDischargingOverCurrentConverted] = useState({ ...dischargingOverCurrentInputs });

  const navigate = useNavigate();

  // MQTT Setup
  useEffect(() => {
    const options = {
      protocol: 'wss',
      host: '17df3ae464af44dabae01a271cfe6598.s1.eu.hivemq.cloud',
      port: 8884,
      path: '/mqtt',
      username: 'Harshini_',
      password: 'Harshini@21ee',
      rejectUnauthorized: false,
    };

    const client = mqtt.connect(options);
    setClientRef(client);

    client.on('connect', () => {

      console.log("HiveMQ")
      console.log('Connected to HiveMQ MQTT Broker');
      setIsConnected(true);
    });

    client.on('error', (err) => {
      console.error('MQTT error:', err);
      setIsConnected(false);
    });

    return () => {
      if (client.connected) {
        client.end(true, () => {
          console.log('Disconnected on unmount without data!..');
        });
      }
    };
  }, []);

  // Generic input change handler
  const handleInputChange = (e, setInputsState) => {
    const { name, value } = e.target;
    setInputsState((prev) => ({ ...prev, [name]: value }));
  };

  // Generic function to handle setting individual parameters
  const handleSet = async (parameterName, inputsState, setConvertedState, parameterGroup) => {
    const value = parseFloat(inputsState[parameterName]);

    if (isNaN(value)) {
      alert(`Please enter a valid number for ${parameterName}`);
      return;
    }

    const ranges = {
      underVoltage: { min: 2, max: 3500, unit: "mV" },
      overVoltage: { min: 3, max: 4500, unit: "mV" },
      chargingHighTemp: { min: 4, max: 80, unit: "°C" },
      chargingLowTemp: { min: -20, max: 10, unit: "°C" },
      dischargingHighTemp: { min: 4, max: 80, unit: "°C" },
      dischargingLowTemp: { min: -2, max: 10, unit: "°C" },
      chargingOverCurrent: { min: 0, max: 100, unit: "A" },
      dischargingOverCurrent: { min: 0, max: 100, unit: "A" },
      delay: { min: 0, max: 10000, unit: "ms" },
    };

    const isDelay = parameterName.includes("Delay");
    const range = ranges[isDelay ? "delay" : parameterGroup];

    if (value < range.min || value > range.max) {
      alert(`Please enter a value between ${range.min} and ${range.max} ${range.unit} for ${parameterName}`);
      return;
    }

    const convertedValue = parameterGroup === "underVoltage" || parameterGroup === "overVoltage" ? value / 1000 : value;

    setConvertedState((prev) => ({
      ...prev,
      [parameterName]: convertedValue,
    }));

    const userEmail = sessionStorage.getItem("email");

    if (!userEmail) {
      alert("User email is missing. Please log in again.");
      return;
    }

    const requestData = {
      email: userEmail,
      parameterGroup,
      [parameterName]: value,
    };

    // Send via MQTT
    if (clientRef && clientRef.connected) {
      const mqttMessage = JSON.stringify({
        parameterGroup,
        [parameterName]: value,
      });
      clientRef.publish("esp32/control", mqttMessage, {}, (err) => {
        if (err) {
          console.error(`Failed to publish ${parameterName} to MQTT`, err);
        } else {
          console.log(`${parameterName} published to MQTT: ${mqttMessage}`);
        }
      });
    } else {
      console.error("MQTT client not connected");
    }

    // Existing HTTP API call
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/battery/parameter`,
        requestData
      );
      console.log(`${parameterName} set successfully:`, response.data);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000);
    } catch (error) {
      console.error(`Error setting ${parameterName}:`, error);
      alert(`Error setting ${parameterName}. Please check the input.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Generic set all function
  const handleSetAll = async (inputsState, parameterGroup, setConvertedState) => {
    const newConvertedValues = {};
    const requestData = {};
    const userEmail = sessionStorage.getItem("email");

    if (!userEmail) {
      alert("User email is missing. Please log in again.");
      return;
    }

    const ranges = {
      underVoltage: { min: 2, max: 3500, unit: "mV" },
      overVoltage: { min: 3, max: 4500, unit: "mV" },
      chargingHighTemp: { min: 40, max: 80, unit: "°C" },
      chargingLowTemp: { min: -2, max: 10, unit: "°C" },
      dischargingHighTemp: { min: 4, max: 80, unit: "°C" },
      dischargingLowTemp: { min: -2, max: 10, unit: "°C" },
      chargingOverCurrent: { min: 0, max: 100, unit: "A" },
      dischargingOverCurrent: { min: 0, max: 100, unit: "A" },
      delay: { min: 0, max: 10000, unit: "ms" },
    };

    for (const key in inputsState) {
      const value = parseFloat(inputsState[key]);
      if (isNaN(value)) {
        newConvertedValues[key] = "-";
        continue;
      }

      const isDelay = key.includes("Delay");
      const range = ranges[isDelay ? "delay" : parameterGroup];
      if (value < range.min || value > range.max) {
        alert(
          `Invalid value for ${key}. Must be between ${range.min} and ${range.max} ${range.unit}`
        );
        return;
      }

      newConvertedValues[key] =
        parameterGroup === "underVoltage" || parameterGroup === "overVoltage" ? value / 1000 : value;
      requestData[key] = value;
    }

    requestData.email = userEmail;
    requestData.parameterGroup = parameterGroup;

    setConvertedState(newConvertedValues);

    // Send via MQTT
    if (clientRef && clientRef.connected) {
      const mqttMessage = JSON.stringify({
        parameterGroup,
        ...requestData,
      });
      clientRef.publish("esp32/control", mqttMessage, {}, (err) => {
        if (err) {
          console.error(`Failed to publish parameters to MQTT`, err);
        } else {
          console.log(`Parameters published to MQTT: ${mqttMessage}`);
        }
      });
    } else {
      console.error("MQTT client not connected");
    }

    // Existing HTTP API call
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/battery/parameter`,
        requestData
      );
      console.log("Parameters set successfully:", response.data);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000);
    } catch (error) {
      console.error("Error setting parameters:", error);
      alert("Error setting parameters. Please check the inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = () => {
    navigate("/functions/BatteryMonitor");
  };

  // Component to render parameter section
  const ParameterSection = ({ title, inputs, setInputs, converted, parameterGroup, setConverted }) => (
    <div className="parameterSectionContainer">
      <h2>{title}</h2>
      {Object.keys(inputs).map((key) => (
        <div key={key} className="parameterField">
          <label>{key.replace(/([A-Z])/g, ' $1').trim()}</label>
          <input
            type="number"
            name={key}
            value={inputs[key]}
            onChange={(e) => handleInputChange(e, setInputs)}
            disabled={isLoading}
          />
          <button
            className="buttonSet"
            onClick={() => handleSet(key, inputs, setConverted, parameterGroup)}
            disabled={isLoading}
          >
            Set
          </button>
          <span className="convertedValue">
            {converted[key] !== "-" && converted[key] !== "" ? `(${converted[key]}${parameterGroup.includes("Voltage") ? "V" : parameterGroup.includes("Current") ? "A" : "°C"})` : ""}
          </span>
        </div>
      ))}
      <button
        className="buttonSetAll"
        onClick={() => handleSetAll(inputs, parameterGroup, setConverted)}
        disabled={isLoading}
      >
        Set All
      </button>
    </div>
  );

  return (
    <div className="rtbDashboard">
      <aside className="rtbSidebar">
        <h2 className="navbar1-logo"></h2>
        <h3 className="rtbSidebarTitle">Current</h3>
        <ReactSpeedometer
          maxValue={10}
          value={batteryCurrent}
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
        <div className="connection-status">
          MQTT Status: {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </aside>

      <div className="rtbMain">
        <nav className="rtbNavbar">
          <FaBars className="rtbIcon" onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="menuCard">
              <ul>
                <li><button>Board</button></li>
                <li><button onClick={() => alert("Comm setup coming soon.")}>Comm</button></li>
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

        <nav className="rtbNavbar2">
          <ul className="rtbNavuser">
            <div className="Hicon">
              <a href="/components/UserProfile"><FaUserCircle /></a>
            </div>
            <li></li>
            <div className="rtbNotification" onClick={handleNotificationClick}>
              <FaBell />
              {notifications > 0 && <span className="rtbNotificationBadge">{notifications}</span>}
            </div>
          </ul>
        </nav>

        {showSuccessPopup && (
          <div className="successPopup">
            Parameters set successfully!
          </div>
        )}

        <div className="parametersGrid">
          <ParameterSection
            title="Cell Under Voltage Protection"
            inputs={underVoltageInputs}
            setInputs={setUnderVoltageInputs}
            converted={underVoltageConverted}
            parameterGroup="underVoltage"
            setConverted={setUnderVoltageConverted}
          />
          <ParameterSection
            title="Cell Over Voltage Protection"
            inputs={overVoltageInputs}
            setInputs={setOverVoltageInputs}
            converted={overVoltageConverted}
            parameterGroup="overVoltage"
            setConverted={setOverVoltageConverted}
          />
          <ParameterSection
            title="Charging High Temperature Protection"
            inputs={chargingHighTempInputs}
            setInputs={setChargingHighTempInputs}
            converted={chargingHighTempConverted}
            parameterGroup="chargingHighTemp"
            setConverted={setChargingHighTempConverted}
          />
          <ParameterSection
            title="Charging Low Temperature Protection"
            inputs={chargingLowTempInputs}
            setInputs={setChargingLowTempInputs}
            converted={chargingLowTempConverted}
            parameterGroup="chargingLowTemp"
            setConverted={setChargingLowTempConverted}
          />
          <ParameterSection
            title="Discharging High Temperature Protection"
            inputs={dischargingHighTempInputs}
            setInputs={setDischargingHighTempInputs}
            converted={dischargingHighTempConverted}
            parameterGroup="dischargingHighTemp"
            setConverted={setDischargingHighTempConverted}
          />
          <ParameterSection
            title="Discharging Low Temperature Protection"
            inputs={dischargingLowTempInputs}
            setInputs={setDischargingLowTempInputs}
            converted={dischargingLowTempConverted}
            parameterGroup="dischargingLowTemp"
            setConverted={setDischargingLowTempConverted}
          />
          <ParameterSection
            title="Charging Over Current Protection"
            inputs={chargingOverCurrentInputs}
            setInputs={setChargingOverCurrentInputs}
            converted={chargingOverCurrentConverted}
            parameterGroup="chargingOverCurrent"
            setConverted={setChargingOverCurrentConverted}
          />
          <ParameterSection
            title="Discharging Over Current Protection"
            inputs={dischargingOverCurrentInputs}
            setInputs={setDischargingOverCurrentInputs}
            converted={dischargingOverCurrentConverted}
            parameterGroup="dischargingOverCurrent"
            setConverted={setDischargingOverCurrentConverted}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default ParameterSetting;