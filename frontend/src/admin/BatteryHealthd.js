import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "./Navbar"; // Import the Navbar component
import "./styles/BatteryHealth.css";

function BatteryHealthd() {
  const [email, setEmail] = useState(""); 
  const [historicalData, setHistoricalData] = useState([]);

  const handleFetchData = async () => {
    if (!email) return;

    try {
      const response = await axios.get("http://localhost:5000/api/bmsdata/data2", {
        params: { email },  // Send email as query parameter
      });

      const rawData = response.data;
      const power = 18; // watts (adjust as needed)
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
          temperature: temperature.toFixed(2),
          event: entry.event || "N/A",
          status: entry.status || "N/A",
        };
      });

      setHistoricalData(processedData);
    } catch (error) {
      console.error("Error fetching user-specific BMS data:", error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Battery Health Data for ${email}`, 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Timestamp", "Cell1 (V)", "Cell2 (V)", "Cell3 (V)", 
          "Voltage (V)", "Current (A)", "Temperature (°C)", 
          "Event", "Status"
        ]
      ],
      body: historicalData.map(entry => [
        entry.timestamp, entry.cell1, entry.cell2, entry.cell3,
        entry.voltage, entry.current, entry.temperature,
        entry.event, entry.status
      ]),
    });
    doc.save(`${email}.pdf`);
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Timestamp", "Cell1 (V)", "Cell2 (V)", "Cell3 (V)",
      "Voltage (V)", "Current (A)", "Temperature (°C)", 
      "Event", "Status"
    ];
    const rows = historicalData.map(entry => [
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
    link.setAttribute("download", `${email}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="coveri">
      <Navbar /> {/* Add the Navbar component here */}
      <div style={{ padding: "20px" }}>
        <h2>Battery Health - User Specific Data</h2>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", width: "250px", marginRight: "10px" }}
          />
          <button onClick={handleFetchData} style={{ padding: "8px 16px" }}>
            Fetch Data
          </button>
        </div>

        {historicalData.length > 0 && (
          <>
            <div style={{ marginBottom: "10px" }}>
              <button onClick={handleDownloadPDF} style={{ padding: "8px 16px", marginRight: "10px" }}>
                Download PDF
              </button>
              <button onClick={handleDownloadCSV} style={{ padding: "8px 16px" }}>
                Download CSV
              </button>
            </div>

            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
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
                {historicalData.map((entry) => (
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
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default BatteryHealthd;
