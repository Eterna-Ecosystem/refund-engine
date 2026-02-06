// Basic form handling for Refund Engine
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const statusSection = document.getElementById("confirmation");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate processing
    statusSection.innerHTML = `
      <h2>Status</h2>
      <p>✅ Your refund request has been submitted successfully.</p>
    `;

    // Optional: send data to backend
    // fetch("/process", { method: "POST", body: new FormData(form) })
    //   .then(res => res.json())
    //   .then(data => {
    //     statusSection.innerHTML = `<h2>Status</h2><p>${data.message}</p>`;
    //   });
  });
});
