const express = require('express');
const nodemailer = require('nodemailer');
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
app.post('/api/refund', async (req, res) => {
  const { transactionId, amount, reason } = req.body;

  try {
    // Configure transporter (use your email service credentials)
    let transporter = nodemailer.createTransport({
      service: 'gmail', // or Outlook, etc.
      auth: {
        user: process.env.EMAIL_USER, // set in .env
        pass: process.env.EMAIL_PASS  // set in .env
      }
    });

    // Send confirmation email
    await transporter.sendMail({
      from: `"Eterna Refund Engine" <${process.env.EMAIL_USER}>`,
      to: req.body.customerEmail || process.env.TEST_EMAIL, // fallback for testing
      subject: 'Refund Request Confirmation',
      text: `Dear Customer,

We have received your refund request.

Transaction ID: ${transactionId}
Amount: ${amount}
Reason: ${reason}

Our team will process your request shortly.

Best regards,
Eterna Refund Engine`
    });

    res.json({
      status: 'success',
      message: 'Refund request received. Confirmation email sent.',
      transactionId,
      amount,
      reason
    });
  } catch (error) {
    console.error('Email error:', error);
    res.json({
      status: 'error',
      message: 'Refund request received, but email could not be sent.',
      transactionId,
      amount,
      reason
    });
  }
});

app.listen(PORT, () => {
  console.log(`Refund Engine started on port ${PORT}`);
});
