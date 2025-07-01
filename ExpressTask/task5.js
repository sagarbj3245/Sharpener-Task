const express = require('express');
const app = express();

// Dynamic route: /welcome/:username
app.get('/welcome/:username', (req, res) => {
  // Extract route parameter
  const username = req.params.username;

  // Extract query parameter
  const role = req.query.role;

  // Prepare response
  if (role) {
    res.send(`Welcome ${username}, your role is ${role}`);
  } else {
    res.send(`Welcome ${username}!`);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
