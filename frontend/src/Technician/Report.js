import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./styles/Report.css"; // Style the report

function Report() {
  const [users, setUsers] = useState([]);
  const [warrantyRequests, setWarrantyRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const userRes = await axios.get("http://localhost:5000/api/admin/users");
        const warrantyRes = await axios.get("http://localhost:5000/api/warranty/data");

        setUsers(userRes.data);
        setWarrantyRequests(warrantyRes.data);
      } catch (err) {
        console.error("Failed to fetch report data", err);
        setError("Failed to load report data.");
      }
    };

    fetchReportData();
  }, []);

  const handleDownloadPDF = () => {
    const input = document.getElementById("report-content");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("BMS_Report.pdf");
    });
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="report-container">
      <h2>BMS System Report</h2>
      <button onClick={handleDownloadPDF} className="download-btn">Download PDF</button>

      <div id="report-content" className="report-content">
        <h3>Total Users: {users.length}</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Warranty Requests: {warrantyRequests.length}</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>User Email</th><th>Battery ID</th><th>Issue</th><th>Status</th><th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {warrantyRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.email}</td>
                <td>{req.battery_serial}</td>
                <td>{req.issue_description}</td>
                <td>{req.status}</td>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
