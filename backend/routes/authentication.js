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

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging in' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        'your_jwt_secret',
        { expiresIn: '1h' }
      );

      res.json({ message: 'Token is valid', token, id: user.id }); // id burada döndürülüyor
    });
  });
});


// Admin giriş endpoint'i
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  console.log('Gelen admin kullanıcı adı:', username);

  db.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Admin giriş yaparken hata oluştu:', err);
      return res.status(500).json({ message: 'Error logging in' });
    }

    if (results.length === 0) {
      console.log('Admin bulunamadı veya yanlış kullanıcı adı');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const admin = results[0];
    console.log('Bulunan admin:', admin);

    bcrypt.compare(password, admin.password, (err, isMatch) => {
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
        { id: admin.id, username: admin.username },
        'your_jwt_secret', // Bu değeri güvenli bir şekilde yönetin
        { expiresIn: '1h' }
      );
      console.log('Oluşturulan token:', token);
      res.json({ message: 'Admin token is valid', token, id: admin.id });
    });
  });
});

// Çıkış yapma endpoint'i
router.post('/logout', (req, res) => {
  // Logout işlemi için gerekli işlem yapılıyor
  // Genellikle token'ın geçersiz kılınması işlemidir, ancak bu basit örnekte sadece mesaj döndürülüyor
  // Token'ı server tarafında geçersiz kılmak gerekebilir; bu kod parçası yalnızca client tarafında token'ı temizler
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
