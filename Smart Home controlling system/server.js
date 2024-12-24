// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock data for smart home devices
let devices = {
  lights: { status: 'off' },
  fan: { status: 'off' },
  securityCamera: { status: 'inactive' },
};

// Control devices
app.post('/api/control-device', (req, res) => {
  const { device, action } = req.body;
  if (devices[device]) {
    devices[device].status = action;
    res.json({ success: true, device: devices[device] });
  } else {
    res.status(400).json({ success: false, message: 'Device not found' });
  }
});

// Get status of all devices
app.get('/api/devices', (req, res) => {
  res.json(devices);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
