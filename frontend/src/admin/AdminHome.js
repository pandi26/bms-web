import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminHome() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    userCount: 0,
    technicianCount: 0,
    warrantyCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    navigate("/adminlogin");
  };

  // 🧭 Click handlers
  const goToUsers = () => navigate("/UserManagement");
  const goToTechnicians = () => navigate("/TechnicianManagement");
  const goToWarranties = () => navigate("/adminWarranty");

  return (
    <div className="admin-home-container">
      <video autoPlay loop muted className="background-video">
        <source src="/assets/battery.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <nav className="admin-navbar">
        <div className="navbar-title">🔋 Admin Dashboard</div>
        <div className="navbar-links">
          <a href="/adminHome">Home</a>
          <a href="/UserManagement">Dashboard</a>
          <a href="/adminWarranty">Warranty</a>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-content">
        <h2>Welcome to the Admin Dashboard</h2>
        <p>Manage all aspects of the Battery Management System here.</p>

        <div className="stats-cards">
          <div className="card" onClick={goToUsers} style={{ cursor: "pointer" }}>
            <h3>👤 Total Users</h3>
            <p>{stats.userCount}</p>
          </div>
          <div className="card" onClick={goToTechnicians} style={{ cursor: "pointer" }}>
            <h3>🛠️ Technicians</h3>
            <p>{stats.technicianCount}</p>
          </div>
          <div className="card" onClick={goToWarranties} style={{ cursor: "pointer" }}>
            <h3>📄 Warranties</h3>
            <p>{stats.warrantyCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
