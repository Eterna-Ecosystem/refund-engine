const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/healthz', (req, res) => {
  res.send('Refund Engine is running ✅');
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Refund API
app.post('/api/refund', (req, res) => {
  const { transactionId, amount, reason } = req.body;

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
