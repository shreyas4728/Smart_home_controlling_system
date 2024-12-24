// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [devices, setDevices] = useState({
    lights: { status: 'off' },
    fan: { status: 'off' },
    securityCamera: { status: 'inactive' },
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/devices')
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the devices:", error);
      });
  }, []);

  const handleDeviceControl = (device, action) => {
    axios.post('http://localhost:5000/api/control-device', { device, action })
      .then(response => {
        setDevices(prevDevices => ({
          ...prevDevices,
          [device]: { status: action },
        }));
      })
      .catch(error => {
        console.error("There was an error controlling the device:", error);
      });
  };

  return (
    <div className="App">
      <h1>Smart Home Automation</h1>
      
      <div className="device-control">
        {Object.keys(devices).map(device => (
          <div key={device} className="device">
            <h3>{device.charAt(0).toUpperCase() + device.slice(1)}</h3>
            <p>Status: {devices[device].status}</p>
            <button onClick={() => handleDeviceControl(device, 'on')}>Turn On</button>
            <button onClick={() => handleDeviceControl(device, 'off')}>Turn Off</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
