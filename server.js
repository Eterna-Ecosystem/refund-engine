const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/healthz', (req, res) => {
  res.send('Refund Engine is running ✅');
});

app.listen(PORT, () => {
  console.log(`Refund Engine started on port ${PORT}`);
});
