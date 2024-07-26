const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Kayıt olma endpoint'i
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Error hashing password' });
    }

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// Giriş yapma endpoint'i
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Error logging in' });
    }

    if (results.length === 0) {
      console.log('User not found or incorrect username');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    console.log('User found:', user);

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error checking password:', err);
        return res.status(500).json({ message: 'Error logging in' });
      }

      if (!isMatch) {
        console.log('Incorrect password');
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      console.log('Creating JWT token...');
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable for secret
        { expiresIn: '1h' }
      );
      console.log('Token created:', token);

      res.json({ token });
    });
  });
});

// Çıkış yapma endpoint'i
router.post('/logout', (req, res) => {
  // Logout işlemi sadece client tarafında token'ı siler
  // Token'ı backend'de herhangi bir işlem yapmadan basitçe başarılı yanıt dönüyoruz
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
