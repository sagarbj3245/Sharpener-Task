const { User, Bus, sequelize } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  await User.bulkCreate([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
  ]);

  await Bus.bulkCreate([
    { name: 'Bus A', totalSeats: 40, availableSeats: 25 },
    { name: 'Bus B', totalSeats: 30, availableSeats: 8 },
  ]);

  console.log('Database seeded');
}

seed();
