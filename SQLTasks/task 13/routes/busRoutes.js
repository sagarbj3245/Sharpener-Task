const express = require('express');
const router = express.Router();
const { Bus, Booking, User } = require('../models');

router.post('/', async (req, res) => {
  const bus = await Bus.create(req.body);
  res.json(bus);
});

router.get('/:id/bookings', async (req, res) => {
  const bookings = await Booking.findAll({
    where: { BusId: req.params.id },
    include: [{ model: User, attributes: ['name', 'email'] }]
  });
  res.json(bookings);
});

module.exports = router;
