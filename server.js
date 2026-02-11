const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// Middleware to parse JSON and form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.send('Refund Engine is running ✅');
});

// Serve static files (style.css, script.js, icons, manifest.json)
app.use(express.static(path.join(__dirname)));

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Refund API route
app.post('/api/refund', (req, res) => {
  const { transactionId, amount, reason } = req.body;

  // Placeholder response — later wire into email confirmation + receipt validation
  res.json({
    status: 'success',
    message: 'Refund request received.',
    transactionId,
    amount,
    reason
  });
});

app.listen(PORT, () => {
  console.log(`Refund Engine started on port ${PORT}`);
});
