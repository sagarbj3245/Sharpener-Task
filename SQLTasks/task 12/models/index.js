const sequelize = require('../config/database');
const Student = require('./student');
const Course = require('./course');

// Many-to-Many
Student.belongsToMany(Course, { through: 'StudentCourses' });
Course.belongsToMany(Student, { through: 'StudentCourses' });

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true }); // use force:true for dev
    console.log('Database synced!');
  } catch (error) {
    console.error('DB error:', error);
  }
};

module.exports = { Student, Course, sequelize, syncDb };
