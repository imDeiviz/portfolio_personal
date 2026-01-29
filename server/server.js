/**
 * ============================================
 * SERVIDOR PRINCIPAL - PORTFOLIO MERN
 * ============================================
 * Arquitectura escalable y modular
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== DATABASE CONNECTION ====================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// ==================== API ROUTES ====================
// Rutas principales
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Rutas adicionales (escalabilidad)
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/certifications', require('./routes/certificationsRoutes'));
app.use('/api/debug', require('./routes/debugRoutes')); // TEMPORAL

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ==================== SERVE STATIC ASSETS ====================
const fs = require('fs');
const clientBuildPath = path.join(__dirname, '../client/dist');

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, 'index.html'));
  });
} else if (process.env.NODE_ENV === 'production') {
  console.error('❌ Error: No se encontró el build del cliente en', clientBuildPath);
}

// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                 🚀 PORTFOLIO MERN SERVER                  ║
╠═══════════════════════════════════════════════════════════╣
║  Puerto:     ${PORT}                                          ║
║  API:        http://localhost:${PORT}/api                     ║
║  Ambiente:   ${process.env.NODE_ENV || 'development'}                              ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
