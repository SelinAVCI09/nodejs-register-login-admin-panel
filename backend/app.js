const express = require('express');
const cors = require('cors');
const app = express();
const port = 4002;

const db = require('./config/db'); // Veritabanı bağlantı dosyasını import edin

// CORS ayarları
app.use(cors({
  origin: 'http://localhost:4200', // Angular uygulamanızın çalıştığı adres
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Diğer middleware ve rotalar
app.use(express.json());

// Rotalar
const authRoutes = require('./routes/authentication');
const buttonStatsRoutes = require('./routes/buttonStats'); // Buton tıklama rotalarını import edin

app.use('/api', authRoutes);
app.use('/api/button-stats', buttonStatsRoutes); // Buton tıklama rotalarını ekleyin

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
