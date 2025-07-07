const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  seatNumber: DataTypes.INTEGER
});

module.exports = Booking;
