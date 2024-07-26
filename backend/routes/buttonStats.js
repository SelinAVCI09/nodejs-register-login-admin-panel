const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Buton tıklama kaydını yapar
router.post('/record-button-click', (req, res) => {
  const { userId, buttonName } = req.body;

  if (!userId || !buttonName) {
    return res.status(400).json({ error: 'User ID and Button Name are required' });
  }

  // Kullanıcı ID ve buton adını kontrol ederek tıklama kaydını güncelle
  db.query(
    'INSERT INTO button_stats (user_id, button_name, click_count) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE click_count = click_count + 1',
    [userId, buttonName],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Button click recorded' });
    }
  );
});

// Kullanıcı ID'sine göre buton tıklama istatistiklerini getirir
router.get('/button-clicks/:userId', (req, res) => {
  const { userId } = req.params;

  db.query(
    'SELECT button_name, click_count FROM button_stats WHERE user_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    }
  );
});

module.exports = router;