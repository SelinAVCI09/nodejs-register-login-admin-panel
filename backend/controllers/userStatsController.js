const db = require('../config/db');

exports.getUserButtonStats = (req, res) => {
  const query = `
    SELECT users.username, users.email, button_stats.entry_time
    FROM users
    JOIN button_stats ON users.id = button_stats.user_id
    ORDER BY button_stats.entry_time DESC;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user button stats:', error);
      res.status(500).send('Error fetching user button stats');
    } else {
      res.json(results);
    }
  });
};
