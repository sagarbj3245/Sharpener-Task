const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your DB username
  password: '1234', // replace with your DB password
  database: 'testdb' // replace with your DB name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create students_data table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS students_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    age INT
  )
`, err => {
  if (err) throw err;
  console.log('students_data table ready');
});

// INSERT new student
app.post('/students', (req, res) => {
  const { name, email, age } = req.body;
  const query = `INSERT INTO students_data (name, email, age) VALUES (?, ?, ?)`;
  db.query(query, [name, email, age], (err, result) => {
    if (err) {
      console.error('Insert Error:', err.message);
      return res.status(400).json({ error: err.message });
    }
    console.log('Inserted student:', name);
    res.status(201).json({ id: result.insertId, name, email, age });
  });
});

// GET all students
app.get('/students', (req, res) => {
  db.query(`SELECT * FROM students_data`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET student by ID (fixed table name here)
app.get('/students/:id', (req, res) => {
  const query = `SELECT * FROM students_data WHERE id = ?`;
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Student not found' });
    res.json(results[0]);
  });
});

// UPDATE student
app.put('/students/:id', (req, res) => {
  const { name, email } = req.body;
  const query = `UPDATE students_data SET name = ?, email = ? WHERE id = ?`;
  db.query(query, [name, email, req.params.id], (err, result) => {
    if (err) {
      console.error('Update Error:', err.message);
      return res.status(400).json({ error: err.message });
    }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    console.log(`Updated student ID: ${req.params.id}`);
    res.json({ message: 'Student updated successfully' });
  });
});

// DELETE student
app.delete('/students/:id', (req, res) => {
  const query = `DELETE FROM students_data WHERE id = ?`;
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    console.log(`🗑️ Deleted student ID: ${req.params.id}`);
    res.json({ message: 'Student deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
