const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Servir les fichiers PDF depuis le dossier uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes API
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur fonctionne correctement' });
});

// Demarrer le serveur
app.listen(PORT, () => {
  console.log('Serveur lance sur http://localhost:' + PORT);
});