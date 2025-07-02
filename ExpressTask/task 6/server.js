const express = require('express');
const app = express();
const PORT = 3000;
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
