document.getElementById('refundForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/refund', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  alert(`Refund Engine Response: ${result.message}`);
});
