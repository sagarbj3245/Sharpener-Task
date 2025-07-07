const sequelize = require('../config/database');
const User = require('./user');
const Post = require('./post');

// Associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); // use { force: true } for dev
    console.log('Database synced!');
  } catch (error) {
    console.error('Error syncing DB:', error);
  }
};

module.exports = { User, Post, sequelize, syncDb };
