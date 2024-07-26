const db = require('../config/db');

// Buton tıklama kaydını yapar
const recordButtonClick = (req, res) => {
  const { userId, buttonName } = req.body;

  if (!userId || !buttonName) {
    return res.status(400).json({ error: 'User ID and Button Name are required' });
  }

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
};

// Kullanıcı ID'sine göre buton tıklama istatistiklerini getirir
const getButtonClicks = (req, res) => {
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
};

module.exports = {
  recordButtonClick,
  getButtonClicks
};
