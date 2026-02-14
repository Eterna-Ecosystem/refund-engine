# Refund Engine — World Refund Directory

## 📑 Global Ledger
The Refund Engine tracks all receipts globally in a sovereign structure:

- Customers → Uploads from individual customers
   - Store-LATAM
   - Store-USA
   - Store-EU
   - Store-AFRICA
- Businesses → Uploads from stores and branches
   - Store-123
   - Store-USA
   - Store-EU
   - Store-AFRICA

Each store folder contains receipts named by timestamp, customer ID, or store ID for traceability.

## 📑 Supported Formats
- JPG → Standard image format for photos of receipts
- PNG → High-quality image format for digital or scanned receipts
- PDF → Document format for digital receipts or invoices
- DOCX → Word document format for business-generated receipts

## 📑 Naming Convention
- YYYY-MM-DD_<customerID>.jpg/png/pdf/docx
- YYYY-MM-DD_<storeID>.jpg/png/pdf/docx

Examples:
- 2026-02-14_customer123.jpg
- 2026-02-14_storeUSA_456.pdf

## 📑 Sovereign Protection
- GitHub ignores all receipt files (JPG, PNG, PDF, DOCX) to prevent flooding.
- Placeholders (placeholder.txt) remain visible to anchor the folder structure.
- This ensures the ledger is traceable, sovereign, and clean while uploads remain secure.
