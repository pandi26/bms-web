// src/components/ParameterSet.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../functions/styles/Stylee.css";
import "./styles/paraset.css";
import TechnicianNavbar from "./TechnicianNavbar";

function ParameterSet() {
  const [batterySOC, setBatterySOC] = useState(100);
  const [userEmail, setUserEmail] = useState("");
  const [batteryId, setBatteryId] = useState("");
  const [message, setMessage] = useState("");
  const [toggleDisplay, setToggleDisplay] = useState("");

  const [inputs, setInputs] = useState({
    alarmValue: "",
    protectionValue: "",
    recoveryValue: "",
    delayValue: "",
    ovAlarmValue: "",
    ovDelayValue: "",
    lowTempAlarm: "",
    lowTempDelay: "",
    highTempAlarm: "",
    highTempDelay: ""
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBatterySOC((prev) => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 5)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSetAll = async () => {
    if (!userEmail || !batteryId) {
      alert("Please enter your email and battery ID.");
      return;
    }
  
    if (!inputs.alarmValue || !inputs.delayValue) {
      alert("Please fill in the required Under Voltage parameters.");
      return;
    }
  
    const requestData = {
      userEmail,  // Send the user email to backend
      batteryId,  // Send battery ID to backend
      alarmValue: parseFloat(inputs.alarmValue), // Ensure data is sent as a number
      delayValue: parseFloat(inputs.delayValue),
      ovAlarmValue: parseFloat(inputs.ovAlarmValue),
      ovDelayValue: parseFloat(inputs.ovDelayValue),
      lowTempAlarm: parseFloat(inputs.lowTempAlarm),
      lowTempDelay: parseFloat(inputs.lowTempDelay),
      highTempAlarm: parseFloat(inputs.highTempAlarm),
      highTempDelay: parseFloat(inputs.highTempDelay)
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/battery/parameter2", requestData);
      setMessage("Parameters set successfully.");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error setting parameters:", error);
      setMessage("Error setting parameters. Please check the inputs.");
    }
  };
  
  const renderInput = (label, name, unit) => (
    <div className="inputGroup">
      <label>{label}:</label>
      <input
        type="number"
        name={name}
        value={inputs[name]}
        onChange={handleInputChange}
        placeholder={`Enter ${label}`}
      />
      <p>Converted: {inputs[name] ? `${inputs[name]} ${unit}` : "-"}</p>
    </div>
  );

  return (
    <>
      <TechnicianNavbar />

      <div className="user-info-form">
        <div className="inputGroup">
          <label>User Email:</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
              if (!batteryId && e.target.value) setToggleDisplay("email");
            }}
            placeholder="Enter your email"
          />
        </div>

        <div className="inputGroup">
          <label>Battery ID:</label>
          <input
            type="text"
            value={batteryId}
            onChange={(e) => {
              setBatteryId(e.target.value);
              if (!userEmail && e.target.value) setToggleDisplay("battery");
            }}
            placeholder="Enter battery ID"
          />
        </div>

        {(userEmail || batteryId) && (
          <div className="info-card-container">
            <div className="info-card">
              <h4>Current Selection</h4>
              <p><strong>Email:</strong> {userEmail || "Not Provided"}</p>
              <p><strong>Battery ID:</strong> {batteryId || "Not Provided"}</p>
              <button onClick={() => setToggleDisplay(prev => (prev === "email" ? "battery" : "email"))}>
                Toggle ({toggleDisplay === "email" ? "Show Battery ID" : "Show Email"})
              </button>
              <p style={{ marginTop: 8 }}>
                <strong>Showing:</strong> {toggleDisplay === "email" ? userEmail || "-" : batteryId || "-"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="parameterGroups">
        <div className="parameterSection">
          <h3>Under Voltage Parameters</h3>
          {renderInput("Alarm Value (mV)", "alarmValue", "V")}
          {renderInput("Delay Value (ms)", "delayValue", "ms")}
        </div>

        <div className="parameterSection1">
          <h3>Over Voltage Parameters</h3>
          {renderInput("OV Alarm Value (mV)", "ovAlarmValue", "V")}
          {renderInput("OV Delay Value (ms)", "ovDelayValue", "ms")}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="parameterSection1" style={{ flex: 1, marginRight: 20 }}>
            <h3>Low Temperature Parameters</h3>
            {renderInput("Low Temp Alarm (°C)", "lowTempAlarm", "°C")}
            {renderInput("Low Temp Delay (ms)", "lowTempDelay", "ms")}
          </div>

          <div className="parameterSection1" style={{ flex: 1 }}>
            <h3>High Temperature Parameters</h3>
            {renderInput("High Temp Alarm (°C)", "highTempAlarm", "°C")}
            {renderInput("High Temp Delay (ms)", "highTempDelay", "ms")}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button className="setButton" onClick={handleSetAll}>Set All Parameters</button>
          {message && <p style={{ marginTop: 10, color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default ParameterSet;
