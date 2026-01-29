const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configurar Multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes'));
  }
});

// @route   GET /api/profile
// @desc    Obtener perfil público
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.getProfile();
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
});

// @route   PUT /api/profile
// @desc    Actualizar perfil
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      // Actualizar campos
      const updateFields = [
        'name', 'title', 'bio', 'email', 'phone', 'location',
        'social', 'stats', 'services', 'isActive'
      ];
      
      updateFields.forEach(field => {
        if (req.body[field] !== undefined) {
          profile[field] = req.body[field];
        }
      });
    }
    
    profile.updatedAt = Date.now();
    await profile.save();

    res.json({
      success: true,
      data: profile,
      message: 'Perfil actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar perfil',
      error: error.message
    });
  }
});

// @route   POST /api/profile/avatar
// @desc    Subir avatar
// @access  Private
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se subió ninguna imagen'
      });
    }

    const profile = await Profile.getProfile();
    profile.avatar = `/uploads/${req.file.filename}`;
    await profile.save();

    res.json({
      success: true,
      data: { avatar: profile.avatar },
      message: 'Avatar actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir avatar',
      error: error.message
    });
  }
});

// @route   POST /api/profile/resume
// @desc    Subir CV/Resume
// @access  Private
router.post('/resume', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No se subió ningún archivo'
      });
    }

    const profile = await Profile.getProfile();
    profile.resume = `/uploads/${req.file.filename}`;
    await profile.save();

    res.json({
      success: true,
      data: { resume: profile.resume },
      message: 'CV actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al subir CV',
      error: error.message
    });
  }
});

module.exports = router;
