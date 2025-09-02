import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Technician.css';

function TechnicianHome() {
  const navigate = useNavigate();
  const technicianEmail = sessionStorage.getItem('email') || 'Technician';
  sessionStorage.setItem("technicianEmail", technicianEmail);


  const [counts, setCounts] = useState({
    userCount: 0,
    warrantyCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/stats');
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    alert('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className="technician-dashboard">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Elaicle BMS Technician</div>
        <div className="navbar-right">
          <span className="technician-email">
            <i className="fas fa-user-circle user-icon"></i> {technicianEmail}
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Layout */}
      <div className="technician-layout">
        {/* Sidebar */}
        <aside className="technician-sidebar">
          <h3>Technician Control Panel</h3>
          <ul>
            <li><Link to="/Technicianhome">Dashboard</Link></li>
            <li><Link to="/userDetails">Assigned Tasks</Link></li>
            <li><Link to="/UserDetails">User</Link></li>
            <li><Link to="/Report">Report</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="technician-main-content">
          <h1>Welcome to the Elaicle BMS Technician Dashboard</h1>
          <p>Select an option from the left panel to get started.</p>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="card clickable" onClick={() => navigate('/userDetails')}>
              <h3>👤 Total Users</h3>
              <p>{counts.userCount}</p>
            </div>
            <div className="card clickable" onClick={() => navigate('/TechnicianWarranty')}>
              <h3>📄 Warranties</h3>
              <p>{counts.warrantyCount}</p>
            </div>
            <div className="card">
              <h3>🔋 Battery Check</h3>
              <p>{counts.warrantyCount}</p> {/* Replace with actual battery data if needed */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TechnicianHome;
