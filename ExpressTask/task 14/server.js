const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // To serve JS files

// GET request to serve the form
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productForm.html'));
});

// POST request to receive form data
app.post('/api/products', (req, res) => {
  const product = req.body.productName;
  console.log('Received product:', product);
  res.send(`Product "${product}" added successfully!`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
