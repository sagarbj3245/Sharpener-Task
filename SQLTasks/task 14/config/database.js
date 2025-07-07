const { Sequelize } = require('sequelize');

// Proper Sequelize instance configuration
const sequelize = new Sequelize('expenseapp', 'sharpener', 'Sharp@25', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: console.log
});

module.exports = sequelize;