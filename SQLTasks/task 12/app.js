const express = require('express');
const app = express();
require('dotenv').config();

const { Student, Course, sequelize, syncDb } = require('./models');

app.use(express.json());

// Get all students with courses
app.get('/students', async (req, res) => {
  const students = await Student.findAll({ include: Course });
  res.json(students);
});

// Get all courses with students
app.get('/courses', async (req, res) => {
  const courses = await Course.findAll({ include: Student });
  res.json(courses);
});

const PORT = process.env.PORT || 3000;
syncDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
