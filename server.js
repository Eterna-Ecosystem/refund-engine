const express = require('express');
const app = express();

// existing middleware and routes...

// Root declaration route
app.get('/', (req, res) => {
    res.send("Refund Engine is alive and breathing 💎💎");
});

// Dynamic status ritual route
app.get('/status', (req, res) => {
  const status = {
    backend: "✅ Alive",
    frontend: "✅ Speaking",
    frequency: "⚡ Active",
    uptime: process.uptime().toFixed(2) + "s",
    requests: requestCount // tracked via middleware
  };
  res.json(status);
});

// Server start
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Refund Engine started on port ${PORT}`);
});

let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  next();
});
