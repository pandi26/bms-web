// let port = null;
// let reader = null;

// // Connect to a serial port with specified baud rate, parity, and optional port
// export async function connectSerial(baudRate, parity, selectedPort = null) {
//   // Validate input parameters
//   const validBaudRates = [9600, 19200, 38400, 57600, 115200, 230400];
//   const validParities = ['none', 'even', 'odd'];
//   if (!validBaudRates.includes(parseInt(baudRate))) {
//     throw new Error('Invalid baud rate. Choose from: ' + validBaudRates.join(', '));
//   }
//   if (!validParities.includes(parity.toLowerCase())) {
//     throw new Error('Invalid parity. Choose from: ' + validParities.join(', '));
//   }

//   // If the selected port is already open and readable, return it
//   if (selectedPort && selectedPort.readable && !selectedPort.readable.locked) {
//     port = selectedPort;
//     return port;
//   }

//   // If another port is open, close it first
//   if (port && port.readable && port !== selectedPort) {
//     await disconnectSerial();
//   }

//   try {
//     // Use provided port or request a new one
//     port = selectedPort || (await navigator.serial.requestPort());
//     // Check if port is already open
//     if (port.readable && !port.readable.locked) {
//       return port;
//     }
//     await port.open({
//       baudRate: parseInt(baudRate),
//       dataBits: 8,
//       stopBits: 1,
//       parity: parity.toLowerCase(),
//       bufferSize: 255,
//     });

//     // Store connection parameters in localStorage
//     const portInfo = port.getInfo();
//     localStorage.setItem(
//       'serialConnectionParams',
//       JSON.stringify({
//         baudRate,
//         parity,
//         usbVendorId: portInfo.usbVendorId,
//         usbProductId: portInfo.usbProductId,
//       })
//     );
//     return port;
//   } catch (err) {
//     port = null;
//     reader = null;
//     let errorMessage = err.message;
//     if (err.name === 'NetworkError') {
//       errorMessage = 'Failed to open serial port. Ensure the device is connected and not in use by another application.';
//     } else if (err.name === 'SecurityError') {
//       errorMessage = 'Permission denied. Please reauthorize the serial port.';
//     }
//     throw new Error(errorMessage);
//   }
// }

// // Check if a serial port is connected and readable
// export function isSerialConnected() {
//   return port !== null && port.readable && !port.readable.locked;
// }

// // Disconnect the serial port and release resources
// export async function disconnectSerial() {
//   await releaseReader();
//   if (port) {
//     try {
//       await port.close();
//     } catch (err) {
//       console.warn('Error closing port:', err.message);
//     }
//     port = null;
//   }
//   localStorage.removeItem('serialConnectionParams');
// }

// // Release the current reader if it exists
// export async function releaseReader() {
//   if (reader) {
//     try {
//       await reader.cancel();
//       await reader.releaseLock();
//     } catch (err) {
//       console.warn('Error releasing reader:', err.message);
//     }
//     reader = null;
//   }
// }

// // Get the current serial port
// export function getSerialPort() {
//   return port;
// }
let port = null;
let reader = null;

// Connect to a serial port with specified baud rate, parity, and optional port
export async function connectSerial(baudRate, parity, selectedPort = null) {
  const validBaudRates = [9600, 19200, 38400, 57600, 115200, 230400];
  const validParities = ['none', 'even', 'odd'];
  if (!validBaudRates.includes(parseInt(baudRate))) {
    throw new Error('Invalid baud rate. Choose from: ' + validBaudRates.join(', '));
  }
  if (!validParities.includes(parity.toLowerCase())) {
    throw new Error('Invalid parity. Choose from: ' + validParities.join(', '));
  }

  // If the selected port is already open and readable, return it
  if (selectedPort && selectedPort.readable && !selectedPort.readable.locked) {
    port = selectedPort;
    return port;
  }

  // If another port is open, close it first
  if (port && port.readable && port !== selectedPort) {
    await disconnectSerial();
  }

  try {
    port = selectedPort || (await navigator.serial.requestPort());
    if (port.readable && !port.readable.locked) {
      return port;
    }
    await port.open({
      baudRate: parseInt(baudRate),
      dataBits: 8,
      stopBits: 1,
      parity: parity.toLowerCase(),
      bufferSize: 255,
    });

    const portInfo = port.getInfo();
    localStorage.setItem(
      'serialConnectionParams',
      JSON.stringify({
        baudRate,
        parity,
        usbVendorId: portInfo.usbVendorId,
        usbProductId: portInfo.usbProductId,
      })
    );
    return port;
  } catch (err) {
    port = null;
    reader = null;
    let errorMessage = err.message;
    if (err.name === 'NetworkError') {
      errorMessage = 'Failed to open serial port. Ensure the device is connected and not in use by another application.';
    } else if (err.name === 'SecurityError') {
      errorMessage = 'Permission denied. Please reauthorize the serial port.';
    }
    throw new Error(errorMessage);
  }
}

// Check if a serial port is connected and readable
export function isSerialConnected() {
  return port !== null && port.readable && !port.readable.locked;
}

// Disconnect the serial port and release resources
export async function disconnectSerial() {
  await releaseReader();
  if (port) {
    try {
      await port.close();
      console.log('Serial port closed');
    } catch (err) {
      console.warn('Error closing port:', err.message);
    }
    port = null;
  }
  localStorage.removeItem('serialConnectionParams');
}

// Release the current reader if it exists
export async function releaseReader() {
  if (reader) {
    try {
      await reader.cancel();
      await reader.releaseLock();
      console.log('Serial reader released in SerialService');
    } catch (err) {
      console.warn('Error releasing reader:', err.message);
    }
    reader = null;
  }
}

// Get the current serial port
export function getSerialPort() {
  return port;
}