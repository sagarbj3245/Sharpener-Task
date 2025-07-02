const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

const bookRoutes = require('./routes/books');

app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Library server is running at http://localhost:${PORT}`);
});
