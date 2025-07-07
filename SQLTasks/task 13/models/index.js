const sequelize = require('../config/database');
const User = require('./user');
const Bus = require('./bus');
const Booking = require('./booking');

// Associations
User.hasMany(Booking);
Booking.belongsTo(User);

Bus.hasMany(Booking);
Booking.belongsTo(Bus);

const syncDb = () => sequelize.sync({ alter: true });

module.exports = { sequelize, User, Bus, Booking, syncDb };
