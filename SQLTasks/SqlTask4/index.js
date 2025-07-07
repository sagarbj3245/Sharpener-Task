const express = require('express');
const app = express();
const db = require('./utils/db-connection');

app.use(express.json());
 
// User routes
const userRoutes = require('./routes/users');
app.use('/users',  userRoutes);

// Bus routes
const busRoutes = require('./routes/buses');
app.use('/buses', busRoutes);

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
