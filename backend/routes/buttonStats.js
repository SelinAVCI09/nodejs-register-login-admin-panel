const express = require('express');
const router = express.Router();
const buttonClicksController = require('../controllers/buttonClicksController');

// Buton tıklama kaydını yapar
router.post('/record-button-click', buttonClicksController.recordButtonClick);

// Kullanıcı ID'sine göre buton tıklama istatistiklerini getirir
router.get('/button-clicks/:userId', buttonClicksController.getButtonClicks);

module.exports = router;
