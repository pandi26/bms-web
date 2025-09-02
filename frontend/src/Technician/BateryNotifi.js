// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// //import ReactSpeedometer from "react-d3-speedometer";
// import "../functions/styles/batteryMonitor.css";
// import TechnicianNavbar from './TechnicianNavbar';

// const BatteryNotifi = () => {
//   const [batteryData, setBatteryData] = useState(null);
//   const [alarms, setAlarms] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBatteryData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/battery/monitor');
//         setBatteryData(response.data.data.batteryData);
//         setAlarms(response.data.data.alarms);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching battery data:", error);
//         setLoading(false);
//       }
//     };

//     fetchBatteryData();
//     const interval = setInterval(fetchBatteryData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return <div className="loading-screen">Loading...</div>;
//   }

//   return (
//     <div className="batteryMonitorContent">
//       <TechnicianNavbar/>
//       <h1 className="batteryTitle">🔋 Battery Notification Dashboard</h1>

//       {batteryData && (
//         <div className="batteryGrid">
//           {/* Battery Voltages */}
//           <div className="batteryCard">
//             <h2>Cell Voltages</h2>
//             <ul className="batteryList">
//               <li><span>Cell 1:</span> {batteryData.cell1} V</li>
//               <li><span>Cell 2:</span> {batteryData.cell2} V</li>
//               <li><span>Cell 3:</span> {batteryData.cell3} V</li>
//             </ul>
//           </div>

//           {/* Temperature */}
//           <div className="batteryCard">
//             <h2>Temperature</h2>
//             <div className="batteryTemp">
//               {batteryData.temperature} °C
//             </div>
//           </div>

//           {/* Alarms */}
//           <div className="batteryCard">
//             <h2>Alarms Status</h2>
//             <ul className="alarmList">
//               <li style={{ color: alarms.undervoltage ? 'red' : 'green' }}>
//                 {alarms.undervoltage ? '⚠️ Under Voltage Triggered' : '✅ Under Voltage Normal'}
//               </li>
//               <li style={{ color: alarms.overvoltage ? 'red' : 'green' }}>
//                 {alarms.overvoltage ? '⚠️ Over Voltage Triggered' : '✅ Over Voltage Normal'}
//               </li>
//               <li style={{ color: alarms.undertemperature ? 'red' : 'green' }}>
//                 {alarms.undertemperature ? '⚠️ Under Temperature Triggered' : '✅ Under Temperature Normal'}
//               </li>
//               <li style={{ color: alarms.overtemperature ? 'red' : 'green' }}>
//                 {alarms.overtemperature ? '⚠️ Over Temperature Triggered' : '✅ Over Temperature Normal'}
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BatteryNotifi;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactSpeedometer from "react-d3-speedometer";
import "../functions/styles/batteryMonitor.css";
import TechnicianNavbar from './TechnicianNavbar';

const BatteryNotifi = ({ batteryId }) => {
  const [batteryData, setBatteryData] = useState(null);
  const [alarms, setAlarms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatteryData = async () => {
      try {
        const endpoint = batteryId
          ? `http://localhost:5000/api/battery/monitor/${batteryId}`
          : 'http://localhost:5000/api/battery/monitor';
        const response = await axios.get(endpoint);
        console.log('Fetched battery data:', response.data);
        setBatteryData(response.data.data?.batteryData || null);
        setAlarms(response.data.data?.alarms || null);
        setError(null);
      } catch (error) {
        console.error('Error fetching battery data:', error.message, error.response?.data);
        setError(
          error.response?.data?.error ||
            'Failed to fetch battery data. Please check the backend server.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryData();
    const interval = setInterval(fetchBatteryData, 5000);
    return () => clearInterval(interval);
  }, [batteryId]);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (error) {
    return <div className="error-screen">{error}</div>;
  }

  if (!batteryData || !alarms) {
    return <div className="error-screen">No battery data available.</div>;
  }

  return (
    <div className="batteryMonitorContent">
      <TechnicianNavbar />
      <h1 className="batteryTitle">
        🔋 Battery Notification Dashboard {batteryId ? `for Battery ID: ${batteryId}` : ''}
      </h1>

      <div className="batteryGrid">
        {/* Battery Voltages */}
        <div className="batteryCard">
          <h2>Cell Voltages</h2>
          <ul className="batteryList">
            <li><span>Cell 1:</span> {batteryData.cell1 ? `${batteryData.cell1} V` : 'N/A'}</li>
            <li><span>Cell 2:</span> {batteryData.cell2 ? `${batteryData.cell2} V` : 'N/A'}</li>
            <li><span>Cell 3:</span> {batteryData.cell3 ? `${batteryData.cell3} V` : 'N/A'}</li>
          </ul>
          {/* Optional Speedometer for Voltage 
          {batteryData.cell1 && (
            <ReactSpeedometer
              value={batteryData.cell1}
              minValue={0}
              maxValue={5}
              segments=5
              needleColor="#333"
              startColor="#00ff00"
              endColor="#ff0000"
              textColor="#fff"
              width={200}
              height={200}
              labelFontSize="12"
              valueTextFontSize="16"
            />
          )}
          */}
        </div>

        {/* Temperature */}
        <div className="batteryCard">
          <h2>Temperature</h2>
          <div className="batteryTemp">
            {batteryData.temperature ? `${batteryData.temperature} °C` : 'N/A'}
          </div>
          {/* Optional Speedometer for Temperature 
          {batteryData.temperature && (
            <ReactSpeedometer
              value={batteryData.temperature}
              minValue={0}
              maxValue={100}
              segments=5
              needleColor="#333"
              startColor="#00ff00"
              endColor="#ff0000"
              textColor="#fff"
              width={200}
              height={200}
              labelFontSize="12"
              valueTextFontSize="16"
            />
          )}
          */}
        </div>

        {/* Alarms */}
        <div className="batteryCard">
          <h2>Alarms Status</h2>
          <ul className="alarmList">
            <li style={{ color: alarms.undervoltage ? 'red' : 'green' }}>
              {alarms.undervoltage ? '⚠️ Under Voltage Triggered' : '✅ Under Voltage Normal'}
            </li>
            <li style={{ color: alarms.overvoltage ? 'red' : 'green' }}>
              {alarms.overvoltage ? '⚠️ Over Voltage Triggered' : '✅ Over Voltage Normal'}
            </li>
            <li style={{ color: alarms.undertemperature ? 'red' : 'green' }}>
              {alarms.undertemperature ? '⚠️ Under Temperature Triggered' : '✅ Under Temperature Normal'}
            </li>
            <li style={{ color: alarms.overtemperature ? 'red' : 'green' }}>
              {alarms.overtemperature ? '⚠️ Over Temperature Triggered' : '✅ Over Temperature Normal'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BatteryNotifi;
