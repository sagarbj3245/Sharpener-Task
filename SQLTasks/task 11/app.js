const express = require('express');
const app = express();
require('dotenv').config();
const { syncDb } = require('./models');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
