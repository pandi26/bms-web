import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"; // Import the styling for the Navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>🔧 Admin Panel</span>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/adminHome" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="dropdown">
          <span className="dropbtn">Users</span>
          <div className="dropdown-content">
            <Link to="/user-management">All Users</Link>
            <Link to="/TechnicianManagement">Technicians</Link>
          </div>
        </li>
        <li>
            <Link to="/AdminAddTechnician" className="navbar-link">
              add Technician
            </Link>
          </li>
          
          
          <li className="dropdown">
          <span className="dropbtn">Querys</span>
          <div className="dropdown-content">
            <Link to="/adminWarranty">Warranty Requests</Link>
            <Link to="/batteryHealthd">User-batery data fetch</Link>
          </div>
        </li>
          <li>
            <Link to="/adminlogin" className="navbar-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
