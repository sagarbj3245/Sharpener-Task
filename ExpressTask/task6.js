const express = require('express');
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next(); // Pass control to the next middleware or route
});

// Parse JSON bodies (optional, good practice)
app.use(express.json());

// GET /products
app.get('/products', (req, res) => {
  res.send('Here is the list of all products.');
});

// POST /products
app.post('/products', (req, res) => {
  res.send('A new product has been added.');
});

// GET /categories
app.get('/categories', (req, res) => {
  res.send('Here is the list of all categories.');
});

// POST /categories
app.post('/categories', (req, res) => {
  res.send('A new category has been created.');
});

// Start the server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
