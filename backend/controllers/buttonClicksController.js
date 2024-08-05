const db = require('../config/db');
//dbsi şu şekilde olmalıdır 
//CREATE TABLE button_stats (
//  id INT AUTO_INCREMENT PRIMARY KEY,
 // user_id INT NOT NULL,
  //button_name VARCHAR(255) NOT NULL,
  //click_count INT NOT NULL DEFAULT 1,
  //entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  //-- Eğer user_id ve button_name kombinasyonunun tekrarını önlemek istiyorsanız, aşağıdaki UNIQUE constraint'i ekleyebilirsiniz.
  //UNIQUE KEY unique_click (user_id, button_name, entry_time)
//);-->


// Buton tıklama kaydını yapar
const recordButtonClick = (req, res) => {
  const { userId, buttonName } = req.body;

  if (!userId || !buttonName) {
    return res.status(400).json({ error: 'User ID and Button Name are required' });
  }

  db.query(
    'INSERT INTO button_stats (user_id, button_name, click_count, entry_time) VALUES (?, ?, 1, NOW())',
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
