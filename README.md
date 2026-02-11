# Refund Engine

Refund Engine portal for the Eterna Ecosystem

## Overview
Refund Engine is a live web portal designed to handle customer refund requests for Eterna campaigns. It provides a clean front end for refund form submissions, receipt uploads, and automated confirmation messaging. The system is currently email‑driven for faster processing until payment gateways are deployed.

## Features
- **Refund Form**: Customers can submit Transaction ID, Amount, and Reason.
- **Email Confirmation**: Automated email notifications are sent to customers once their request is received.
- **Information & Resources Sections**: Provides system responsibility details and support information.
- **Responsive Design**: Neutral, professional layout with subtle styling.

## Current Workflow
1. Customer submits refund request via the form.
2. Backend (`server.js`) receives the request.
3. Nodemailer sends a confirmation email to the customer using credentials stored in `.env`.
4. Refunds are processed manually until payment gateways are integrated.

## Email Confirmation Setup
- Uses **Nodemailer** for sending emails.
- Credentials (`EMAIL_USER`, `EMAIL_PASS`, `TEST_EMAIL`) are stored in `.env` for security.
- If `customerEmail` is not provided, system falls back to `TEST_EMAIL` for testing.
- Confirmation email includes Transaction ID, Amount, and Reason.

## Deployment
- Hosted on Render (`refund-engine.onrender.com`).
- Auto‑deploy enabled via Gift Hub commits to `main`.
- Environment variables stripped of payment gateway keys for clean deployment.

## Roadmap
- Integration of PayPal, Payoneer, PayFast, and Digistore24 gateways (future milestone).
- Expansion into Funding, Education, and Trading Engines.
- Full automation of refund payouts once gateways are live.

## License
This project is licensed under the MIT License — see the LICENSE file for details.
