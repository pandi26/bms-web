    
//   // import React, { useState, useEffect } from 'react';
//   // import PropTypes from 'prop-types';
//   // import '../navbar/styles/footer.css';
//   // import { FiRefreshCw } from 'react-icons/fi';
//   // import { IoClose } from 'react-icons/io5';

//   // const Footer = ({ onSerialData }) => {
//   //   const [showCommPopup, setShowCommPopup] = useState(false);
//   //   const [availablePorts, setAvailablePorts] = useState([]);
//   //   const [selectedPort, setSelectedPort] = useState(null);
//   //   const [baudRate, setBaudRate] = useState('');
//   //   const [parity, setParity] = useState('');
//   //   const [error, setError] = useState(null);
//   //   const [connectionStatus, setConnectionStatus] = useState('Not connected');
//   //   const [serialData, setSerialData] = useState([]);

//   //   // Debug prop on mount and update
//   //   useEffect(() => {
//   //     //console.log('Footer mounted/updated with onSerialData:', typeof onSerialData, onSerialData);
//   //   }, [onSerialData]);

//   //   // Fetch available serial ports when Comm popup opens
//   //   useEffect(() => {
//   //     if (showCommPopup && navigator.serial) {
//   //       const fetchPorts = async () => {
//   //         try {
//   //           const ports = await navigator.serial.getPorts();
//   //           setAvailablePorts(ports);
//   //           if (ports.length > 0) {
//   //             setSelectedPort(ports[0]);
//   //             setError(null);
//   //           } else {
//   //             setError('No serial ports found. Please connect a device.');
//   //           }
//   //         } catch (err) {
//   //           setError(`Error fetching ports: ${err.message}`);
//   //         }
//   //       };
//   //       fetchPorts();
//   //     }
//   //   }, [showCommPopup]);

//   //   // Read data from the serial port
//   //   const readSerial = async (serialPort) => {
//   //     if (!serialPort.readable) {
//   //       setError('Serial port is not readable');
//   //       setConnectionStatus('Connection failed');
//   //       return;
//   //     }

//   //     let reader;
//   //     let buffer = '';

//   //     try {
//   //       reader = serialPort.readable.getReader();
//   //       while (true) {
//   //         const { value, done } = await reader.read();
//   //         if (done) {
//   //           console.log('Reader done, connection closed');
//   //           setConnectionStatus('Not connected');
//   //           reader.releaseLock();
//   //           break;
//   //         }
//   //         if (value) {
//   //           const text = new TextDecoder().decode(value); // Default UTF-8 decoding
//   //           //console.log('Received data:', text); // Debug received data
//   //           buffer += text;
//   //           const lines = buffer.split(/[\r\n]+/);
//   //           buffer = lines.pop(); // Keep incomplete line in buffer

//   //           lines.forEach(line => {
//   //             if (line.trim()) {
//   //               const timestamp = new Date().toLocaleString('en-IN', {
//   //                 day: '2-digit',
//   //                 month: '2-digit',
//   //                 year: 'numeric',
//   //                 hour: '2-digit',
//   //                 minute: '2-digit',
//   //                 second: '2-digit',
//   //                 hour12: false,
//   //               });
//   //               setSerialData(prev => {
//   //                 const newData = [...prev, { timestamp, raw: line }].slice(-50);
//   //                 if (typeof onSerialData === 'function') {
//   //                   onSerialData(newData, line); // Pass raw line data
//   //                 } else {
//   //                   console.log('onSerialData is not a function, skipping callback. Received:', line);
//   //                 }
//   //                 return newData;
//   //               });
//   //             } else {
//   //               console.log('Skipping empty line:', line);
//   //             }
//   //           });
//   //         }
//   //       }
//   //     } catch (err) {
//   //       console.error('Serial read error:', err);
//   //       if (err.name === 'BreakError') {
//   //         setError('Serial connection interrupted (Break received). Please check the device connection.');
//   //       } else {
//   //         setError(`Error reading serial data: ${err.message}`);
//   //       }
//   //       setConnectionStatus('Connection failed');
//   //       // Attempt to close the port on error
//   //       try {
//   //         if (serialPort.readable) {
//   //           reader.releaseLock();
//   //           await serialPort.close();
//   //           console.log('Serial port closed due to error');
//   //         }
//   //       } catch (closeErr) {
//   //         console.error('Error closing serial port:', closeErr);
//   //       }
//   //     } finally {
//   //       if (reader) {
//   //         reader.releaseLock();
//   //       }
//   //     }
//   //   };

//   //   const connectSerial = async () => {
//   //     if (!selectedPort) {
//   //       setError('Please select a serial port.');
//   //       return;
//   //     }
//   //     if (!baudRate) {
//   //       setError('Please select a baud rate.');
//   //       return;
//   //     }
//   //     if (!parity) {
//   //       setError('Please select a parity option.');
//   //       return;
//   //     }
//   //     try {
//   //       // Check if port is already open
//   //       if (selectedPort.readable) {
//   //         console.log('Port already open, closing first');
//   //         await selectedPort.close();
//   //       }
//   //       await selectedPort.open({
//   //         baudRate: parseInt(baudRate),
//   //         dataBits: 8,
//   //         stopBits: 1,
//   //         parity: parity.toLowerCase(),
//   //         bufferSize: 255,
//   //       });
//   //       setConnectionStatus('Connected to UART');
//   //       setError(null);
//   //       setShowCommPopup(false);
//   //       readSerial(selectedPort);
//   //     } catch (err) {
//   //       setError(`Failed to connect to USB serial port: ${err.message}`);
//   //       setConnectionStatus('Connection failed');
//   //     }
//   //   };

//   //   // Handle Comm popup submission
//   //   const handleCommSubmit = async (e) => {
//   //     e.preventDefault();
//   //     await connectSerial();
//   //   };

//   //   // Toggle Comm popup visibility
//   //   const toggleCommPopup = () => {
//   //     setShowCommPopup(!showCommPopup);
//   //     if (showCommPopup) {
//   //       setError(null);
//   //     }
//   //   };

//   //   // Refresh page content and enter fullscreen
//   //   const handleRefresh = () => {
//   //     window.location.reload();
//   //     document.documentElement.requestFullscreen().catch(err => console.error('Fullscreen error:', err));
//   //   };

//   //   // Clean up on component unmount
//   //   useEffect(() => {
//   //     return () => {
//   //       if (selectedPort && selectedPort.readable) {
//   //         selectedPort.close().catch(err => console.error('Error closing port on unmount:', err));
//   //       }
//   //     };
//   //   }, [selectedPort]);

//   //   return (
//   //     <footer className="app-footer">
//   //       <ul className="flex-container">
//   //         <li className="flex-item1">
//   //           <h5>Battery ID</h5>
//   //           <select className="battery-select">
//   //             <option value="">Select</option>
//   //             <option value="1">Battery 1</option>
//   //             <option value="2">Battery 2</option>
//   //           </select>
//   //         </li>

//   //         <li className="flex-item2">
//   //           <button className="comm-btn" onClick={toggleCommPopup}>
//   //             <h5>Comm</h5>
//   //           </button>
//   //           <span>{connectionStatus}</span>
//   //         </li>

//   //         <li className="flex-item3" onClick={handleRefresh} style={{ cursor: 'pointer' }}>
//   //           <h5 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//   //             Refresh <FiRefreshCw />
//   //           </h5>
//   //         </li>
//   //       </ul>

//   //       {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//   //       {showCommPopup && (
//   //         <>
//   //           <div className="blur-overlay" onClick={toggleCommPopup}></div>
//   //           <div className="comm-popup">
//   //             <div className="popup-content">
//   //               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//   //                 <IoClose
//   //                   style={{ fontSize: '20px', cursor: 'pointer' }}
//   //                   onClick={toggleCommPopup}
//   //                 />
//   //               </div>

//   //               <h4>Communication Settings</h4>

//   //               <form onSubmit={handleCommSubmit}>
//   //                 <label>Port Number:</label>
//   //                 {availablePorts.length > 0 ? (
//   //                   <select
//   //                     value={selectedPort ? availablePorts.indexOf(selectedPort) : ''}
//   //                     onChange={(e) => {
//   //                       const portIndex = parseInt(e.target.value);
//   //                       setSelectedPort(availablePorts[portIndex]);
//   //                     }}
//   //                   >
//   //                     <option value="">Select</option>
//   //                     {availablePorts.map((port, index) => (
//   //                       <option key={index} value={index}>
//   //                         Port {index + 1} {port.getInfo().usbVendorId ? `(USB VID: ${port.getInfo().usbVendorId})` : ''}
//   //                       </option>
//   //                     ))}
//   //                   </select>
//   //                 ) : (
//   //                   <p style={{ color: 'red' }}>No ports available</p>
//   //                 )}

//   //                 <label>Baud Rate:</label>
//   //                 <select value={baudRate} onChange={(e) => setBaudRate(e.target.value)}>
//   //                   <option value="">Select</option>
//   //                   <option value="9600">9600</option>
//   //                   <option value="19200">19200</option>
//   //                   <option value="38400">38400</option>
//   //                   <option value="57600">57600</option>
//   //                   <option value="115200">115200</option>
//   //                   <option value="230400">230400</option>
//   //                 </select>

//   //                 <label>Parity:</label>
//   //                 <select value={parity} onChange={(e) => setParity(e.target.value)}>
//   //                   <option value="">Select</option>
//   //                   <option value="None">None</option>
//   //                   <option value="Even">Even</option>
//   //                   <option value="Odd">Odd</option>
//   //                 </select>

//   //                 {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}

//   //                 <div style={{ marginTop: '12px' }}>
//   //                   <button type="submit">Connect</button>
//   //                   <button type="button" onClick={toggleCommPopup} style={{ marginLeft: '8px' }}>
//   //                     Close
//   //                   </button>
//   //                 </div>
//   //               </form>
//   //             </div>
//   //           </div>
//   //         </>
//   //       )}
//   //     </footer>
//   //   );
//   // };

//   // Footer.propTypes = {
//   //   onSerialData: PropTypes.func,
//   // };

//   // export default Footer;



// import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import './styles/footer.css';
// import { FiRefreshCw } from 'react-icons/fi';
// import { IoClose } from 'react-icons/io5';
// import { connectSerial, disconnectSerial, isSerialConnected, getSerialPort } from './serialService';

// const Footer = ({ onSerialData }) => {
//   const [showCommPopup, setShowCommPopup] = useState(false);
//   const [availablePorts, setAvailablePorts] = useState([]);
//   const [selectedPort, setSelectedPort] = useState(null);
//   const [baudRate, setBaudRate] = useState('');
//   const [parity, setParity] = useState('');
//   const [error, setError] = useState(null);
//   const [connectionStatus, setConnectionStatus] = useState('Not connected');
//   const [serialData, setSerialData] = useState([]);
//   const [pendingData, setPendingData] = useState([]);
//   const isReadingRef = useRef(false);

//   // Auto-reconnect on mount if parameters are stored
//   useEffect(() => {
//     const attemptAutoReconnect = async () => {
//       if (isSerialConnected() && !isReadingRef.current) {
//         console.log('Existing connection found, reusing port:', getSerialPort().getInfo());
//         setConnectionStatus('Connected to UART');
//         const currentPort = getSerialPort();
//         setSelectedPort(currentPort);
//         readSerial(currentPort);
//         return;
//       }

//       // Check for stored connection parameters
//       const storedParams = localStorage.getItem('serialConnectionParams');
//       if (storedParams && navigator.serial) {
//         try {
//           const { baudRate, parity, usbVendorId, usbProductId } = JSON.parse(storedParams);
//           console.log('Stored params:', { baudRate, parity, usbVendorId, usbProductId });
//           const ports = await navigator.serial.getPorts();
//           console.log('Available ports:', ports.map((p) => p.getInfo()));
//           setAvailablePorts(ports);

//           // Find the port matching stored usbVendorId and usbProductId
//           const matchingPort = ports.find((port) => {
//             const info = port.getInfo();
//             return info.usbVendorId === usbVendorId && info.usbProductId === usbProductId;
//           });

//           if (matchingPort) {
//             setSelectedPort(matchingPort);
//             setBaudRate(baudRate);
//             setParity(parity);
//             try {
//               const port = await connectSerial(baudRate, parity, matchingPort);
//               setConnectionStatus('Connected to UART (Auto-reconnected)');
//               setError(null);
//               setSelectedPort(port);
//               readSerial(port);
//             } catch (err) {
//               console.error('Auto-reconnect error:', err);
//               setError(`${err.message}`);
//               setConnectionStatus('Not connected');
//               setShowCommPopup(true); // Prompt user to select port manually
//               localStorage.removeItem('serialConnectionParams'); // Clear stale params
//               if (typeof onSerialData === 'function') {
//                 onSerialData(serialData, null, err.message);
//               }
//             }
//           } else {
//             setError('Auto-reconnect failed: Stored port not found. Please select a port.');
//             setConnectionStatus('Not connected');
//             setShowCommPopup(true); // Prompt user to select port
//             localStorage.removeItem('serialConnectionParams'); // Clear stale params
//             if (typeof onSerialData === 'function') {
//               onSerialData(serialData, null, 'Stored port not found');
//             }
//           }
//         } catch (err) {
//           console.error('Error during auto-reconnect:', err);
//           setError(`Error during auto-reconnect: ${err.message}`);
//           setConnectionStatus('Not connected');
//           setShowCommPopup(true); // Prompt user to select port
//           if (typeof onSerialData === 'function') {
//             onSerialData(serialData, null, err.message);
//           }
//         }
//       } else {
//         setConnectionStatus('Not connected');
//       }
//     };

//     attemptAutoReconnect();

//     // Cleanup on unmount
//     return () => {
//       disconnectSerial().catch((err) => console.error('Error closing port on unmount:', err));
//     };
//   }, [onSerialData, serialData]);

//   // Fetch available serial ports when Comm popup opens
//   useEffect(() => {
//     if (showCommPopup && navigator.serial) {
//       const fetchPorts = async () => {
//         try {
//           const ports = await navigator.serial.getPorts();
//           setAvailablePorts(ports);
//           if (ports.length > 0 && !selectedPort) {
//             setSelectedPort(ports[0]);
//             setError(null);
//           } else if (ports.length === 0) {
//             setError('No serial ports found. Please connect a device.');
//           }
//         } catch (err) {
//           setError(`Error fetching ports: ${err.message}`);
//           if (typeof onSerialData === 'function') {
//             onSerialData(serialData, null, `Error fetching ports: ${err.message}`);
//           }
//         }
//       };
//       fetchPorts();
//     }
//   }, [showCommPopup, selectedPort, serialData, onSerialData]);

//   // Process pending serial data
//   useEffect(() => {
//     if (pendingData.length > 0) {
//       const { line, timestamp } = pendingData[pendingData.length - 1];
//       if (!line) {
//         console.warn('Skipping invalid line:', line);
//         setPendingData((prev) => prev.slice(0, -1));
//         return;
//       }
//       setSerialData((prev) => {
//         const newData = [...prev, { timestamp, raw: line }].slice(-50);
//         if (typeof onSerialData === 'function') {
//           onSerialData(newData, line, null);
//         }
//         return newData;
//       });
//       setPendingData((prev) => prev.slice(0, -1));
//     }
//   }, [pendingData, onSerialData]);

//   // Read data from the serial port
//   const readSerial = async (serialPort) => {
//     if (!serialPort || !serialPort.readable) {
//       setError('Serial port is not readable');
//       setConnectionStatus('Connection failed');
//       if (typeof onSerialData === 'function') {
//         onSerialData(serialData, null, 'Serial port is not readable');
//       }
//       await disconnectSerial();
//       return;
//     }

//     if (isReadingRef.current) {
//       console.log('readSerial already in progress, skipping');
//       return;
//     }

//     isReadingRef.current = true;
//     let reader;
//     let buffer = '';

//     try {
//       reader = serialPort.readable.getReader();
//       console.log('Reader acquired for port:', serialPort.getInfo());
//       while (isReadingRef.current) {
//         if (!serialPort.readable) {
//           throw new Error('Serial port became unreadable');
//         }
//         const { value, done } = await reader.read();
//         if (done) {
//           console.log('Reader done, connection closed');
//           setConnectionStatus('Not connected');
//           break;
//         }
//         if (value) {
//           const text = new TextDecoder().decode(value);
//           buffer += text;
//           const lines = buffer.split(/[\r\n]+/);
//           buffer = lines.pop();

//           lines.forEach((line) => {
//             if (line.trim()) {
//               const timestamp = new Date().toLocaleString('en-IN', {
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//                 hour12: false,
//               });
//               setPendingData((prev) => [...prev, { line, timestamp }]);
//             }
//           });
//         }
//       }
//     } catch (err) {
//       console.error('Serial read error:', err);
//       const errorMsg =
//         err.name === 'BreakError'
//           ? 'Serial connection interrupted (Break received). Please check the device connection.'
//           : `Error reading serial data: ${err.message}`;
//       setError(errorMsg);
//       setConnectionStatus('Connection failed');
//       if (typeof onSerialData === 'function') {
//         onSerialData(serialData, null, errorMsg);
//       }
//     } finally {
//       if (reader) {
//         try {
//           await reader.cancel();
//           await reader.releaseLock();
//           console.log('Reader released in readSerial');
//         } catch (err) {
//           console.error('Error releasing reader lock:', err);
//         }
//       }
//       isReadingRef.current = false;
//       await disconnectSerial();
//     }
//   };

//   // Connect to the selected serial port
//   const connectSerialPort = async () => {
//     if (!selectedPort) {
//       setError('Please select a serial port.');
//       return;
//     }
//     if (!baudRate) {
//       setError('Please select a baud rate.');
//       return;
//     }
//     if (!parity) {
//       setError('Please select a parity option.');
//       return;
//     }

//     try {
//       await disconnectSerial();
//       const port = await connectSerial(baudRate, parity, selectedPort);
//       setConnectionStatus('Connected to UART');
//       setError(null);
//       setShowCommPopup(false);
//       setSelectedPort(port);
//       readSerial(port);
//     } catch (err) {
//       setError(err.message);
//       setConnectionStatus('Connection failed');
//       if (typeof onSerialData === 'function') {
//         onSerialData(serialData, null, err.message);
//       }
//     }
//   };

//   const handleCommSubmit = async (e) => {
//     e.preventDefault();
//     await connectSerialPort();
//   };

//   const toggleCommPopup = () => {
//     setShowCommPopup(!showCommPopup);
//     if (showCommPopup) {
//       setError(null);
//     }
//   };

//   const handleRefresh = async () => {
//     await disconnectSerial();
//     if (selectedPort && baudRate && parity) {
//       localStorage.setItem(
//         'serialConnectionParams',
//         JSON.stringify({
//           baudRate,
//           parity,
//           usbVendorId: selectedPort.getInfo().usbVendorId,
//           usbProductId: selectedPort.getInfo().usbProductId,
//         })
//       );
//     }
//     window.location.reload();
//   };

//   return (
//     <footer className="app-footer">
//       <ul className="flex-container">
//         <li className="flex-item1">
//           <h5>Battery ID</h5>
//           <select className="battery-select">
//             <option value="">Select</option>
//             <option value="1">Battery 1</option>
//             <option value="2">Battery 2</option>
//           </select>
//         </li>
//         <li className="flex-item2">
//           <button className="comm-btn" onClick={toggleCommPopup}>
//             <h5>Comm</h5>
//           </button>
//           <span>{connectionStatus}</span>
//         </li>
//         <li className="flex-item3" onClick={handleRefresh} style={{ cursor: 'pointer' }}>
//           <h5 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             Refresh <FiRefreshCw />
//           </h5>
//         </li>
//       </ul>
//       {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//       {showCommPopup && (
//         <>
//           <div className="blur-overlay" onClick={toggleCommPopup}></div>
//           <div className="comm-popup">
//             <div className="popup-content">
//               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                 <IoClose style={{ fontSize: '20px', cursor: 'pointer' }} onClick={toggleCommPopup} />
//               </div>
//               <h4>Communication Settings</h4>
//               <form onSubmit={handleCommSubmit}>
//                 <label>Port Number:</label>
//                 {availablePorts.length > 0 ? (
//                   <select
//                     value={selectedPort ? availablePorts.indexOf(selectedPort) : ''}
//                     onChange={(e) => {
//                       const portIndex = parseInt(e.target.value);
//                       setSelectedPort(availablePorts[portIndex] || null);
//                     }}
//                   >
//                     <option value="">Select</option>
//                     {availablePorts.map((port, index) => (
//                       <option key={index} value={index}>
//                         Port {index + 1}{' '}
//                         {port.getInfo().usbVendorId ? `(USB VID: ${port.getInfo().usbVendorId})` : ''}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <p style={{ color: 'red' }}>No ports available</p>
//                 )}
//                 <label>Baud Rate:</label>
//                 <select value={baudRate} onChange={(e) => setBaudRate(e.target.value)}>
//                   <option value="">Select</option>
//                   <option value="9600">9600</option>
//                   <option value="19200">19200</option>
//                   <option value="38400">38400</option>
//                   <option value="57600">57600</option>
//                   <option value="115200">115200</option>
//                   <option value="230400">230400</option>
//                 </select>
//                 <label>Parity:</label>
//                 <select value={parity} onChange={(e) => setParity(e.target.value)}>
//                   <option value="">Select</option>
//                   <option value="none">None</option>
//                   <option value="even">Even</option>
//                   <option value="odd">Odd</option>
//                 </select>
//                 {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
//                 <div style={{ marginTop: '12px' }}>
//                   <button type="submit">Connect</button>
//                   <button type="button" onClick={toggleCommPopup} style={{ marginLeft: '8px' }}>
//                     Close
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </footer>
//   );
// };

// Footer.propTypes = {
//   onSerialData: PropTypes.func,
// };

// Footer.defaultProps = {
//   onSerialData: () => {},
// };

// export default Footer;

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles/footer.css';
import { FiRefreshCw } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { connectSerial, disconnectSerial, isSerialConnected, getSerialPort, releaseReader } from './SerialService';

const Footer = ({ onSerialData }) => {
  const [showCommPopup, setShowCommPopup] = useState(false);
  const [availablePorts, setAvailablePorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);
  const [baudRate, setBaudRate] = useState('');
  const [parity, setParity] = useState('');
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Not connected');
  const [serialData, setSerialData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const isReadingRef = useRef(false);
  const readerRef = useRef(null);

  // Auto-reconnect on mount if parameters are stored
  useEffect(() => {
    const attemptAutoReconnect = async () => {
      if (isSerialConnected() && !isReadingRef.current) {
        const currentPort = getSerialPort();
        setSelectedPort(currentPort);
        setConnectionStatus('Connected to UART');
        await releaseReader(); // Ensure no locked reader
        readSerial(currentPort);
        return;
      }

      const storedParams = localStorage.getItem('serialConnectionParams');
      if (storedParams && navigator.serial) {
        try {
          const { baudRate, parity, usbVendorId, usbProductId } = JSON.parse(storedParams);
          const ports = await navigator.serial.getPorts();
          setAvailablePorts(ports);

          let matchingPort = ports.find((port) => {
            const info = port.getInfo();
            return info.usbVendorId === usbVendorId && info.usbProductId === usbProductId;
          });

          if (!matchingPort && ports.length === 1) {
            matchingPort = ports[0];
          }

          if (matchingPort) {
            setSelectedPort(matchingPort);
            setBaudRate(baudRate);
            setParity(parity);
            try {
              const port = await connectSerial(baudRate, parity, matchingPort);
              setConnectionStatus('Connected to UART (Auto-reconnected)');
              setError(null);
              setSelectedPort(port);
              readSerial(port);
            } catch (err) {
              if (err.message.includes('already open')) {
                setConnectionStatus('Connected to UART (Port already open)');
                setError(null);
                await releaseReader();
                readSerial(matchingPort);
              } else {
                throw err;
              }
            }
          } else {
            setError('Auto-reconnect failed: Stored port not found. Please select a port.');
            setConnectionStatus('Not connected');
            setShowCommPopup(true);
            localStorage.removeItem('serialConnectionParams');
            if (typeof onSerialData === 'function') {
              onSerialData([], null, 'Stored port not found');
            }
          }
        } catch (err) {
          setError(`Error during auto-reconnect: ${err.message}`);
          setConnectionStatus('Not connected');
          setShowCommPopup(true);
          if (typeof onSerialData === 'function') {
            onSerialData([], null, err.message);
          }
        }
      } else {
        setConnectionStatus('Not connected');
        setShowCommPopup(true);
      }
    };

    attemptAutoReconnect();

    return () => {
      isReadingRef.current = false;
      // Safely clean up reader
      if (readerRef.current && typeof readerRef.current.cancel === 'function') {
        try {
          readerRef.current.cancel().catch((err) => console.warn('Error canceling reader:', err.message));
          readerRef.current.releaseLock().catch((err) => console.warn('Error releasing reader lock:', err.message));
        } catch (err) {
          console.warn('Error in reader cleanup:', err.message);
        }
        readerRef.current = null;
      }
    };
  }, [onSerialData]);

  // Fetch available serial ports when Comm popup opens
  useEffect(() => {
    if (showCommPopup && navigator.serial) {
      const fetchPorts = async () => {
        try {
          const ports = await navigator.serial.getPorts();
          setAvailablePorts(ports);
          if (ports.length > 0 && !selectedPort) {
            setSelectedPort(ports[0]);
            setError(null);
          } else if (ports.length === 0) {
            setError('No serial ports found. Please connect a device.');
          }
        } catch (err) {
          setError(`Error fetching ports: ${err.message}`);
          if (typeof onSerialData === 'function') {
            onSerialData([], null, `Error fetching ports: ${err.message}`);
          }
        }
      };
      fetchPorts();
    }
  }, [showCommPopup, selectedPort, onSerialData]);

  // Process pending serial data
  useEffect(() => {
    if (pendingData.length > 0) {
      const { line, timestamp } = pendingData[0];
      if (!line || !line.trim()) {
        setPendingData((prev) => prev.slice(1));
        return;
      }
      setSerialData((prev) => {
        const newData = [...prev, { timestamp, raw: line }].slice(-50);
        if (typeof onSerialData === 'function') {
          onSerialData(newData, line, null);
        }
        return newData;
      });
      setPendingData((prev) => prev.slice(1));
    }
  }, [pendingData, onSerialData]);

  // Read data from the serial port
  const readSerial = async (serialPort) => {
    if (!serialPort || !serialPort.readable) {
      setError('Serial port is not readable');
      setConnectionStatus('Connection failed');
      if (typeof onSerialData === 'function') {
        onSerialData([], null, 'Serial port is not readable');
      }
      await disconnectSerial();
      return;
    }

    if (isReadingRef.current) {
      console.log('Serial reading already in progress');
      return;
    }

    if (serialPort.readable.locked) {
      console.log('Readable stream is locked. Attempting to release.');
      await releaseReader();
      if (serialPort.readable.locked) {
        setError('Failed to release locked stream. Please reconnect.');
        setConnectionStatus('Connection failed');
        if (typeof onSerialData === 'function') {
          onSerialData([], null, 'Readable stream is locked');
        }
        return;
      }
    }

    isReadingRef.current = true;
    let buffer = '';

    try {
      readerRef.current = serialPort.readable.getReader();
      console.log('Serial reader created');
      while (isReadingRef.current) {
        if (!serialPort.readable) {
          throw new Error('Serial port became unreadable');
        }
        const { value, done } = await readerRef.current.read();
        if (done) {
          setConnectionStatus('Not connected');
          console.log('Serial reader done');
          break;
        }
        if (value) {
          const text = new TextDecoder().decode(value);
          buffer += text;
          const lines = buffer.split(/[\r\n]+/);
          buffer = lines.pop() || '';

          lines.forEach((line) => {
            if (line.trim()) {
              const timestamp = new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              });
              setPendingData((prev) => [...prev, { line, timestamp }]);
            }
          });
        }
      }
    } catch (err) {
      const errorMsg =
        err.message.includes('getReader') && err.message.includes('locked')
          ? 'Readable stream is locked. Please reconnect the device or select a different port.'
          : err.name === 'BreakError'
          ? 'Serial connection interrupted. Please check the device connection.'
          : `Error reading serial data: ${err.message}`;
      setError(errorMsg);
      setConnectionStatus('Connection failed');
      if (typeof onSerialData === 'function') {
        onSerialData([], null, errorMsg);
      }
      console.error('Serial read error:', err);
    } finally {
      if (readerRef.current && typeof readerRef.current.cancel === 'function') {
        try {
          await readerRef.current.cancel();
          await readerRef.current.releaseLock();
          console.log('Serial reader released');
        } catch (err) {
          console.warn('Error releasing reader:', err.message);
        }
        readerRef.current = null;
      }
      isReadingRef.current = false;
    }
  };

  // Connect to the selected serial port
  const connectSerialPort = async () => {
    if (!selectedPort) {
      setError('Please select a serial port.');
      return;
    }
    if (!baudRate) {
      setError('Please select a baud rate.');
      return;
    }
    if (!parity) {
      setError('Please select a parity option.');
      return;
    }

    try {
      await releaseReader(); // Ensure no locked reader before connecting
      const port = await connectSerial(baudRate, parity, selectedPort);
      setConnectionStatus('Connected to UART');
      setError(null);
      setShowCommPopup(false);
      setSelectedPort(port);
      readSerial(port);
    } catch (err) {
      if (err.message.includes('already open')) {
        setConnectionStatus('Connected to UART (Port already open)');
        setError(null);
        setShowCommPopup(false);
        await releaseReader();
        readSerial(selectedPort);
      } else {
        setError(err.message);
        setConnectionStatus('Connection failed');
        if (typeof onSerialData === 'function') {
          onSerialData([], null, err.message);
        }
      }
    }
  };

  const handleCommSubmit = async (e) => {
    e.preventDefault();
    await connectSerialPort();
  };

  const toggleCommPopup = () => {
    setShowCommPopup(!showCommPopup);
    if (showCommPopup) {
      setError(null);
    }
  };

  const handleRefresh = async () => {
    isReadingRef.current = false;
    if (readerRef.current && typeof readerRef.current.cancel === 'function') {
      try {
        await readerRef.current.cancel();
        await readerRef.current.releaseLock();
        console.log('Serial reader released on refresh');
      } catch (err) {
        console.warn('Error releasing reader on refresh:', err.message);
      }
      readerRef.current = null;
    }
    if (selectedPort && baudRate && parity) {
      localStorage.setItem(
        'serialConnectionParams',
        JSON.stringify({
          baudRate,
          parity,
          usbVendorId: selectedPort.getInfo().usbVendorId,
          usbProductId: selectedPort.getInfo().usbProductId,
        })
      );
    }
    window.location.reload();
  };

  return (
    <footer className="app-footer">
      <ul className="flex-container">
        <li className="flex-item1">
          <h5>Battery ID</h5>
          <select className="battery-select">
            <option value="">Select</option>
            <option value="1">Battery 1</option>
            <option value="2">Battery 2</option>
          </select>
        </li>
        <li className="flex-item2">
          <button className="comm-btn" onClick={toggleCommPopup}>
            <h5>Comm</h5>
          </button>
          <span>{connectionStatus}</span>
        </li>
        <li className="flex-item3" onClick={handleRefresh} style={{ cursor: 'pointer' }}>
          <h5 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Refresh <FiRefreshCw />
          </h5>
        </li>
      </ul>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {showCommPopup && (
        <>
          <div className="blur-overlay" onClick={toggleCommPopup}></div>
          <div className="comm-popup">
            <div className="popup-content">
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IoClose style={{ fontSize: '20px', cursor: 'pointer' }} onClick={toggleCommPopup} />
              </div>
              <h4>Communication Settings</h4>
              <form onSubmit={handleCommSubmit}>
                <label>Port Number:</label>
                {availablePorts.length > 0 ? (
                  <select
                    value={selectedPort ? availablePorts.indexOf(selectedPort) : ''}
                    onChange={(e) => {
                      const portIndex = parseInt(e.target.value);
                      setSelectedPort(availablePorts[portIndex] || null);
                    }}
                  >
                    <option value="">Select</option>
                    {availablePorts.map((port, index) => (
                      <option key={index} value={index}>
                        Port {index + 1}{' '}
                        {port.getInfo().usbVendorId ? `(USB VID: ${port.getInfo().usbVendorId})` : ''}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p style={{ color: 'red' }}>No ports available</p>
                )}
                <label>Baud Rate:</label>
                <select value={baudRate} onChange={(e) => setBaudRate(e.target.value)}>
                  <option value="">Select</option>
                  <option value="9600">9600</option>
                  <option value="19200">19200</option>
                  <option value="38400">38400</option>
                  <option value="57600">57600</option>
                  <option value="115200">115200</option>
                  <option value="230400">230400</option>
                </select>
                <label>Parity:</label>
                <select value={parity} onChange={(e) => setParity(e.target.value)}>
                  <option value="">Select</option>
                  <option value="none">None</option>
                  <option value="even">Even</option>
                  <option value="odd">Odd</option>
                </select>
                {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
                <div style={{ marginTop: '12px' }}>
                  <button type="submit">Connect</button>
                  <button type="button" onClick={toggleCommPopup} style={{ marginLeft: '8px' }}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </footer>
  );
};

Footer.propTypes = {
  onSerialData: PropTypes.func,
};

Footer.defaultProps = {
  onSerialData: () => {},
};

export default Footer;