const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db/db');

router.get('/user', authMiddleware, (req, res) => {
  const userId = req.user.userId;

  db.query('SELECT name, email FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!results.length) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
});

module.exports = router;
