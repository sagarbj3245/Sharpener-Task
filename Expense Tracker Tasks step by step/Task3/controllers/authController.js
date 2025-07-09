const db = require('../db/db');
const bcrypt = require('bcrypt');

// Signup Controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).send('Database error');
      }

      if (results.length > 0) {
        return res.status(400).send('Email already exists');
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert new user
      const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('DB insert error:', err);
          return res.status(500).send('Database error');
        }

        console.log(`✅ User created with ID: ${result.insertId}`);
        res.status(201).send('User registered successfully');
      });
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Something went wrong');
  }
};

// Login Controller
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send('Login successful');
  });
};
