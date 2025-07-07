const express = require('express');
const router = express.Router();
const db = require('../utils/db-connection');

// POST /users → Add new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  db.query(
    'INSERT INTO Users (name, email) VALUES (?, ?)',
    [name, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, name, email });
    }
  );
});

// GET /users → Get all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
