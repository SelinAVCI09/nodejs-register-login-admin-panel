const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Buton tıklama bilgilerini ekle
router.post('/click', (req, res) => {
  const { userId, buttonName } = req.body;

  // Eksik parametre kontrolü
  if (!userId || !buttonName) {
    return res.status(400).json({ message: 'User ID and button name are required' });
  }

  // Tıklama sayısını güncelle veya ekle
  const query = `
    INSERT INTO button_stats (user_id, button_name, click_count)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE click_count = click_count + 1
  `;

  db.query(query, [userId, buttonName], (error, results) => {
    if (error) {
      console.error('Error updating button stats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Button click recorded successfully' });
  });
});

// Kullanıcının buton tıklama istatistiklerini al
router.get('/button-stats/:userId', (req, res) => {
  const { userId } = req.params;

  db.query('SELECT * FROM button_stats WHERE user_id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error fetching button stats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json(results);
  });
});

module.exports = router;
