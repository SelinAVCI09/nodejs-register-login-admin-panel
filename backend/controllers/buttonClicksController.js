const db = require('../config/db');

// Buton tıklama kaydını yapar
const recordButtonClick = (req, res) => {
  const { userId, buttonName } = req.body;

  if (!userId || !buttonName) {
    return res.status(400).json({ error: 'User ID and Button Name are required' });
  }

  db.query(
    'INSERT INTO button_stats (user_id, button_name, click_count, entry_time) VALUES (?, ?, 1, NOW()) ON DUPLICATE KEY UPDATE click_count = click_count + 1, entry_time = VALUES(entry_time)',
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
    'SELECT button_name, click_count, entry_time FROM button_stats WHERE user_id = ? ORDER BY entry_time ASC',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No button clicks found for this user ID' });
      }
      res.json(results);
    }
  );
};

module.exports = {
  recordButtonClick,
  getButtonClicks
};
