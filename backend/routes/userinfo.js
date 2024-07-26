const express = require('express');
const router = express.Router();
const checkToken = require('../controllers/checkToken');
const db = require('../config/db');

router.get('/userinfo', checkToken, (req, res) => {
  res.status(200).send({ id: req.userId, username: 'exampleUser' });
});
router.get('/button-stats/:userid', checkToken, userinfoController.getButtonStats);
exports.getButtonStats = (req, res) => {
  const userId = req.params.userid;

  db.query('SELECT button_name, click_count FROM button_stats WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No button stats found for this user' });
    }

    res.status(200).json({ buttonStats: results });
  });
};

module.exports = router;
