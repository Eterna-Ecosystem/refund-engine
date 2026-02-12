document.getElementById("refundForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
    transactionId: this.transactionId.value,
    amount: this.amount.value,
    reason: this.reason.value,
    customerEmail: this.customerEmail.value
  };

  try {
    const response = await fetch("/refund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Refund submitted successfully!");
    } else {
      alert("Error submitting refund.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
});
