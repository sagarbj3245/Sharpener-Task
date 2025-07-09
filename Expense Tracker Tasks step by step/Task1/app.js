const express = require('express');
const path = require('path');

const app = express();

// Middleware to serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Home route - serve signup page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
