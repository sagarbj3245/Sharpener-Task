const { Student, Course, syncDb } = require('./models');

const seed = async () => {
  await syncDb();

  const student1 = await Student.create({ name: 'Alice' });
  const student2 = await Student.create({ name: 'Bob' });

  const course1 = await Course.create({ title: 'Math' });
  const course2 = await Course.create({ title: 'Science' });

  await student1.addCourse(course1);
  await student1.addCourse(course2);

  await student2.addCourse(course2);

  console.log('Seeding done!');
};

seed();
