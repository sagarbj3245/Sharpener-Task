const express = require('express');
const app = express();
const PORT = 3000;

const addUserMiddleware = (req, res, next) => {
  req.user = "Guest";
  next();
};

app.get('/welcome', addUserMiddleware, (req, res) => {
  res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
