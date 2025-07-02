const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productForm.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
