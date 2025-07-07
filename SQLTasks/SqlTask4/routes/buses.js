const express = require('express');
const router = express.Router();
const db = require('../utils/db-connection');

// POST /buses → Add new bus
router.post('/', (req, res) => {
  const { busNumber, totalSeats, availableSeats } = req.body;
  db.query(
    'INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)',
    [busNumber, totalSeats, availableSeats],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, busNumber, totalSeats, availableSeats });
    }
  );
});

// GET /buses/available/:seats → Get buses with availableSeats > :seats
router.get('/available/:seats', (req, res) => {
  const seats = parseInt(req.params.seats, 10);
  db.query(
    'SELECT * FROM Buses WHERE availableSeats > ?',
    [seats],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

module.exports = router;
