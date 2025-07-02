const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("GET request to /books");
  res.send("Here is the list of books!");
});

router.post('/', (req, res) => {
  console.log("Book data received:", req.body);
  res.send("Book has been added!");
});

module.exports = router;
