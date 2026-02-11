document.getElementById('refundForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const transactionId = e.target.transactionId.value;
  const amount = e.target.amount.value;
  const reason = e.target.reason.value;

  const response = await fetch('/api/refund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transactionId, amount, reason })
  });

  const data = await response.json();
  alert(`Refund Engine Response: ${data.message}`);
});
