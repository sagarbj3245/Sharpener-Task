const express = require('express');
const router = express.Router();
const { Bus } = require('../models');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
  const bus = await Bus.create(req.body);
  res.json(bus);
});

router.get('/available/:seats', async (req, res) => {
  const seats = parseInt(req.params.seats);
  const buses = await Bus.findAll({
    where: {
      availableSeats: {
        [Op.gt]: seats
      }
    }
  });
  res.json(buses);
});

module.exports = router;