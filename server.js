const express = require("express");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Root route → serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Refund route → process customer input
app.post("/refund", upload.single("receipt"), async (req, res) => {
  const { name, email } = req.body;
  const receiptFile = req.file;

  // Nodemailer transport using Volt credentials
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "eternacentralhub@outlook.com", // Volt email
      pass: "V9!tQz7@Lm2#Xp4$Rw6%Yh8&Jk0*Bn3" // Volt password
    }
  });

  const mailOptions = {
    from: "eternacentralhub@outlook.com",
    to: email,
    subject: "Refund Request Received",
    text: `Hello ${name}, we have received your refund request and will process payment based on your receipt upload.`
  };

  try {
    await transporter.sendMail(mailOptions);

    // ⚡ Direct Payment Trigger (Stripe example)
    // Replace with your Stripe secret key
    const stripe = require("stripe")("sk_test_yourStripeSecretKey");

    // Create a payment intent (example: fixed refund amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // amount in cents (e.g., 50.00)
      currency: "usd",
      payment_method_types: ["card"],
      receipt_email: email
    });

    res.send(`Refund request submitted successfully 💎⚡ Payment initiated. Payment ID: ${paymentIntent.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing refund request.");
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Refund Engine started on port ${PORT}`);
});
