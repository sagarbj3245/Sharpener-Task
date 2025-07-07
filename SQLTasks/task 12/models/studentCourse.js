const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudentCourse = sequelize.define('StudentCourse', {
  enrolledAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = StudentCourse;
