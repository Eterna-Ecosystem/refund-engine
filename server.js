const express = require("express");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Stripe key via env var
const fs = require("fs");

const app = express();

// Ensure World-Refund-Directory exists
const uploadDir = path.join(__dirname, "World-Refund-Directory");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // corrected folder for receipts
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Multer upload config with 10 MB limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG/PNG files allowed"));
    }
  }
});

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

  if (!receiptFile) {
    return res.status(400).send("No receipt uploaded. Please upload a JPEG/PNG image.");
  }

  // Nodemailer transport using Outlook credentials via env vars
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS
    }
  });

  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: email,
    subject: "Refund Request Received",
    text: `Hello ${name}, we have received your refund request and will process payment based on your receipt upload.`
  };

  try {
    // Send confirmation email
    await transporter.sendMail(mailOptions);

    // Create a Stripe payment intent (example: fixed refund amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // amount in cents (e.g., $50.00)
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

// Serve uploaded receipts if needed
app.use("/files", express.static(uploadDir));

// Start server — force Render binding
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Refund Engine started on port ${PORT}`);
});const express = require("express");
const path = require("path");
const multer = require("multer");
const nodemailer = require("nodemailer");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Stripe key via env var
const fs = require("fs");

const app = express();

// Ensure World-Refund-Directory exists
const uploadDir = path.join(__dirname, "World-Refund-Directory");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // corrected folder for receipts
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Multer upload config with 10 MB limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG/PNG files allowed"));
    }
  }
});

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

  if (!receiptFile) {
    return res.status(400).send("No receipt uploaded. Please upload a JPEG/PNG image.");
  }

  // Nodemailer transport using Outlook credentials via env vars
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS
    }
  });

  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: email,
    subject: "Refund Request Received",
    text: `Hello ${name}, we have received your refund request and will process payment based on your receipt upload.`
  };

  try {
    // Send confirmation email
    await transporter.sendMail(mailOptions);

    // Create a Stripe payment intent (example: fixed refund amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000, // amount in cents (e.g., $50.00)
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

// Serve uploaded receipts if needed
app.use("/files", express.static(uploadDir));

// Start server — force Render binding
const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Refund Engine started on port ${PORT}`);
});
