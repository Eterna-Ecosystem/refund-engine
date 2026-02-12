const express = require('express');
const app = express();

// existing middleware and routes...

app.get('/', (req, res) => {
  res.send('Refund Engine is alive and breathing 🌍💎');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Refund Engine started on port ${PORT}`);
});
