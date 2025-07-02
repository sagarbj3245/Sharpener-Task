const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
