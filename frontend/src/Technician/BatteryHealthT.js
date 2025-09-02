
import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TechnicianNavbar from "./TechnicianNavbar";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
import "./styles/BatteryHealth.css";

function BatteryHealthT() {
  const [userId, setUserId] = useState("");
  const [historicalData, setHistoricalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    status: "All",
    startDate: "",
    endDate: "",
    minTemp: "",
    maxTemp: "",
    event: "All",
  });

  const handleFetchData = async () => {
    if (!userId) return;

    try {
      const response = await axios.get("http://localhost:5000/api/bmsdata/data2", {
        params: { userId },
      });

      const rawData = response.data;
      const power = 18;
      console.log(rawData);
      const processedData = rawData.map((entry) => {
        const voltage = parseFloat(entry.voltage) || 0;
        const cell1 = parseFloat(entry.cell1) || 0;
        const cell2 = parseFloat(entry.cell2) || 0;
        const cell3 = parseFloat(entry.cell3) || 0;
        const current = voltage > 0 ? (power / voltage).toFixed(2) : "0.00";
        const temperature = parseFloat(entry.temperature) || 0;

        return {
          id: entry.id,
          timestamp: entry.timestamp || "N/A",
          cell1: cell1.toFixed(2),
          cell2: cell2.toFixed(2),
          cell3: cell3.toFixed(2),
          voltage: voltage.toFixed(2),
          current,
          temperature: temperature.toFixed(1),
          event: entry.event || "N/A",
          status: entry.status || "N/A",
        };
      });

      setHistoricalData(processedData);
      applyFilters(processedData, filters);
    } catch (error) {
      console.error("Error fetching user-specific BMS data:", error);
      setHistoricalData([]);
      setFilteredData([]);
    }
  };

  const applyFilters = (data, currentFilters) => {
    let filtered = [...data];

    if (currentFilters.status !== "All") {
      filtered = filtered.filter((entry) => entry.status === currentFilters.status);
    }

    if (currentFilters.startDate) {
      const start = new Date(currentFilters.startDate);
      filtered = filtered.filter(
        (entry) => new Date(entry.timestamp) >= start
      );
    }
    if (currentFilters.endDate) {
      const end = new Date(currentFilters.endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (entry) => new Date(entry.timestamp) <= end
      );
    }

    if (currentFilters.minTemp !== "") {
      const minTemp = parseFloat(currentFilters.minTemp);
      filtered = filtered.filter(
        (entry) => parseFloat(entry.temperature) >= minTemp
      );
    }
    if (currentFilters.maxTemp !== "") {
      const maxTemp = parseFloat(currentFilters.maxTemp);
      filtered = filtered.filter(
        (entry) => parseFloat(entry.temperature) <= maxTemp
      );
    }

    if (currentFilters.event !== "All") {
      filtered = filtered.filter((entry) => entry.event === currentFilters.event);
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(historicalData, newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      status: "All",
      startDate: "",
      endDate: "",
      minTemp: "",
      maxTemp: "",
      event: "All",
    };
    setFilters(resetFilters);
    applyFilters(historicalData, resetFilters);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Battery Health Data for User ID ${userId}`, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Timestamp", "Cell1 (V)", "Cell2 (V)", "Cell3 (V)",
          "Voltage (V)", "Current (A)", "Temperature (°C)",
          "Event", "Status"
        ]
      ],
      body: filteredData.map(entry => [
        entry.timestamp, entry.cell1, entry.cell2, entry.cell3,
        entry.voltage, entry.current, entry.temperature,
        entry.event, entry.status
      ]),
    });
    doc.save(`user_${userId}_filtered.pdf`);
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Timestamp", "Cell1 (V)", "Cell2 (V)", "Cell3 (V)",
      "Voltage (V)", "Current (A)", "Temperature (°C)",
      "Event", "Status"
    ];
    const rows = filteredData.map(entry => [
      entry.timestamp, entry.cell1, entry.cell2, entry.cell3,
      entry.voltage, entry.current, entry.temperature,
      entry.event, entry.status
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `user_${userId}_filtered.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueEvents = ["All", ...new Set(historicalData.map(entry => entry.event).filter(event => event !== "N/A"))];

  return (
    <div className="coveri">
      <TechnicianNavbar />
      <div className="battery-health-container">
        <h2>Battery Health - User Specific Data</h2>
        <div className="fetch-data-section">
          <input
            type="text"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="user-id-input"
          />
          <button onClick={handleFetchData} className="fetch-button">
            Fetch Data
          </button>
        </div>

        {historicalData.length > 0 && (
          <div className="data-section">
            <div className="filter-section">
              <div className="filter-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  <option value="All">All</option>
                  <option value="Under Voltage">Under Voltage</option>
                  <option value="Over Voltage">Over Voltage</option>
                  <option value="NOMINAL">Nominal</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>Min Temp (°C):</label>
                <input
                  type="number"
                  name="minTemp"
                  value={filters.minTemp}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="filter-input temp-input"
                />
              </div>
              <div className="filter-group">
                <label>Max Temp (°C):</label>
                <input
                  type="number"
                  name="maxTemp"
                  value={filters.maxTemp}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="filter-input temp-input"
                />
              </div>
              <div className="filter-group">
                <label>Event:</label>
                <select
                  name="event"
                  value={filters.event}
                  onChange={handleFilterChange}
                  className="filter-input"
                >
                  {uniqueEvents.map((event) => (
                    <option key={event} value={event}>{event}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleResetFilters}
                className="reset-button"
              >
                Reset Filters
              </button>
            </div>
<div className="download-buttons">
                <button onClick={handleDownloadPDF} className="download-button download-pdf">
                  <FaFilePdf /> PDF
                </button>
                <button onClick={handleDownloadCSV} className="download-button download-csv">
                  <FaFileCsv /> CSV
                </button>
              </div>
            <div className="table-container">
              
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Cell1 (V)</th>
                    <th>Cell2 (V)</th>
                    <th>Cell3 (V)</th>
                    <th>Voltage (V)</th>
                    <th>Current (A)</th>
                    <th>Temperature (°C)</th>
                    <th>Event</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.timestamp}</td>
                        <td>{entry.cell1}</td>
                        <td>{entry.cell2}</td>
                        <td>{entry.cell3}</td>
                        <td>{entry.voltage}</td>
                        <td>{entry.current}</td>
                        <td>{entry.temperature}</td>
                        <td>{entry.event}</td>
                        <td>{entry.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BatteryHealthT;