const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testDB', 'sharpener', 'Sharp@25', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
