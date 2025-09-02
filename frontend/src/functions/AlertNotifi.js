// import React, { useState, useEffect, useCallback } from 'react';
// import Navbar from '../navbar/Navbar';
// import Footer from '../navbar/Footer';
// import './styles/AlertNotifi.css'; 

// const AlertNotifi = () => {
//   const [alerts, setAlerts] = useState({
//     overcharging: false,
//     undervoltage: false,
//     overheating: false,
//   });

//   const [criticalAlert, setCriticalAlert] = useState('');
//   const [temperature, setTemperature] = useState(25); // Assume initial temperature value

//   const handleCriticalAlert = useCallback((message) => {
//     setCriticalAlert(message);
//   }, []);

//   useEffect(() => {
//     const fetchAlerts = () => {
//       const simulatedData = {
//         overcharging: Math.random() > 0.8,
//         undervoltage: Math.random() > 0.85,
//         overheating: Math.random() > 0.9,
//       };

//       setAlerts(simulatedData);

//       if (simulatedData.overcharging) {
//         handleCriticalAlert('Overcharging detected!');
//       } else if (simulatedData.undervoltage) {
//         handleCriticalAlert('Undervoltage detected!');
//       } else if (simulatedData.overheating) {
//         handleCriticalAlert('Overheating detected!');
//       }
//     };

//     const interval = setInterval(fetchAlerts, 5000); 
//     return () => clearInterval(interval); 
//   }, [handleCriticalAlert]);

//   // Function to update temperature and adjust needle rotation
//   useEffect(() => {
//     const newTemperature = Math.random() * (50 - 20) + 20; // Simulated temperature between 20 and 50
//     setTemperature(newTemperature);
//   }, []);

//   const needleRotation = (temperature - 20) * (180 / 30); // Assuming temperature range between 20-50

//   return (
//     <div className="alert-notifi">
//       <Navbar />
//       <div className="content">
//         <h1>Alerts & Notifications</h1>
//         <p>Monitor critical battery conditions and receive notifications in real-time. Stay informed about the health and safety of your battery.</p>

//         <div className="alerts-container">
//           <div className={`alert-item ${alerts.overcharging ? 'active' : ''}`}>
//             <h3>Overcharging</h3>
//             <p>{alerts.overcharging ? 'Active' : 'Normal'}</p>
//             <span className={`status ${alerts.overcharging ? 'critical' : 'normal'}`}></span>
//           </div>
//           <div className={`alert-item ${alerts.undervoltage ? 'active' : ''}`}>
//             <h3>Undervoltage</h3>
//             <p>{alerts.undervoltage ? 'Active' : 'Normal'}</p>
//             <span className={`status ${alerts.undervoltage ? 'critical' : 'normal'}`}></span>
//           </div>
//           <div className={`alert-item ${alerts.overheating ? 'active' : ''}`}>
//             <h3>Overheating</h3>
//             <p>{alerts.overheating ? 'Active' : 'Normal'}</p>
//             <span className={`status ${alerts.overheating ? 'critical' : 'normal'}`}></span>
//           </div>
//         </div>

//         <div className="temperature-meter">
//           <div className="circle-background"></div>
          
//           </div>
//         {criticalAlert && (
//           <div className="critical-alert">
//             <h2>Critical Alert</h2>
//             <p>{criticalAlert}</p>
//             <button className="acknowledge-btn" onClick={() => setCriticalAlert('')}>Acknowledge</button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AlertNotifi;
