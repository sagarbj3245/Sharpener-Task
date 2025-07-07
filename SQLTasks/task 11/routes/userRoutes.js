const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/users', controller.createUserWithPosts);
router.get('/users', controller.getUserWithPosts);

module.exports = router;
