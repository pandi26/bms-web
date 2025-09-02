import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css"; // Assuming you use the same CSS

function TechnicianNavbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>🔧 Technician Panel</span>
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/TechnicianHome" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/TechnicianProfile" className="navbar-link">
              Profile
            </Link>
          </li>
         
          <li className="dropdown">
                    <span className="dropbtn">Assigned Tasks</span>
                    <div className="dropdown-content">
                      <Link to="/ParameterSet">User-B Parameter Set</Link>
                      <Link to="/TechnicianWarranty">user - warranty -verify</Link>
                      <Link to="/userDetails">Current Users</Link>
                      
                    </div>
                  </li>
          <li>
            <Link to="/Report" className="navbar-link">
              Reports
            </Link>
          </li>
           <li>
            <Link to="/BatteryHealthT" className="navbar-link">
               check
            </Link>
          </li>
          <li>
            <Link to="/TechnicianLogin" className="navbar-link">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default TechnicianNavbar;
