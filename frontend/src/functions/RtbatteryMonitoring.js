
//   // import React, { useEffect, useState, useRef } from "react";
//   // import axios from "axios";
//   // import Footer from "../navbar/Footer";
//   // import { FaBars,
//   // FaUserCircle,
//   //   FaBell,
//   //   FaBatteryFull,
//   //   FaChartLine,
//   //   FaHistory,
//   //   FaSlidersH,
//   //   FaTools,
//   //   FaTimes,
//   // } from "react-icons/fa";
//   // import ReactSpeedometer from "react-d3-speedometer";
//   // import { Link, useNavigate } from "react-router-dom";
//   // import "../functions/styles/ActiveEquilibrium.css";
//   // import "../functions/styles/Stylee.css";
//   // import "../functions/styles/RtbatteryMonitoring.css";
 

//   // const authtoken = sessionStorage.getItem("authToken");
//   // console.log(authtoken);

//   // console.log()

//   // // if(!token){

//   // //   console.log(" check the process");

//   // //   condition (med.silce (arracy (=>{
//   // //     try{
//   // //       console.log("check the priyority");
//   // //       console.log("check the avaiblity for the connection");

//   // //     }
//   // //   })))

    

//   // const authToken =sessionStorage.getItem("authToken");
//   // console.log(authToken);

//   // const LEDBatteryMeter = ({ 
//   //   value = 50, 
//   //   maxValue = 100, 
//   //   minValue = 0
//   // }) => {
//   //   const canvasRef = useRef(null);
//   //   const animatedValueRef = useRef(minValue);
//   //   const blinkStateRef = useRef(true);
//   //   const animationFrameRef = useRef(null);

//   //   const config = {
//   //     maxValue,
//   //     minValue,
//   //     ledCount: 32,
//   //     animationSpeed: 0.15,
//   //     blinkInDanger: true,
//   //     zones: [
//   //       { threshold: 25, color: '#ff4444', label: 'Critical' },
//   //       { threshold: 60, color: '#ffaa00', label: 'Warning' },
//   //       { threshold: 100, color: '#00ff88', label: 'Good' }
//   //     ]
//   //   };

//   //   // Convert hex to rgba
//   //   const hexToRgba = (hex, alpha) => {
//   //     const r = parseInt(hex.slice(1, 3), 16);
//   //     const g = parseInt(hex.slice(3, 5), 16);
//   //     const b = parseInt(hex.slice(5, 7), 16);
//   //     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   //   };

//   //   const getAngleRange = () => {
//   //     return { start: Math.PI * 0.75, end: Math.PI * 2.25, total: Math.PI * 1.5 };
//   //   };

//   //   const getCurrentZone = (val) => {
//   //     const normalizedValue = Math.max(config.minValue, Math.min(config.maxValue, val));
//   //     for (let zone of config.zones) {
//   //       if (normalizedValue <= zone.threshold) return zone;
//   //     }
//   //     return config.zones[config.zones.length - 1];
//   //   };

//   //   const drawMeter = (currentValue) => {
//   //     const canvas = canvasRef.current;
//   //     if (!canvas) return;

//   //     const ctx = canvas.getContext('2d');
//   //     const normalizedValue = Math.max(config.minValue, Math.min(config.maxValue, currentValue));
//   //     const percentage = ((normalizedValue - config.minValue) / (config.maxValue - config.minValue)) * 100;
//   //     const angleRange = getAngleRange();
//   //     const centerX = canvas.width / 2;
//   //     const centerY = canvas.height - 100;
//   //     const radius = 140;
//   //     const angleStep = (angleRange.end - angleRange.start) / (config.ledCount - 1);
//   //     const ledWidth = 12;
//   //     const ledHeight = 10;

//   //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    
//   //     const activeAngle = angleRange.start + (percentage / 100) * angleRange.total;
//   //     ctx.beginPath();
//   //     ctx.arc(centerX, centerY, radius + 5, angleRange.start, activeAngle);
//   //     ctx.lineWidth = 6;
      
//   //     const activeGradient = ctx.createLinearGradient(
//   //       centerX + radius * Math.cos(angleRange.start),
//   //       centerY + radius * Math.sin(angleRange.start),
//   //       centerX + radius * Math.cos(activeAngle),
//   //       centerY + radius * Math.sin(activeAngle)
//   //     );
      
//   //     if (percentage <= 25) {
//   //       activeGradient.addColorStop(0, '#ff4444');
//   //       activeGradient.addColorStop(1, '#ff6666');
//   //     } else if (percentage <= 60) {
//   //       activeGradient.addColorStop(0, '#ff4444');
//   //       activeGradient.addColorStop(0.5, '#ffaa00');
//   //       activeGradient.addColorStop(1, '#ffcc00');
//   //     } else {
//   //       activeGradient.addColorStop(0, '#ffaa00');
//   //       activeGradient.addColorStop(1, '#00ff88');
//   //     }
      
//   //     ctx.strokeStyle = activeGradient;
//   //     ctx.shadowColor = getCurrentZone(normalizedValue).color;
//   //     ctx.shadowBlur = 20;
//   //     ctx.stroke();
//   //     ctx.shadowBlur = 0;

//   //     // Draw LEDs with enhanced 3D effect
//   //     const activeSegments = Math.floor((percentage / 100) * config.ledCount);
//   //     const isInDangerZone = normalizedValue <= 25;
//   //     const pulseTime = Date.now() / 300;

//   //     for (let i = 0; i < config.ledCount; i++) {
//   //       const angle = angleRange.start + i * angleStep;
//   //       const x = centerX + radius * Math.cos(angle);
//   //       const y = centerY + radius * Math.sin(angle);

//   //       ctx.save();
//   //       ctx.translate(x, y);
//   //       ctx.rotate(angle + Math.PI / 2);

//   //       // LED shadow
//   //       ctx.beginPath();
//   //       ctx.roundRect(-ledWidth / 2, -ledHeight / 2, ledWidth, ledHeight, 2);
//   //       ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
//   //       ctx.fill();

//   //       // LED body
//   //       ctx.beginPath();
//   //       ctx.roundRect(-ledWidth / 2, -ledHeight / 2, ledWidth, ledHeight, 2);

//   //       const isLEDActive = i < activeSegments;
//   //       let ledColor = 'rgba(60, 60, 80, 0.3)';
        
//   //       if (isLEDActive) {
//   //         const ledPercentage = ((i + 1) / config.ledCount) * 100;
//   //         const zone = getCurrentZone(ledPercentage);
          
//   //         const pulse = Math.sin(pulseTime + i * 0.2) * 0.3 + 0.7;
//   //         ledColor = zone.color;
          
//   //         // Blinking effect for critical zones
//   //         if (config.blinkInDanger && isInDangerZone && i >= activeSegments - 4) {
//   //           ledColor = blinkStateRef.current ? zone.color : 'rgba(102, 102, 102, 0.3)';
//   //         }
          
//   //         const gradient = ctx.createRadialGradient(0, -2, 1, 0, 0, ledWidth / 2);
//   //         gradient.addColorStop(0, hexToRgba(ledColor, 1));
//   //         gradient.addColorStop(0.7, hexToRgba(ledColor, pulse * 0.8));
//   //         gradient.addColorStop(1, hexToRgba(ledColor, pulse * 0.4));
//   //         ctx.fillStyle = gradient;
          
//   //         ctx.shadowColor = ledColor;
//   //         ctx.shadowBlur = 15;
//   //       } else {
//   //         ctx.fillStyle = ledColor;
//   //         ctx.shadowBlur = 0;
//   //       }

//   //       ctx.fill();
        
//   //       // LED highlight
//   //       ctx.strokeStyle = 'rgba(52, 37, 37, 0.4)';
//   //       ctx.lineWidth = 1;
//   //       ctx.stroke();
//   //       ctx.restore();
//   //     }

//   //     // Draw scale marks and labels (0, 20, 40, 60, 80, 100)
//   //     const markCount = 6;
//   //     const labelValues = [0, 20, 40, 60, 80, 100];
//   //     for (let i = 0; i < markCount; i++) {
//   //       const markPercentage = i / (markCount - 1);
//   //       const markAngle = angleRange.start + markPercentage * angleRange.total;
//   //       const markValue = labelValues[i];

//   //       // Scale marks
//   //       const x1 = centerX + (radius - 10) * Math.cos(markAngle);
//   //       const y1 = centerY + (radius - 10) * Math.sin(markAngle);
//   //       const x2 = centerX + (radius - 8) * Math.cos(markAngle);
//   //       const y2 = centerY + (radius - 8) * Math.sin(markAngle);

//   //       ctx.beginPath();
//   //       ctx.moveTo(x1, y1);
//   //       ctx.lineTo(x2, y2);
//   //       ctx.strokeStyle = '#9ca3af';
//   //       ctx.lineWidth = 2;
//   //       ctx.stroke();

//   //       // Scale labels
//   //       const textX = centerX + (radius - 45) * Math.cos(markAngle);
//   //       const textY = centerY + (radius - 45) * Math.sin(markAngle);

//   //       ctx.font = 'bold 16px Arial';
//   //       ctx.fillStyle = 'black';
//   //       ctx.textAlign = 'center';
//   //       ctx.textBaseline = 'middle';
//   //       ctx.fillText(markValue, textX, textY);
//   //     }

//   //     // Draw needle with enhanced styling
//   //     const currentZone = getCurrentZone(normalizedValue);
//   //     const needleAngle = angleRange.start + (percentage / 100) * angleRange.total;
      
//   //     // Needle shadow
//   //     ctx.beginPath();
//   //     ctx.moveTo(centerX + 2, centerY + 2);
//   //     ctx.lineTo(centerX + (radius - 10) * Math.cos(needleAngle) + 2, centerY + (radius - 10) * Math.sin(needleAngle) + 2);
//   //     ctx.lineWidth = 8;
//   //     ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
//   //     ctx.stroke();

//   //     // Main needle
//   //     const needleGradient = ctx.createLinearGradient(
//   //       centerX, centerY,
//   //       centerX + radius * Math.cos(needleAngle), centerY + radius * Math.sin(needleAngle)
//   //     );
//   //     needleGradient.addColorStop(0, '#ffffff');
//   //     needleGradient.addColorStop(0.7, currentZone.color);
//   //     needleGradient.addColorStop(1, '#ffffff');

//   //     ctx.beginPath();
//   //     ctx.moveTo(centerX, centerY);
//   //     ctx.lineTo(centerX + (radius - 10) * Math.cos(needleAngle), centerY + (radius - 10) * Math.sin(needleAngle));
//   //     ctx.lineWidth = 6;
//   //     ctx.strokeStyle = needleGradient;
//   //     ctx.shadowColor = currentZone.color;
//   //     ctx.shadowBlur = 20;
//   //     ctx.stroke();
//   //     ctx.shadowBlur = 0;

//   //     // Center hub with multiple layers
//   //     ctx.beginPath();
//   //     ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
//   //     const centerGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 25);
//   //     centerGradient.addColorStop(0, currentZone.color);
//   //     centerGradient.addColorStop(0.6, '#ffffff');
//   //     centerGradient.addColorStop(1, currentZone.color);
//   //     ctx.fillStyle = centerGradient;
//   //     ctx.shadowColor = currentZone.color;
//   //     ctx.shadowBlur = 25;
//   //     ctx.fill();
//   //     ctx.shadowBlur = 0;

//   //     // Center highlight
//   //     ctx.beginPath();
//   //     ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
//   //     ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
//   //     ctx.lineWidth = 2;
//   //     ctx.stroke();
//   //   };

//   //   const animateMeter = () => {
//   //     if (Math.abs(animatedValueRef.current - value) > 0.1) {
//   //       animatedValueRef.current += (value - animatedValueRef.current) * config.animationSpeed;
//   //       drawMeter(animatedValueRef.current);
//   //       animationFrameRef.current = requestAnimationFrame(animateMeter);
//   //     } else {
//   //       drawMeter(value);
//   //     }
//   //   };

//   //   useEffect(() => {
//   //     const blinkInterval = setInterval(() => {
//   //       blinkStateRef.current = !blinkStateRef.current;
//   //       drawMeter(animatedValueRef.current);
//   //     }, 500);

//   //     drawMeter(value);
//   //     animationFrameRef.current = requestAnimationFrame(animateMeter);

//   //     return () => {
//   //       clearInterval(blinkInterval);
//   //       if (animationFrameRef.current) {
//   //         cancelAnimationFrame(animationFrameRef.current);
//   //       }
//   //     };
//   //   }, []);

//   //   useEffect(() => {
//   //     animatedValueRef.current = value;
//   //     if (!animationFrameRef.current) {
//   //       animationFrameRef.current = requestAnimationFrame(animateMeter);
//   //     }
//   //   }, [value]);

//   //   return (
//   //     <div style={{ 
//   //       display: 'flex', 
//   //       flexDirection: 'column', 
//   //       alignItems: 'center',
//   //       padding: '10px',
//   //       borderRadius: '15px',
//   //       border: '1px solid rgba(255, 255, 255, 0.15)',
//   //       marginLeft: '-220px',
//   //       marginTop: '60px'
//   //     }}>
//   //       <canvas 
//   //         ref={canvasRef} 
//   //         width="400" 
//   //         height="300" 
//   //         style={{
//   //           borderRadius: '10px',
//   //           backdropFilter: 'blur(10px)',
//   //         }}
//   //       />
//   //       <div style={{ 
//   //         display: 'flex', 
//   //         gap: '10px', 
//   //         marginTop: '15px',
//   //         fontSize: '14px',
//   //         color: '#e5e7eb'
//   //       }}>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // function RtbatteryMonitoring() {
//   //   const navigate = useNavigate();

//   //   const [batterySOC, setBatterySOC] = useState(100);
//   //   const [notifications] = useState(3);
//   //   const [currentTime] = useState(new Date().toLocaleString());
//   //   const [showMenu, setShowMenu] = useState(false);
//   //   const [showPopup, setShowPopup] = useState(false);
//   //   const [selectedPort, setSelectedPort] = useState("");
//   //   const [batteryMetrics, setBatteryMetrics] = useState(null);
//   //   const [dataStatus, setDataStatus] = useState("loading");
//   //   const [showNoDataPopup, setShowNoDataPopup] = useState(false);

//   //   useEffect(() => {
//   //     const fetchBatteryData = async () => {
//   //       try {
//   //         const res = await axios.get("http://localhost:5000/api/bmsdata-all");
//   //         if (res.data.success && res.data.data) {
//   //           const data = res.data.data;
//   //           setBatterySOC(data.soc || 100);
//   //           setBatteryMetrics({
//   //             totalVoltage: data.voltage || 52.5,
//   //             c1: data.cell1 || "--",
//   //             c2: data.cell2 || "--",
//   //             c3: data.cell3 || "--",
//   //             c4: data.cell4 || "--",
//   //             c5: data.cell5 || "--",
//   //             c6: data.cell6 || "--",
//   //             c7: data.cell7 || "--",
//   //             c8: data.cell8 || "--",
//   //             c9: data.cell9 || "--",
//   //             c10: data.cell10 || "--",
//   //             c11: data.cell11 || "--",
//   //             c12: data.cell12 || "--",
//   //             c13: data.cell13 || "--",
//   //             c14: data.cell14 || "--",
//   //             c15: data.cell15 || "--",
//   //             c16: data.cell16 || "--",
//   //             c17: data.cell17 || "--",
//   //             c18: data.cell18 || "--",
//   //             c19: data.cell19 || "--",
//   //             c20: data.cell20 || "--",
//   //             c21: data.cell21 || "--",
//   //             c22: data.cell22 || "--",
//   //             c23: data.cell23 || "--",
//   //             c24: data.cell24 || "--",
//   //             c25: data.cell25 || "--",
//   //             c26: data.cell26 || "--",
//   //             c27: data.cell27 || "--",
//   //             c28: data.cell28 || "--",
//   //             c29: data.cell29 || "--",
//   //             c30: data.cell30 || "--",
//   //             c31: data.cell31 || "--",
//   //             c32: data.cell32 || "--",
//   //             c33: data.cell33 || "--",
//   //             c34: data.cell34 || "--",
//   //             c35: data.cell35 || "--",
//   //             c36: data.cell36 || "--",
//   //             c37: data.cell37 || "--",
//   //             c38: data.cell38 || "--",
//   //             c39: data.cell39 || "--",
//   //             c40: data.cell40 || "--",
//   //             power: (data.voltage || 0) * (data.current || 0) || 150,
//   //             temp: data.temperature || 30,
//   //             temp2: data.temperature2 || "--",
//   //             temp3: data.temperature3 || "--",
//   //             temp4: data.temperature4 || "--",
//   //             temp5: data.temperature5 || "--",
//   //             temp6: data.temperature6 || "--",
//   //             temp7: data.temperature7 || "--",
//   //             soh: data.soh || 95,
//   //             chargingMOS: data.chargingMosStatus ?? 0,
//   //             dischargingMOS: data.dischargingMosStatus ?? 0,
//   //             current: data.current || 2.8,
//   //             life: data.lifeCycles || "-",
//   //             mosfetTemp: data.mosfetTemp || "--",
//   //             ambientTemp: data.ambientTemp || "--",
//   //             maxTemp: data.maxTemp || "--",
//   //           });
//   //           setDataStatus("success");
//   //           setShowNoDataPopup(false);
//   //         } else {
//   //           setDataStatus("error");
//   //           setShowNoDataPopup(true);
//   //         }
//   //       } catch (err) {
//   //         console.error("Error fetching battery data:", err);
//   //         setDataStatus("error");
//   //         setShowNoDataPopup(true);
//   //       }
//   //     };

//   //     fetchBatteryData();
//   //     const interval = setInterval(fetchBatteryData, 10000);
//   //     return () => clearInterval(interval);
//   //   }, []);

//   //   const handleCommSubmit = () => {
//   //     console.log("Selected Port:", selectedPort);
//   //     setShowPopup(false);
//   //   };

//   //   const handleClosePopup = () => {
//   //     setShowPopup(false);
//   //   };

//   //   const handleCloseNoDataPopup = () => {
//   //     setShowNoDataPopup(false);
//   //   };

//   //   const handleAlertClick = () => {
//   //     navigate("/functions/BatteryMonitor");
//   //   };

//   //   const MetricBox = ({ label, value, status, progress }) => (
//   //     <div className="metricBox">
//   //       <strong>{label}:</strong>
//   //       {progress ? (
//   //         <div className="progressWrapper">
//   //           <div className="progressBar" style={{ width: value, backgroundColor: "#4caf50" }} />
//   //           <span>{value}</span>
//   //         </div>
//   //       ) : label === "Charging MOS" || label === "Discharging MOS" ? (
//   //         <label className="toggle-switch">
//   //           <input type="checkbox" checked={status} readOnly />
//   //           <span className="slider round"></span>
//   //         </label>
//   //       ) : (
//   //         <span
//   //           style={{
//   //             color: status === true ? "green" : status === false ? "red" : "inherit",
//   //             fontWeight: status !== undefined ? "bold" : "normal",
//   //           }}
//   //         >
//   //           {value}
//   //         </span>
//   //       )}
//   //     </div>
//   //   );

//   //   return (
//   //     <div className="rtbDashboard">
//   //       {/* Sidebar */}
//   //       <aside className="rtbSidebar">
//   //         <h2 className="navbar1-logo"></h2>
//   //       <div className="alertbox">
//   //         <h4>Alert Notifications</h4>
//   //         <hr></hr>
//   //       </div>
//   //         <div className="bate">
//   //           <div className={`rtbSidebarBox ${batterySOC < 20 ? "rtbBgRed" : "rtbBgGreen"}`}>
//   //             {batterySOC.toFixed(1)}%
//   //           </div>
//   //         </div>
//   //         <div className="currentTime">
//   //           <h4>{currentTime}</h4>
//   //         </div>
//   //       </aside>

//   //       {/* Main Panel */}
//   //       <div className="rtbMain">
//   //         {/* Navbar Top */}
//   //         <nav className="rtbNavbar">
//   //           <FaBars className="rtbIcon" onClick={() => setShowMenu(!showMenu)} />
//   //           {showMenu && (
//   //             <div className="menuCard">
//   //               <ul>
//   //                 <li><button>Board</button></li>
//   //                 <li><button onClick={() => setShowPopup(true)}>Comm</button></li>
//   //                 <li><button onClick={() => window.location.reload()}>Refresh</button></li>
//   //               </ul>
//   //             </div>
//   //           )}
//   //           <ul className="rtbNavLinks">
//   //             <li><Link to="/functions/RtbatteryMonitoring"><FaChartLine /> Status</Link></li>
//   //             <li><Link to="/functions/BatteryCharge"><FaBatteryFull /> Battery Health</Link></li>
//   //             <li><Link to="/functions/HistoricalDataLogs"><FaHistory /> Historical Data</Link></li>
//   //             <li><Link to="/functions/ParameterSetting"><FaSlidersH /> Parameter Setting</Link></li>
//   //             <li><Link to="/functions/ActiveEquilibrium"><FaTools /> ActiveEquilibrium</Link></li>
//   //             <li><Link to="/functions/EngineeringModel"><FaTools /> Engineering Model</Link></li>
              
//   //             <li><Link to="/components/Realdata"> MQTT</Link></li>
        
//   //           </ul>
//   //         </nav>
          
//   //         {/* User Info */}
//   //         <nav className="rtbNavbar2">
//   //           <ul className="rtbNavuser">
//   //             <div className="surya2"></div>
//   //             <div className="surya"><Link to="/components/UserProfile"><FaUserCircle /></Link></div>
//   //             <div className="surya3">
//   //               <div className="rtbNotification" onClick={handleAlertClick}>
//   //                 <FaBell />
//   //                 {notifications > 0 && <span className="rtbNotificationBadge">{notifications}</span>}
//   //               </div>
//   //             </div>
//   //           </ul>
//   //         </nav>

//   //         {/* Data Sections */}
//   //         {dataStatus === "success" && batteryMetrics ? (
//   //           <div className="dataWrapper">
//   //             {/* Left Panel */}
//   //             <div className="leftPanell">
//   //               <h3>Cell Voltages</h3>
//   //               <div className="gridContainer">
//   //                 {["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29", "c30", "c31", "c32", "c33", "c34", "c35", "c36", "c37", "c38", "c39", "c40"].map(c => (
//   //                   <div key={c} className="gridBox">
//   //                     <strong><span>{batteryMetrics[c]} V</span></strong>
//   //                   </div>
//   //                 ))}
//   //                 <div className="Ccount">
//   //                   <strong>1-10</strong><br />
//   //                   <strong>11-20</strong><br />
//   //                   <strong>21-30</strong><br />
//   //                   <strong>31-40</strong><br />
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             {/* Center Panel */}
//   //             <div className="bty1">
//   //               <div className="centerPanel2">
//   //                 <h2>Battery Metrics</h2>
//   //                 <div className="gridContainer2">
//   //                   <div className="volt">
//   //                     <MetricBox label="Total Volt" value={`${batteryMetrics.totalVoltage} V`} status={true} />
//   //                     <p className="voltage-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="SOC" label="SOC" value={`${batterySOC.toFixed(1)} %`} />
//   //                     <p className="soc-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="chgMOS" label="Charging MOS" value={batteryMetrics.chargingMOS ? "ON" : "OFF"} status={batteryMetrics.chargingMOS} />
//   //                     <p className="chgmos-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="power" label="Power" value={`${batteryMetrics.power} W`} />
//   //                     <p className="power-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="current" label="Current" value={`${batteryMetrics.current} A`} />
//   //                     <p className="current-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="soh" label="SOH" value={`${batteryMetrics.soh} %`} progress />
//   //                     <p className="soh-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="dsgMOS" label="Discharging MOS" value={batteryMetrics.dischargingMOS ? "ON" : "OFF"} status={batteryMetrics.dischargingMOS} />
//   //                     <p className="dsgmos-icon" />
//   //                   </div>
//   //                   <div className="volt">
//   //                     <MetricBox className="life" label="Life Cycles" value={batteryMetrics.life} />
//   //                     <p className="life-icon" />
//   //                   </div>
//   //                 </div>
                  
//   //                 {/* LED Battery Meter */}
//   //                 <div className="ledMeterWrapper" style={{ margin: '0', display: 'flex', justifyContent: 'center' }}>
//   //                   <LEDBatteryMeter value={batterySOC} maxValue={100} minValue={0} />
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             {/* Right Panel */}
//   //             <div className="rp1">
//   //               <h3>Temperatures</h3>
//   //               <div className="gridContainer3">
//   //                 {["temp", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"].map(tempKey => (
//   //                   <div key={tempKey} className="gridBox">
//   //                     <strong>
//   //                       <span>
//   //                         {batteryMetrics[tempKey] !== undefined && batteryMetrics[tempKey] !== null
//   //                           ? `${batteryMetrics[tempKey]} °C`
//   //                           : "--"}
//   //                       </span>
//   //                     </strong>
//   //                   </div>
//   //                 ))}
//   //                 <div className="Ccount2">
//   //                   <strong>1-4</strong><br /><br />
//   //                   <strong>5-7</strong><br />
//   //                 </div>
//   //               </div>
//   //             </div>

//   //             {/* Temperature Summary */}
//   //             <div className="temdata2">
//   //               <label>Max Temp POS: </label><strong>1</strong><br /><br />
//   //               <label>Min Temp POS: </label><strong>7</strong><br /><br />
//   //               <label>Temp Diff: </label><strong>2 °C</strong><br /><br />
//   //               <label>Max Temp: </label><strong>30 °C</strong><br /><br />
//   //               <label>Min Temp: </label><strong>28 °C</strong><br />
//   //             </div>

//   //             {/* Alert Section */}
              
//   //           </div>
//   //         ) : dataStatus === "loading" ? (
//   //           <div className="loadingMessage">
//   //             <p>Loading battery data...</p>
//   //           </div>
//   //         ) : null}

//   //         <Footer />
//   //       </div>

//   //       {/* Comm Popup */}
//   //       {showPopup && (
//   //         <div className="popup">
//   //           <div className="popup-content">
//   //             <div className="popup-header">
//   //               <h3>Port Selection</h3>
//   //               <button className="popup-close" onClick={handleClosePopup}><FaTimes /></button>
//   //             </div>
//   //             <label>Select Port:</label>
//   //             <input type="text" value={selectedPort} onChange={(e) => setSelectedPort(e.target.value)} />
//   //             <button className="btn btn-primary" onClick={handleCommSubmit}>Submit</button>
//   //           </div>
//   //         </div>
//   //       )}

//   //       {/* No Data Popup */}
//   //       {showNoDataPopup && (
//   //         <div className="popup">
//   //           <div className="popup-content">
//   //             <div className="popup-header">
//   //               <h3>Data Unavailable</h3>
//   //               <button className="popup-close" onClick={handleCloseNoDataPopup}><FaTimes /></button>
//   //             </div>
//   //             <p>No Data Available. Please check the connection or try again later.</p>
//   //             <button className="btn btn-primary" onClick={handleCloseNoDataPopup}>Close</button>
//   //           </div>
//   //         </div>
//   //       )}

//   //     </div>
//   //   );
//   // }

//   // export default RtbatteryMonitoring;


  
// import React, { useState } from 'react';
// import "../functions/styles/RtbatteryMonitoring.css";
// import Footer from "../navbar/Footer";

// // Assume a CSS file for styling

// const RtBatteryMonitoring = () => {
//   const [batteryData, setBatteryData] = useState([]);
//   const [latestMetrics, setLatestMetrics] = useState(null);

//   // Callback function to handle serial data from Footer
//   const handleSerialData = (dataArray, line) => {
//     console.log('Received serial data:', { dataArray, line });

//     // Update the full data history
//     setBatteryData(dataArray);

//     // Parse the latest line for real-time metrics
//     try {
     
//       const metrics = {};
//       const pairs = line.split(',').map(pair => pair.split(':').map(item => item.trim()));
//       pairs.forEach(([key, value]) => {
//         // Remove units (V, A, etc.) and convert to number where applicable
//         const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || value;
//         metrics[key] = numericValue;
//       });
//       setLatestMetrics(metrics);
//     } catch (err) {
//       console.error('Error parsing serial line:', err.message, 'Line:', line);
//     }
//   };

//   return (
//     <div className="rt-battery-monitoring">
//       <h2>Real-Time Battery Monitoring</h2>
//       <div className="metrics-display">
//         {latestMetrics ? (
//           <ul>
//             {Object.entries(latestMetrics).map(([key, value]) => (
//               <li key={key}>
//                 {key}: {typeof value === 'number' ? value.toFixed(2) : value}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No data received yet.</p>
//         )}
//       </div>
//       <div className="data-history">
//         <h3>Data History (Last 50 Lines)</h3>
//         <ul>
//           {batteryData.map((entry, index) => (
//             <li key={index}>
//               {entry.timestamp}: {entry.raw}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <Footer onSerialData={handleSerialData} />
//     </div>
//   );
// };

// export default RtBatteryMonitoring;

import React, { useEffect, useState, useRef } from "react";
import { FaBars, FaUserCircle, FaBell, FaBatteryFull, FaChartLine, FaHistory, FaSlidersH, FaTools, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../navbar/Footer";
import "../functions/styles/ActiveEquilibrium.css";
import "../functions/styles/Stylee.css";
import "../functions/styles/RtbatteryMonitoring.css";

const LEDBatteryMeter = ({ value = 50, maxValue = 100, minValue = 0 }) => {
  const canvasRef = useRef(null);
  const animatedValueRef = useRef(minValue);
  const blinkStateRef = useRef(true);
  const animationFrameRef = useRef(null);

  const config = {
    maxValue,
    minValue,
    ledCount: 32,
    animationSpeed: 0.15,
    blinkInDanger: true,
    zones: [
      { threshold: 25, color: '#ff4444', label: 'Critical' },
      { threshold: 60, color: '#ffaa00', label: 'Warning' },
      { threshold: 100, color: '#00ff88', label: 'Good' }
    ]
  };

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getAngleRange = () => {
    return { start: Math.PI * 0.75, end: Math.PI * 2.25, total: Math.PI * 1.5 };
  };

  const getCurrentZone = (val) => {
    const normalizedValue = Math.max(config.minValue, Math.min(config.maxValue, val));
    for (let zone of config.zones) {
      if (normalizedValue <= zone.threshold) return zone;
    }
    return config.zones[config.zones.length - 1];
  };

  const drawMeter = (currentValue) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const normalizedValue = Math.max(config.minValue, Math.min(config.maxValue, currentValue));
    const percentage = ((normalizedValue - config.minValue) / (config.maxValue - config.minValue)) * 100;
    const angleRange = getAngleRange();
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 100;
    const radius = 140;
    const angleStep = (angleRange.end - angleRange.start) / (config.ledCount - 1);
    const ledWidth = 12;
    const ledHeight = 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activeAngle = angleRange.start + (percentage / 100) * angleRange.total;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, angleRange.start, activeAngle);
    ctx.lineWidth = 6;

    const activeGradient = ctx.createLinearGradient(
      centerX + radius * Math.cos(angleRange.start),
      centerY + radius * Math.sin(angleRange.start),
      centerX + radius * Math.cos(activeAngle),
      centerY + radius * Math.sin(activeAngle)
    );

    if (percentage <= 25) {
      activeGradient.addColorStop(0, '#ff4444');
      activeGradient.addColorStop(1, '#ff6666');
    } else if (percentage <= 60) {
      activeGradient.addColorStop(0, '#ff4444');
      activeGradient.addColorStop(0.5, '#ffaa00');
      activeGradient.addColorStop(1, '#ffcc00');
    } else {
      activeGradient.addColorStop(0, '#ffaa00');
      activeGradient.addColorStop(1, '#00ff88');
    }

    ctx.strokeStyle = activeGradient;
    ctx.shadowColor = getCurrentZone(normalizedValue).color;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.shadowBlur = 0;

    const activeSegments = Math.floor((percentage / 100) * config.ledCount);
    const isInDangerZone = normalizedValue <= 25;
    const pulseTime = Date.now() / 300;

    for (let i = 0; i < config.ledCount; i++) {
      const angle = angleRange.start + i * angleStep;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);

      ctx.beginPath();
      ctx.roundRect(-ledWidth / 2, -ledHeight / 2, ledWidth, ledHeight, 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(-ledWidth / 2, -ledHeight / 2, ledWidth, ledHeight, 2);

      const isLEDActive = i < activeSegments;
      let ledColor = 'rgba(60, 60, 80, 0.3)';

      if (isLEDActive) {
        const ledPercentage = ((i + 1) / config.ledCount) * 100;
        const zone = getCurrentZone(ledPercentage);

        const pulse = Math.sin(pulseTime + i * 0.2) * 0.3 + 0.7;
        ledColor = zone.color;

        if (config.blinkInDanger && isInDangerZone && i >= activeSegments - 4) {
          ledColor = blinkStateRef.current ? zone.color : 'rgba(102, 102, 102, 0.3)';
        }

        const gradient = ctx.createRadialGradient(0, -2, 1, 0, 0, ledWidth / 2);
        gradient.addColorStop(0, hexToRgba(ledColor, 1));
        gradient.addColorStop(0.7, hexToRgba(ledColor, pulse * 0.8));
        gradient.addColorStop(1, hexToRgba(ledColor, pulse * 0.4));
        ctx.fillStyle = gradient;

        ctx.shadowColor = ledColor;
        ctx.shadowBlur = 15;
      } else {
        ctx.fillStyle = ledColor;
        ctx.shadowBlur = 0;
      }

      ctx.fill();

      ctx.strokeStyle = 'rgba(52, 37, 37, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    const markCount = 6;
    const labelValues = [0, 20, 40, 60, 80, 100];
    for (let i = 0; i < markCount; i++) {
      const markPercentage = i / (markCount - 1);
      const markAngle = angleRange.start + markPercentage * angleRange.total;
      const markValue = labelValues[i];

      const x1 = centerX + (radius - 10) * Math.cos(markAngle);
      const y1 = centerY + (radius - 10) * Math.sin(markAngle);
      const x2 = centerX + (radius - 8) * Math.cos(markAngle);
      const y2 = centerY + (radius - 8) * Math.sin(markAngle);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 2;
      ctx.stroke();

      const textX = centerX + (radius - 45) * Math.cos(markAngle);
      const textY = centerY + (radius - 45) * Math.sin(markAngle);

      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(markValue, textX, textY);
    }

    const currentZone = getCurrentZone(normalizedValue);
    const needleAngle = angleRange.start + (percentage / 100) * angleRange.total;

    ctx.beginPath();
    ctx.moveTo(centerX + 2, centerY + 2);
    ctx.lineTo(centerX + (radius - 10) * Math.cos(needleAngle) + 2, centerY + (radius - 10) * Math.sin(needleAngle) + 2);
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.stroke();

    const needleGradient = ctx.createLinearGradient(
      centerX, centerY,
      centerX + radius * Math.cos(needleAngle), centerY + radius * Math.sin(needleAngle)
    );
    needleGradient.addColorStop(0, '#ffffff');
    needleGradient.addColorStop(0.7, currentZone.color);
    needleGradient.addColorStop(1, '#ffffff');

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + (radius - 10) * Math.cos(needleAngle), centerY + (radius - 10) * Math.sin(needleAngle));
    ctx.lineWidth = 6;
    ctx.strokeStyle = needleGradient;
    ctx.shadowColor = currentZone.color;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 25);
    centerGradient.addColorStop(0, currentZone.color);
    centerGradient.addColorStop(0.6, '#ffffff');
    centerGradient.addColorStop(1, currentZone.color);
    ctx.fillStyle = centerGradient;
    ctx.shadowColor = currentZone.color;
    ctx.shadowBlur = 25;
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const animateMeter = () => {
    if (Math.abs(animatedValueRef.current - value) > 0.1) {
      animatedValueRef.current += (value - animatedValueRef.current) * config.animationSpeed;
      drawMeter(animatedValueRef.current);
      animationFrameRef.current = requestAnimationFrame(animateMeter);
    } else {
      drawMeter(value);
    }
  };

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      blinkStateRef.current = !blinkStateRef.current;
      drawMeter(animatedValueRef.current);
    }, 500);

    drawMeter(value);
    animationFrameRef.current = requestAnimationFrame(animateMeter);

    return () => {
      clearInterval(blinkInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    animatedValueRef.current = value;
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateMeter);
    }
  }, [value]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '10px',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      marginLeft: '-220px',
      marginTop: '60px'
    }}>
      <canvas 
        ref={canvasRef} 
        width="400" 
        height="300" 
        style={{
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
        }}
      />
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: '15px',
        fontSize: '14px',
        color: '#e5e7eb'
      }}>
      </div>
    </div>
  );
};

const AlertBox = ({ batteryMetrics }) => {
  const [alertMessages, setAlertMessages] = useState([]);

  useEffect(() => {
    if (!batteryMetrics) return;

    const messages = [];
    // Check all 40 cells for under/over voltage conditions
    for (let i = 1; i <= 40; i++) {
      const cellKey = `cell${i}`;
      const cellValue = parseFloat(batteryMetrics[cellKey]);

      if (!isNaN(cellValue)) {
        if (cellValue < 2.0) {
          messages.push({
            cell: cellKey,
            type: 'Undervoltage',
            code: 2,
            value: `${cellValue.toFixed(2)}V`,
            color: '#ff4444'
          });
        } else if (cellValue > 6.0) {
          messages.push({
            cell: cellKey,
            type: 'Overvoltage',
            code: 4,
            value: `${cellValue.toFixed(2)}V`,
            color: '#ff4444'
          });
        }
      }
    }

    setAlertMessages(messages.length > 0 ? messages : [{ message: 'No Alerts ', color: '#00ff88' }]);
  }, [batteryMetrics]);

  return (
    <div className="alertbox" style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <h4>Alert Notifications</h4>
      <hr />
      {alertMessages.map((alert, index) => (
        <div
          key={index}
          style={{
            color: alert.color || '#00ff88',
            padding: '8px',
            margin: '5px 0',
            borderRadius: '4px',
            backgroundColor: alert.color ? `${alert.color}22` : 'transparent',
            fontSize: '11px'
          }}
        >
          {alert.message || `${alert.cell.toUpperCase()} ${alert.type} (Code ${alert.code}): ${alert.value}`}
        </div>
      ))}
    </div>
  );
};

function RtbatteryMonitoring() {
  const navigate = useNavigate();
  const [batterySOC, setBatterySOC] = useState(100);
  const [notifications, setNotifications] = useState(3);
  const [currentTime] = useState(new Date().toLocaleString());
  const [showMenu, setShowMenu] = useState(false);
  const [showNoDataPopup, setShowNoDataPopup] = useState(false);
  const [batteryMetrics, setBatteryMetrics] = useState(null);
  const [dataStatus, setDataStatus] = useState("loading");
  const [serialError, setSerialError] = useState(null);

  // Handle serial data from Footer
  const handleSerialData = (dataArray, line) => {
    console.log('Received serial data:', { line });
    if (line) {
      try {
        let cleaned = line
          .replace(/\b(ON|OFF)\b/g, '"$1"')
          .replace(/([0-9.]+)\s*[VAWC%]/g, '$1');

        const metrics = JSON.parse(cleaned);
        // Update battery metrics
        const newMetrics = {
          cell1: metrics.cell1 || "--",
          cell2: metrics.cell2 || "--",
          cell3: metrics.cell3 || "--",
          cell4: metrics.cell4 || "--",
          cell5: metrics.cell5 || "--",
          cell6: metrics.cell6 ||"--",
          cell7: metrics.cell7 || "--",
          cell8: metrics.cell8 ||"--",
          cell9: metrics.cell9 || "--",
          cell10: metrics.cell10 || "--",
          cell11: metrics.cell11 || "--",
          cell12: metrics.cell12 || "--",
          cell13: metrics.cell13 || "--",
          cell14: metrics.cell14 || "--",
          cell15: metrics.cell15 || "9",
          cell16: metrics.cell16 || "--",
          cell17: metrics.cell17 || "--",
          cell18: metrics.cell18 || "--",
          cell19: metrics.cell19 || "--",
          cell20: metrics.cell20 || "--",
          cell21: metrics.cell21 || "--",
          cell22: metrics.cell22 || "--",
          cell23: metrics.cell23 || "--",
          cell24: metrics.cell24 || "--",
          cell25: metrics.cell25 || "--",
          cell26: metrics.cell26 || "--",
          cell27: metrics.cell27 || "--",
          cell28: metrics.cell28 || "--",
          cell29: metrics.cell29 || "--",
          cell30: metrics.cell30 || "--",
          cell31: metrics.cell31 || "--",
          cell32: metrics.cell32 || "--",
          cell33: metrics.cell33 || "--",
          cell34: metrics.cell34 || "--",
          cell35: metrics.cell35 || "--",
          cell36: metrics.cell36 || "--",
          cell37: metrics.cell37 || "--",
          cell38: metrics.cell38 || "--",
          cell39: metrics.cell39 || "--",
          cell40: metrics.cell40 || "--",
          totalVoltage: metrics.voltage || "--",
          power: (metrics.voltage || 52.5) * (metrics.current || 2.8) || 150,
          temp1: metrics.temp1 || "--",
          temp2: metrics.temp2 || "--",
          temp3: metrics.temp3 || "--",
          temp4: metrics.temp4 || "--",
          temp5: metrics.temp5 || "--",
          temp6: metrics.temp6 || "--",
          temp7: metrics.temp7 || "--",
          soh: metrics.soh || "--",
          current: metrics.current || "--",
          life: metrics.life || "-",
          mosfetTemp: metrics.mosfettemp || "--",
          ambientTemp: metrics.ambienttemp || "--",
          maxTemp: metrics.maxtemp || "--",
          chargingMOS: metrics.chargingMos === "ON" ? 1 : 0,
          dischargingMOS: metrics.dischargingMos === "ON" ? 0 : 0,
        };

        setBatteryMetrics(newMetrics);
        // Update SOC for LED meter
        setBatterySOC(metrics.soc || 100);
        setNotifications(newMetrics.cell1 < 2.0 || newMetrics.cell1 > 6.0 ? 1 : 0); // Update notifications based on cell1 as example
        setDataStatus("success");
        setShowNoDataPopup(false);
      } catch (err) {
        console.error('Error parsing serial line:', err.message, 'Line:', line);
        setDataStatus("error");
        setSerialError(err.message);
        setShowNoDataPopup(true);
      }
    }
  };

  const handleAlertClick = () => {
    navigate("/functions/BatteryMonitor");
  };

  const handleCloseNoDataPopup = () => {
    setShowNoDataPopup(false);
  };

  const MetricBox = ({ label, value, status, progress }) => (
    <div className="metricBox">
      <strong>{label}:</strong>
      {progress ? (
        <div className="progressWrapper">
          <div className="progressBar" style={{ width: value, backgroundColor: "#4caf50" }} />
          <span>{value}</span>
        </div>
      ) : label === "Charging MOS" || label === "Discharging MOS" ? (
        <label className="toggle-switch">
          <input type="checkbox" checked={status} readOnly />
          <span className="slider round"></span>
        </label>
      ) : (
        <span
          style={{
            color: status === true ? "green" : status === false ? "red" : "inherit",
            fontWeight: status !== undefined ? "bold" : "normal",
          }}
        >
          {value}
        </span>
      )}
    </div>
  );

  return (
    <div className="rtbDashboard">
      {/* Sidebar */}
      <aside className="rtbSidebar">
        <h2 className="navbar1-logo"></h2>
        <AlertBox batteryMetrics={batteryMetrics} />
        <div className="bate">
          <div className={`rtbSidebarBox ${batterySOC < 20 ? "rtbBgRed" : "rtbBgGreen"}`}>
            {batterySOC.toFixed(1)}%
          </div>
        </div>
        <div className="currentTime">
          <h4>{currentTime}</h4>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="rtbMain">
        {/* Navbar Top */}
        <nav className="rtbNavbar">
          <FaBars className="rtbIcon" onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="menuCard">
              <ul>
                <li><button>Board</button></li>
                <li><button>Comm</button></li>
                <li><button onClick={() => window.location.reload()}>Refresh</button></li>
              </ul>
            </div>
          )}
          <ul className="rtbNavLinks">
            <li><Link to="/functions/RtbatteryMonitoring"><FaChartLine /> Status</Link></li>
            <li><Link to="/functions/BatteryCharge"><FaBatteryFull /> Battery Health</Link></li>
            <li><Link to="/functions/HistoricalDataLogs"><FaHistory /> Historical Data</Link></li>
            <li><Link to="/functions/ParameterSetting"><FaSlidersH /> Parameter Setting</Link></li>
            <li><Link to="/functions/ActiveEquilibrium"><FaTools /> ActiveEquilibrium</Link></li>
            <li><Link to="/functions/EngineeringModel"><FaTools /> Engineering Model</Link></li>
            <li><Link to="/components/Realdata"> MQTT</Link></li>
          </ul>
        </nav>

        {/* User Info */}
        <nav className="rtbNavbar2">
          <ul className="rtbNavuser">
            <div className="surya2"></div>
            <div className="surya"><Link to="/components/UserProfile"><FaUserCircle /></Link></div>
            <div className="surya3">
              <div className="rtbNotification" onClick={handleAlertClick}>
                <FaBell />
                {notifications > 0 && <span className="rtbNotificationBadge">{notifications}</span>}
              </div>
            </div>
          </ul>
        </nav>

        {/* Data Sections */}
        {dataStatus === "success" && batteryMetrics ? (
          <div className="dataWrapper">
            {/* Left Panel */}
            <div className="leftPanell">
              <h3>Cell Voltages</h3>
              <div className="gridContainer">
                {["cell1", "cell2", "cell3", "cell4", "cell5", "cell6", "cell7", "cell8", "cell9", "cell10",
                  "cell11", "cell12", "cell13", "cell14", "cell15", "cell16", "cell17", "cell18", "cell19", "cell20",
                  "cell21", "cell22", "cell23", "cell24", "cell25", "cell26", "cell27", "cell28", "cell29", "cell30",
                  "cell31", "cell32", "cell33", "cell34", "cell35", "cell36", "cell37", "cell38", "cell39", "cell40"].map(c => (
                  <div key={c} className="gridBox">
                    <strong><span>{batteryMetrics[c] !== "--" ? `${batteryMetrics[c]} V` : "--"}</span></strong>
                  </div>
                ))}
                <div className="Ccount">
                  <strong>1-10</strong><br />
                  <strong>11-20</strong><br />
                  <strong>21-30</strong><br />
                  <strong>31-40</strong><br />
                </div>
              </div>
            </div>

            {/* Center Panel */}
            <div className="bty1">
              <div className="centerPanel2">
                <h2>Battery Metrics</h2>
                <div className="gridContainer2">
                  <div className="volt">
                    <MetricBox label="Total Volt" value={`${batteryMetrics.totalVoltage} V`} status={true} />
                    <p className="voltage-icon" />
                  </div>
                  <div className="volt">
                    <MetricBox className="SOC" label="SOC" value={`${batterySOC.toFixed(1)} %`} />
                    <p className="soc-icon" />
                  </div>
                  <div className="volt">
                    <MetricBox className="chgMOS" label="Charging MOS" value={batteryMetrics.chargingMOS ? "ON" : "OFF"} status={!!batteryMetrics.chargingMOS} />
                    <p className="chgmos-icon" />
                  </div>
                  <div className="volt">
                    <MetricBox className="power" label="Power" value={`${batteryMetrics.power} W`} />
                    <p className="power-icon" />
                  </div>
                  <div className="volt">
                    <MetricBox className="current" label="Current" value={`${batteryMetrics.current} A`} />
                    <p className="current-icon"/>
                  </div>
                  <div className="volt">
                    <MetricBox className="soh" label="SOH" value={`${batteryMetrics.soh} %`} progress />
                    <p className="soh-icon" />
                  </div>
                  <div className="volt">
                    <MetricBox className="dsgMOS" label="Discharging MOS" value={batteryMetrics.dischargingMOS ? "ON" : "OFF"} status={!!batteryMetrics.dischargingMOS} />
                    <p className="dsgmos-icon" />
                  </div>
                  <div className="volt">
                    <MetricBox className="life" label="Life Cycles" value={batteryMetrics.life} />
                    <p className="life-icon" />
                  </div>
                </div>

                {/* LED Battery Meter */}
                <div className="ledMeterWrapper" style={{ margin: '0', display: 'flex', justifyContent: 'center' }}>
                  <LEDBatteryMeter value={batterySOC} maxValue={100} minValue={0} />
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="rp1">
              <h3>Temperatures</h3>
              <div className="gridContainer3">
                {["temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7"].map(tempKey => (
                  <div key={tempKey} className="gridBox">
                    <strong>
                      <span>
                        {batteryMetrics[tempKey] !== "--" ? `${batteryMetrics[tempKey]} °C` : "--"}
                      </span>
                    </strong>
                  </div>
                ))}
                <div className="Ccount2">
                  <strong>1-4</strong><br /><br />
                  <strong>5-7</strong><br />
                </div>
              </div>
            </div>

            {/* Temperature Summary */}
            <div className="temdata2">
              <label>Max Temp POS: </label><strong>1</strong><br /><br />
              <label>Min Temp POS: </label><strong>7</strong><br /><br />
              <label>Temp Diff: </label><strong>2 °C</strong><br /><br />
              <label>Max Temp: </label><strong>{batteryMetrics.maxTemp !== "--" ? `${batteryMetrics.maxTemp} °C` : "--"}</strong><br /><br />
              <label>Min Temp: </label><strong>{batteryMetrics.ambientTemp !== "--" ? `${batteryMetrics.ambientTemp} °C` : "--"}</strong><br />
            </div>
          </div>
        ) : dataStatus === "loading" ? (
          <div className="loadingMessage">
            <p>Loading battery data...</p>
          </div>
        ) : (
          <div className="loadingMessage">
            <p>No data received yet.</p>
          </div>
        )}

        {/* Footer with Serial Data */}
        <Footer onSerialData={handleSerialData} />

        {/* No Data Popup */}
        {showNoDataPopup && (
          <div className="popup">
            <div className="popup-content">
              <div className="popup-header">
                <h3>Data Unavailable</h3>
                <button className="popup-close" onClick={handleCloseNoDataPopup}><FaTimes /></button>
              </div>
              <p>{serialError || "No Data Available. Please check the connection or try again later."}</p>
              <button className="btn btn-primary" onClick={handleSerialData}>Retry</button>
              <button className="btn btn-primary" onClick={handleCloseNoDataPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RtbatteryMonitoring;