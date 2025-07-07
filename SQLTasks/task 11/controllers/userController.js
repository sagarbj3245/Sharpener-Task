const { User, Post } = require('../models');

exports.createUserWithPosts = async (req, res) => {
  try {
    const { name, posts } = req.body;
    const user = await User.create({ name }, { include: [Post] });

    if (posts && posts.length > 0) {
      const postInstances = posts.map(post => ({ ...post, userId: user.id }));
      await Post.bulkCreate(postInstances);
    }

    res.status(201).json({ message: 'User and posts created', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserWithPosts = async (req, res) => {
  try {
    const users = await User.findAll({ include: Post });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
