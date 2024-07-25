const mysql = require('mysql');

// Veritabanı bağlantısı için yapılandırmalar
const connection = mysql.createConnection({
  host: 'localhost', // Veritabanı sunucusu
  user: 'root',      // Kullanıcı adı
  password: '',      // Parola
  database: 'nodejs_login' //  Veritabanı adı
});

// Bağlantıyı aç
connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
