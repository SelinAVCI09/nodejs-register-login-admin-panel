const connection = require('../config/db'); // `db.js` dosyasının doğru yolu

// Kullanıcı oluşturma
exports.create = (userData, callback) => {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [userData.username, userData.email, userData.password], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      return callback(err);
    }
    callback(null, results.insertId);
  });
};

// Kullanıcıyı kullanıcı adı veya e-posta ile bulma
exports.findByUsernameOrEmail = (username, email, callback) => {
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  connection.query(query, [username, email], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null); // Kullanıcı bulunamadı
    }
    callback(null, results[0]); // Kullanıcı bulundu
  });
};

 