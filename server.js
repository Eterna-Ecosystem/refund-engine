const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

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
  const { transactionId, amount, reason, customerEmail } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail', // or Outlook, etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Eterna Refund Engine" <${process.env.EMAIL_USER}>`,
      to: customerEmail || process.env.TEST_EMAIL,
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
