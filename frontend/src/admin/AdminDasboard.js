import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/AdminHome.css";

function AdminDasboard() {
  const navigate = useNavigate();
  const adminEmail = sessionStorage.getItem("email") || "Admin";

  const [users, setUsers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const [showTechnicians, setShowTechnicians] = useState(true);

  useEffect(() => {
    // Fetch users only once
    axios
      .get("http://localhost:5000/api/users-only")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data); // Update state with response data
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); 
  
  const handleLogout = () => {
    sessionStorage.clear();
    alert("You have been logged out.");
    navigate("/Adminlogin");
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Elaicle BMS Admin</div>
        <div className="navbar-right">
          <div className="admin-info">
            <i className="fas fa-user-circle user-icon"></i>
            <span className="admin-email">{adminEmail}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h4>Admin Control Panel</h4>
          <ul>
            <li><Link to="/BatteryHealthd">Battery Health Status</Link></li>
            <li><Link to="/user-management">User Management</Link></li>
            <li><Link to="/system-settings">Battery Setting</Link></li>
            <li><Link to="/error-logs">View Alert Logs</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          <h1>Welcome to the Elaicle BMS Admin Dashboard</h1>
          <p>Manage users and technicians efficiently.</p>

          {/* Toggle Buttons */}
          <div className="button-container">
            <button onClick={() => setShowUsers(!showUsers)} className="toggle-button">
              {showUsers ? "Hide Users" : "Show Users"}
            </button>
            <button onClick={() => setShowTechnicians(!showTechnicians)} className="toggle-button">
              {showTechnicians ? "Hide Technicians" : "Show Technicians"}
            </button>
          </div>

          {/* Data Tables */}
          <div className="grid-container">
            {showUsers && (
              <div className="data-section">
                <h2>Users</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showTechnicians && (
              <div className="data-section">
                <h2>Technicians</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicians.map((tech, index) => (
                      <tr key={index}>
                        <td>{tech.username}</td>
                        <td>{tech.email}</td>
                        <td>{new Date(tech.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDasboard;
