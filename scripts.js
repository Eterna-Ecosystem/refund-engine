// Refund Engine Interactive Logic
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("refundForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    confirmation.innerHTML = `
      <h2>Status</h2>
      <p>✅ Your refund request has been submitted successfully.</p>
    `;
  });
});
