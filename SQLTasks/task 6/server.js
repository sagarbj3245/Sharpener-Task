const express = require('express');
const sequelize = require('./utils/db-connection.js');
const studentRoutes = require('./routes/studentRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/students", studentRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});