document.addEventListener("DOMContentLoaded", () => {
  const statusElement = document.getElementById("status");
  if (statusElement) {
    statusElement.innerText = "Refund Engine is alive and breathing 💎⚡";
  }

  fetch("/status")
    .then(response => response.json())
    .then(data => {
      const backend = document.getElementById("backend");
      const frontend = document.getElementById("frontend");
      const frequency = document.getElementById("frequency");
      const uptime = document.getElementById("uptime");
      const requests = document.getElementById("requests");

      if (backend) backend.innerText = "Backend Oxygen: " + data.backend;
      if (frontend) frontend.innerText = "Frontend Voice: " + data.frontend;
      if (frequency) frequency.innerText = "Frequency Pulse: " + data.frequency;
      if (uptime) uptime.innerText = "Uptime: " + data.uptime;
      if (requests) requests.innerText = "Requests: " + data.requests;
    })
    .catch(err => {
      console.error("Status fetch failed:", err);
    });
});
