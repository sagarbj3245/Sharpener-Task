const express = require('express');
const studentController = require('../controller/studentController');
const router = express.Router();

router.post("/", studentController.addEntries);

module.exports = router;