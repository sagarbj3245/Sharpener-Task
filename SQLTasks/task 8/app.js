const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/buses', busRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server is running on port 3000'));
});