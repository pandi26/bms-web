import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Footer from "../navbar/Footer";
import {
  FaBars,
  FaUserCircle,
  FaBatteryFull,
  FaChartLine,
  FaHistory,
  FaSlidersH,
  FaTools,
  FaBell,
  FaFilter,
  FaTable,
  FaChartBar,
} from "react-icons/fa";
import ReactSpeedometer from "react-d3-speedometer";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import "../functions/styles/HistoricalDataLogs.css";

function HistoricalDataLogs() {
  const [batterySOC, setBatterySOC] = useState(100);
  const [current, setCurrent] = useState(0);
  const [notifications] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [filterEnabled, setFilterEnabled] = useState(false);
  const [lowVoltage, setLowVoltage] = useState("");
  const [highVoltage, setHighVoltage] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loggedInUserId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchBatteryHealth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/battery-health");
        const { soc, current } = response.data;
        setBatterySOC(soc || 100);
        setCurrent(parseFloat(current) || 0);
      } catch (error) {
        console.error("Error fetching battery health data:", error);
        console.log("Failed to fetch battery health data. Using default values.");
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bmsdata/data");
        const rawData = response.data;

        if (!Array.isArray(rawData)) {
          console.error("Unexpected API response format:", rawData);
          return;
        }

        setHistoricalData(rawData);
      } catch (error) {
        console.error("Error fetching historical BMS data:", error);
      }
    };

    fetchBatteryHealth();
    fetchHistoricalData();
    const intervalId = setInterval(() => {
      fetchBatteryHealth();
      fetchHistoricalData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [loggedInUserId]);

  // Memoize processed data
  const processedData = useMemo(() => {
    const power = 18;
    return historicalData
      .filter((entry) => entry.user_id?.toString() === loggedInUserId)
      .map((entry) => {
        const voltage = parseFloat(entry.voltage) || 0;
        const cell1 = parseFloat(entry.cell1) || 0;
        const cell2 = parseFloat(entry.cell2) || 0;
        const cell3 = parseFloat(entry.cell3) || 0;
        const current = voltage > 0 ? (power / voltage).toFixed(2) : "0.00";
        const temperature = parseFloat(entry.temperature) || 0;
        const soc = parseInt(entry.soc) || 0;

        const timestamp = entry.timestamp
          ? new Date(entry.timestamp).toLocaleString(navigator.language, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })
          : "N/A";

        return {
          id: entry.id,
          timestamp,
          user_id: entry.user_id || "N/A",
          cell1: cell1.toFixed(2),
          cell2: cell2.toFixed(2),
          cell3: cell3.toFixed(2),
          voltage: voltage.toFixed(2),
          current,
          temperature: temperature.toFixed(2),
          soc,
          event: entry.event || "N/A",
          status: entry.status || "N/A",
        };
      });
  }, [historicalData, loggedInUserId]);

  // Memoize filtered data
  const filteredDataMemo = useMemo(() => {
    let filtered = [...processedData];

    if (filterEnabled) {
      if (lowVoltage) {
        const lowV = parseFloat(lowVoltage);
        filtered = filtered.filter(
          (entry) =>
            parseFloat(entry.cell1) >= lowV ||
            parseFloat(entry.cell2) >= lowV ||
            parseFloat(entry.cell3) >= lowV
        );
      }

      if (highVoltage) {
        const highV = parseFloat(highVoltage);
        filtered = filtered.filter(
          (entry) =>
            parseFloat(entry.cell1) <= highV &&
            parseFloat(entry.cell2) <= highV &&
            parseFloat(entry.cell3) <= highV
        );
      }

      if (startDate) {
        filtered = filtered.filter(
          (entry) => new Date(entry.timestamp) >= new Date(startDate)
        );
      }
      if (endDate) {
        filtered = filtered.filter(
          (entry) => new Date(entry.timestamp) <= new Date(endDate)
        );
      }

      filtered = filtered.filter((entry) =>
        ["UNDER VOLTAGE", "OVER VOLTAGE"].includes(entry.status?.toUpperCase())
      );
    }

    if (minTemp) {
      const minT = parseFloat(minTemp);
      filtered = filtered.filter((entry) => parseFloat(entry.temperature) >= minT);
    }
    if (maxTemp) {
      const maxT = parseFloat(maxTemp);
      filtered = filtered.filter((entry) => parseFloat(entry.temperature) <= maxT);
    }

    return filtered;
  }, [processedData, filterEnabled, lowVoltage, highVoltage, startDate, endDate, minTemp, maxTemp]);

  useEffect(() => {
    setFilteredData(filteredDataMemo);
  }, [filteredDataMemo]);

  // Memoize latest 20 data for chart
  const latest20Data = useMemo(() => filteredDataMemo.slice(-20), [filteredDataMemo]);

  const exportToCSV = () => {
    const csvRows = [
      [
        "Timestamp",
        "User ID",
        "Cell1 (V)",
        "Cell2 (V)",
        "Cell3 (V)",
        "Battery Voltage (V)",
        "Current (A)",
        "Temperature (C)",
        "SOC",
        "Event",
        "Status",
      ],
      ...filteredDataMemo.map((row) => [
        row.timestamp,
        row.user_id,
        row.cell1,
        row.cell2,
        row.cell3,
        row.voltage,
        row.current,
        row.temperature,
        row.soc,
        row.event,
        row.status,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "HistoricalData.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Historical Data Logs", 20, 10);
    const tableData = filteredDataMemo.map((row) => [
      row.timestamp,
      row.user_id,
      row.cell1,
      row.cell2,
      row.cell3,
      row.voltage,
      row.current,
      row.current,
      row.temperature,
      row.soc,
      row.event,
      row.status,
    ]);

    doc.autoTable({
      head: [
        [
          "Timestamp",
          "User ID",
          "Cell1 (V)",
          "Cell2 (V)",
          "Cell3 (V)",
          "Battery Voltage (V)",
          "Current (A)",
          "Temperature (C)",
          "SOC",
          "Event",
          "Status",
        ],
      ],
      body: tableData,
      startY: 20,
    });

    doc.save("HistoricalData.pdf");
  };

  const handleNotificationClick = () => {
    // Placeholder for notifications
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "table" ? "graph" : "table"));
  };

  const toggleFilters = () => {
    setFilterEnabled((prev) => !prev);
    if (filterEnabled) {
      setLowVoltage("");
      setHighVoltage("");
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <div className="rtbDashboard">
      <aside className="rtbSidebar">
        <h2 className="navbar1-logo"></h2>
        <h3 className="rtbSidebarTitle">Current</h3>
        <ReactSpeedometer
          maxValue={10}
          value={current}
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
                <li>
                  <button>Board</button>
                </li>
                <li>
                  <button onClick={() => window.location.reload()}>Refresh</button>
                </li>
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
              <Link to="/components/UserProfile">
                <FaUserCircle />
              </Link>
            </div>
            <div className="rtbNotification" onClick={handleNotificationClick}>
              <FaBell />
              {notifications > 0 && (
                <span className="rtbNotificationBadge">{notifications}</span>
              )}
            </div>
          </ul>
        </nav>

        <div className="filterToggle" style={{ marginBottom: "10px" }}>
          <button
            onClick={toggleFilters}
            className="toggleButton"
            title={filterEnabled ? "Disable Filters" : "Enable Filters"}
          >
            <FaFilter /> {filterEnabled ? "Disable Filters" : "Enable Filters"}
          </button>
        </div>

        {filterEnabled && (
          <div className="filterContainer" style={{ marginBottom: "20px" }}>
            <h3>Filters</h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <div>
                <label>Start Date: </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: "150px" }}
                />
              </div>
              <div>
                <label>End Date: </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: "150px" }}
                />
              </div>
              <div>
                <label>Min Cell Voltage (V): </label>
                <input
                  type="number"
                  step="0.01"
                  value={lowVoltage}
                  onChange={(e) => setLowVoltage(e.target.value)}
                  placeholder="e.g., 3.0"
                  style={{ width: "100px" }}
                />
              </div>
              <div>
                <label>Max Cell Voltage (V): </label>
                <input
                  type="number"
                  step="0.01"
                  value={highVoltage}
                  onChange={(e) => setHighVoltage(e.target.value)}
                  placeholder="e.g., 4.2"
                  style={{ width: "100px" }}
                />
              </div>
              <div>
                <label>Min Temperature (C): </label>
                <input
                  type="number"
                  step="0.1"
                  value={minTemp}
                  onChange={(e) => setMinTemp(e.target.value)}
                  placeholder="e.g., 20"
                  style={{ width: "100px" }}
                />
              </div>
              <div>
                <label>Max Temperature (C): </label>
                <input
                  type="number"
                  step="0.1"
                  value={maxTemp}
                  onChange={(e) => setMaxTemp(e.target.value)}
                  placeholder="e.g., 40"
                  style={{ width: "100px" }}
                />
              </div>
              <button
                onClick={() => {
                  setLowVoltage("");
                  setHighVoltage("");
                  setStartDate("");
                  setEndDate("");
                  setMinTemp("");
                  setMaxTemp("");
                }}
                className="exportButton"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className="toggleViewMode" style={{ marginBottom: "10px" }}>
          <button
            onClick={toggleViewMode}
            className="toggleButton"
            title={viewMode === "table" ? "Switch to Graph" : "Switch to Table"}
          >
            {viewMode === "table" ? <FaChartBar /> : <FaTable />}
            {viewMode === "table" ? " Switch to Graph" : " Switch to Table"}
          </button>
        </div>

        {viewMode === "table" ? (
          <div className="HdataTable">
            <h3>Historical Data Logs</h3>
            <table>
              <thead>
                <tr>
                  <th>NO</th>
                  <th>Timestamp</th>
                  <th>Cell1 (V)</th>
                  <th>Cell2 (V)</th>
                  <th>Cell3 (V)</th>
                  <th>Battery Voltage (V)</th>
                  <th>Current (A)</th>
                  <th>Temperature (C)</th>
                  <th>SOC</th>
                  <th>Event</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataMemo.length === 0 ? (
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center" }}>
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredDataMemo.map((entry, idx) => {
                    const status = entry.status?.toUpperCase();
                    const rowClass =
                      status === "NOMINAL"
                        ? "status-nominal"
                        : ["UNDER VOLTAGE", "OVER VOLTAGE"].includes(status)
                        ? "status-alert"
                        : "";

                    return (
                      <tr key={idx} className={rowClass}>
                        <td>{entry.id}</td>
                        <td>{entry.timestamp}</td>
                        <td>{entry.cell1}</td>
                        <td>{entry.cell2}</td>
                        <td>{entry.cell3}</td>
                        <td>{entry.voltage}</td>
                        <td>{entry.current}</td>
                        <td>{entry.temperature}</td>
                        <td>{entry.soc}</td>
                        <td>{entry.event}</td>
                        <td>{entry.status}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="HchartContainer">
            <h3>Battery Voltage & Current - Last 20 Records</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={latest20Data}>
                <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="voltage" fill="#8884d8" name="Voltage (V)" />
                <Bar dataKey="current" fill="#82ca9d" name="Current (A)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="fileconvert">
          <button onClick={exportToCSV} className="exportButton">
            Export to CSV
          </button>
          <button onClick={exportToPDF} className="exportButton">
            Export to PDF
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HistoricalDataLogs;