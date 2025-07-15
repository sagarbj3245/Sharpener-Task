const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('DB error');
    if (results.length > 0) return res.status(400).send('Email already exists');

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).send('Hash failed');
      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hash],
        (err, result) => {
          if (err) return res.status(500).send('DB insert error');
          const token = jwt.sign({ userId: result.insertId }, JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
        });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('DB error');
    if (results.length === 0) return res.status(404).send('User not found');

    bcrypt.compare(password, results[0].password, (err, same) => {
      if (err) return res.status(500).send('Compare error');
      if (!same) return res.status(401).send('Invalid password');

      const token = jwt.sign({ userId: results[0].id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};
