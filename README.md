# Refund Engine

Refund Engine portal for the Eterna Ecosystem

## Overview
Refund Engine is a live web portal designed to handle customer refund requests for Eterna campaigns. It provides a clean front end for receipt uploads, refund form submissions, and confirmation messaging. The system is currently email‑driven for faster processing until payment gateways are deployed.

## Features
- **Refund Form**: Customers can submit transaction ID, amount, and reason for refund.
- **Receipt Upload**: Customers attach proof of purchase for validation.
- **Email Confirmation**: Automated email notifications are sent to customers once their request is received.
- **Information & Resources Sections**: Provides system responsibility details and support information.
- **Responsive Design**: Modern layout with gradient background and glowing form effect.

## Current Workflow
1. Customer submits refund request and uploads receipt.
2. System validates input and stores request.
3. Automated email is sent to customer confirming receipt of refund request.
4. Refunds are processed manually until payment gateways are integrated.

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
