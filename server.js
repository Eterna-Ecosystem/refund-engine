app.get('/status', (req, res) => {
  const status = {
    backend: "✅ Alive",
    frontend: "✅ Speaking",
    frequency: "⚡ Active",
    uptime: process.uptime().toFixed(2) + "s",
    requests: requestCount // you can track this with middleware
  };
  res.json(status);
});
