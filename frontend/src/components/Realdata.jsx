import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import './RtbatteryMonitoring.css';

function Realdata() {
  const [batteryData, setBatteryData] = useState([]);
  const [clientRef, setClientRef] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const options = {
      protocol: 'wss',
      host: '17df3ae464af44dabae01a271cfe6598.s1.eu.hivemq.cloud',
      port: 8884,
      path: '/mqtt',
      username: 'Harshini_',
      password: 'Harshini@21ee',
      rejectUnauthorized: false,
    };

    const client = mqtt.connect(options);
    setClientRef(client);

    client.on('connect', () => {
      console.log('Connected to HiveMQ MQTT Broker');
      setIsConnected(true);

      client.subscribe('esp32/battery', (err) => {
        if (err) console.error('Subscription error:', err);
      });
    });

    client.on('message', (topic, message) => {
      try {
        const parsed = JSON.parse(message.toString());
        setBatteryData((prev) => [parsed, ...prev.slice(0, 89)]);
      } catch (error) {
        console.error('Message parse error:', error);
      }
    });

    client.on('error', (err) => {
      console.error('MQTT error:', err);
    });

    return () => {
      if (client.connected) {
        client.end(true, () => {
          console.log('Disconnected on unmount');
        });
      }
    };
  }, []);

  const handleStart = () => {
    if (clientRef && clientRef.connected) {
      const startMessage = "start";
      clientRef.publish("esp32/control", startMessage, {}, (err) => {
        if (err) {
          console.error("Failed to publish start command", err);
        } else {
          console.log("Start command sent to hardware.");
        }
      });
    }
  };

    const handleLedon = () => {
    if (clientRef && clientRef.connected) {
      const startMessage = "led_on";
      clientRef.publish("esp32/control", startMessage, {}, (err) => {
        if (err) {
          console.error("Failed to publish start command", err);
        } else {
          console.log("Start command sent to hardware.");
        }
      });
    }
  };


    const handleLedoff = () => {
    if (clientRef && clientRef.connected) {
      const startMessage = "start";
      clientRef.publish("esp32/control", startMessage, {}, (err) => {
        if (err) {
          console.error("Failed to publish start command", err);
        } else {
          console.log("Start command sent to hardware.");
        }
      });
    }
  };
  const handleStop = () => {
    if (clientRef && clientRef.connected) {
      const stopMessage = "stop";
      clientRef.publish("esp32/control", stopMessage, {}, (err) => {
        if (err) {
          console.error("Failed to publish stop command", err);
        } else {
          console.log("Stop command sent to hardware.");
        }
      });
    }
  };

  return (
    <div className="battery-monitoring-container">
      <h2 className="monitoring-title">Real-Time Battery Monitoring</h2>
      <div className="connection-status">
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </div>

      {isConnected && (
        <div className="button-group">
          <button className="control-button start-button" onClick={handleStart}>
            <svg className="button-icon" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Monitoring
          </button>
          <button className="control-button stop-button" onClick={handleStop}>
            <svg className="button-icon" viewBox="0 0 24 24">
              <rect width="14" height="14" x="5" y="5" />
            </svg>
            Stop Monitoring
          </button>
        </div>
      )}

      <div className="battery-grid">
        {batteryData.map((data, index) => (
          <div key={index} className="battery-card">
            <div className="card-header">Battery #{index + 1}</div>
            <div className="card-content">
              <div className="data-point">
                <span className="data-label">Cell 1:</span>
                <span className="data-value">{data.cell1} V</span>
              </div>
              <div className="data-point">
                <span className="data-label">Cell 2:</span>
                <span className="data-value">{data.cell2} °C</span>
              </div>
              <div className="data-point">
                <span className="data-label">Timestamp:</span>
                <span className="data-value">
                  {new Date(data.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Realdata;