const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Kayıt olma endpoint'i
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// Giriş yapma endpoint'i
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Gelen kullanıcı adı:', username);

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Giriş yaparken hata oluştu:', err);
      return res.status(500).json({ message: 'Error logging in' });
    }

    if (results.length === 0) {
      console.log('Kullanıcı bulunamadı veya yanlış kullanıcı adı');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    console.log('Bulunan kullanıcı:', user);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Parola kontrol edilirken hata oluştu:', err);
        return res.status(500).json({ message: 'Error logging in' });
      }

      if (!isMatch) {
        console.log('Parola yanlış');
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      console.log('JWT token oluşturuluyor...');
      const token = jwt.sign(
        { id: user.id, username: user.username },
        'your_jwt_secret', // Bu değeri güvenli bir şekilde yönetin
        { expiresIn: '1h' }
      );
      console.log('Oluşturulan token:', token);

      res.json({ token });
    });
  });
});

module.exports = router;
