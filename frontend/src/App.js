import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Navbar from "./navbar/Navbar";
import BatteryInfo from "./components/BatteryInfo";
import Footer from "./navbar/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile"; // Ensure default export
import RtbatteryMonitoring from "./functions/RtbatteryMonitoring"; // Ensure default export
//import BatteryHealthDiagnostics from "./functions/Battery-HealthDiagnostics"; // Ensure default export
import BatteryCharge from "./functions/BatteryCharge"; // Ensure default export
import HistoricalDataLogs from "./functions/HistoricalDataLogs";
import Signup from "./components/Signup";
import AdminHome from "./admin/AdminHome";
import TechnicianManagement from "./admin/TechnicianManagement";
import AdminAddTechnician from "./admin/AdminAddTechnician";
import AdminWarranty from "./admin/adminWarranty";
import ToggleSwitch from "./components/ToggleSwitch"; // Ensure default export
import BatteryBalance from "./functions/BatteryBalance"; // Ensure default export
import RemoteMonitor from "./functions/RemoteMonitor"; // Ensure default export
import ConfigureSetting from "./functions/ConfigureSetting"; // Ensure default export
import AdminDasboard from "./admin/AdminDasboard";
import AdminLogin from "./admin/Adminlogin";
import BatteryHealth from "./admin/BatteryHealthd";
import TechnicianHome from "./Technician/Technicianhome";
import ParameterSetting from "./functions/ParameterSetting";
import ActiveEquilibrium from "./functions/ActiveEquilibrium";
import Engineeringmodel from "./functions/EngineeringModel";
import AdminSignup from "./admin/AdminSignup";
import TechnicianLogin from "./Technician/TechnicianLogin";
import TechnicianSignup from "./Technician/TechnicianSignup";
import BatteryMonitor from "./functions/BatteryMonitor"; // Ensure default export
import BatteryStatus from "./admin/BatteryStatus";
import UserManagement from "./admin/UserManagement";
import UserDetails from "./Technician/UserDetails";
import TechnicianProfile from "./Technician/TechnicianProfile";
import Report from "./Technician/Report";
import ParameterSet from "./Technician/ParameterSet";
import ActEquilibrium from "./Technician/ActEquilibrium";
import BatteryNotifi from "./Technician/BateryNotifi";
import TechnicianWarranty from "./Technician/TechnicianWarranty";
import BatteryHealthT from "./Technician/BatteryHealthT";
import Realdata from "./components/Realdata"; // Ensure default export

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState("");
  const [batteryHealth, setBatteryHealth] = useState("");
  const [chargingStatus, setChargingStatus] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/data");
          setData(response.data.data);
          setBatteryHealth(response.data.batteryHealth);
          setChargingStatus(response.data.chargingStatus);
          setAlert(response.data.alert);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };

      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && window.location.pathname !== "/login" && <Navbar />}
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  {loading ? (
                    <BatteryInfo />
                  ) : (
                    <Dashboard
                      batteryHealth={batteryHealth}
                      chargingStatus={chargingStatus}
                      alert={alert}
                      data={data}
                      onLogout={handleLogout}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/battery-monitoring"
              element={
                <BatteryInfo
                  batteryHealth={batteryHealth}
                  chargingStatus={chargingStatus}
                  alert={alert}
                />
              }
            />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/functions/RtbatteryMonitoring" element={<RtbatteryMonitoring />} />
            {/* <Route path="/functions/Battery-HealthDiagnostics" element={<BatteryHealthDiagnostics />} /> */}
            <Route path="/functions/BatteryCharge" element={<BatteryCharge />} />
            <Route path="/functions/HistoricalDataLogs" element={<HistoricalDataLogs />} />
            <Route path="/functions/EngineeringModel" element={<Engineeringmodel />} />
            <Route path="/components/UserProfile" element={<UserProfile />} />
            <Route path="/components/ToggleSwitch" element={<ToggleSwitch />} />
            <Route path="/functions/BatteryBalance" element={<BatteryBalance />} />
           
            <Route path="/functions/ConfigureSetting" element={<ConfigureSetting />} />
            <Route path="/functions/BatteryMonitor" element={<BatteryMonitor />} />
            <Route path="/components/Realdata" element={<Realdata />} />
            <Route path="/AdminDasboard" element={<AdminDasboard />} />
            <Route path="/TechnicianHome" element={<TechnicianHome />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/BatteryHealthd" element={<BatteryHealth />} />
            <Route path="/functions/ParameterSetting" element={<ParameterSetting />} />
            <Route path="/functions/ActiveEquilibrium" element={<ActiveEquilibrium />} />
            <Route path="/AdminHome" element={<AdminHome />} />
            <Route path="/adminWarranty" element={<AdminWarranty />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/AdminAddTechnician" element={<AdminAddTechnician />} />
            <Route path="/TechnicianManagement" element={<TechnicianManagement />} />
            <Route path="/TechnicianSignup" element={<TechnicianSignup />} />
            <Route path="/TechnicianLogin" element={<TechnicianLogin />} />
            <Route path="/TechnicianProfile" element={<TechnicianProfile />} />
            <Route path="/TechnicianWarranty" element={<TechnicianWarranty />} />
            <Route path="/BatteryHealthT" element={<BatteryHealthT />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/ParameterSet" element={<ParameterSet />} />
            <Route path="/ActEquilibrium" element={<ActEquilibrium />} />
            <Route path="/BatteryNotifi" element={<BatteryNotifi />} />
            <Route path="/battery-status" element={<BatteryStatus />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/UserDetails" element={<UserDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;