const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Route to serve HTML file
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
