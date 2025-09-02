import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import '../navbar/styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('Guest'); // Store email in state
  const [isUartConnected, setIsUartConnected] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false); // Control navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user email from session storage on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    setUserEmail(storedEmail && storedEmail.trim() ? storedEmail : 'Guest');
  }, []);

  // Toggle the menu open/close
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close the menu
  const closeMenu = () => setIsMenuOpen(false);

  //  UART connection toggle
  const handleUartConnection = () => {
    setIsUartConnected(!isUartConnected);
    const message = isUartConnected ? 'UART Disconnected' : 'UART Connect not connected';
    alert(message); // Simple notification for connection change
  };

  // Scroll and mousemove event listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsNavbarHidden(true);
      } else {
        // Scrolling up
        setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (event) => {
      // Show navbar when cursor is near the top
      if (event.clientY < 50) {
        setIsNavbarHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  // Don't show the navbar on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null; // Return nothing (hide navbar)
  }

  return (
    <nav className={`navbar ${isNavbarHidden ? 'hidden' : ''}`}>
      <div className="navbar-container">
        <h2 className="navbar-logo"></h2>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/dashboard"
              className={`navbar-link ${location.pathname === '/dashboard' ? 'active-link' : ''}`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/functions/RtbatteryMonitoring"
              className={`navbar-link ${location.pathname === '/functions/RtbatteryMonitoring' ? 'active-link' : ''}`}
              onClick={closeMenu}
            >
              Battery Analysis
            </Link>
          </li>
          <li>
            <Link
              to="/functions/Setting"
              className={`navbar-link ${location.pathname === '/functions/Setting' ? 'active-link' : ''}`}
              onClick={closeMenu}
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              className={`uart-button ${isUartConnected ? 'connected' : 'disconnected'}`}
              onClick={handleUartConnection}
            >
              {isUartConnected ? 'Disconnect UART' : 'Connect UART'}
            </button>
          </li>
        </ul>
        <div className="user-profile" onClick={() => navigate('/components/UserProfile')}>
          <FaRegUser className="user-icon" title="User Profile" />
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
