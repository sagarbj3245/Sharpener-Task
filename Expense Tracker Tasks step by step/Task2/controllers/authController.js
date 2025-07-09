const db = require('../db/db');

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (results.length > 0) {
      return res.status(400).send('Email already exists');
    }

    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }

      console.log(`User created with ID: ${result.insertId}`);
      res.status(201).send('User registered successfully');
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid email or password');
    }

    res.status(200).send('Login successful');
  });
};
