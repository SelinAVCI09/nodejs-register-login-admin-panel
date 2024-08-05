const express = require('express');
const router = express.Router();
const userStatsController = require('../controllers/userStatsController');

router.get('/user-stats', userStatsController.getUserButtonStats);

module.exports = router;
