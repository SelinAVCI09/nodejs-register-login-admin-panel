const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // jwt modülünü ekleyin
const db = require('../config/db');

// Kullanıcı kimlik doğrulama endpoint'i
router.post('/authenticate', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
    if (err) {
      console.error('Invalid token:', err);
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decoded.id; // 'decoded' nesnesinden userId'yi al
    console.log('Token valid. User ID:', userId);

    // Kullanıcı ID'sini veritabanında doğrula
    db.query('SELECT * FROM admins WHERE id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Error during authentication:', err);
        return res.status(500).json({ message: 'Error authenticating user' });
      }

      if (results.length === 0) {
        console.log('User not found');
        return res.status(401).json({ message: 'User not found' });
      }

      // Kullanıcı bilgilerini yanıtla
      res.status(200).json({ message: 'Token is valid', token, id: userId });
    });
  });
});

module.exports = router;
