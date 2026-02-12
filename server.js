const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.post("/refund", async (req, res) => {
  const { transactionId, amount, reason, customerEmail } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: "Refund Confirmation",
    text: `Your refund for transaction ${transactionId} of amount ${amount} has been processed. Reason: ${reason}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Refund processed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing refund");
  }
});

app.get("/healthz", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Refund Engine started on port ${PORT}`));
