const express = require('express');
const app = express();

app.use(express.json());

// Import product routes
const productRoutes = require('./routes/productRoutes');

// Mount product routes
app.use('/products', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
