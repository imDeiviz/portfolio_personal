/**
 * ============================================
 * RUTAS DE CERTIFICACIONES
 * ============================================
 */

const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configurar Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cert-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// @route   GET /api/certifications
// @desc    Obtener certificaciones públicas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { isActive: true };
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const certifications = await Certification.find(query)
      .sort({ featured: -1, issueDate: -1, order: 1 });

    res.json({
      success: true,
      count: certifications.length,
      data: certifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener certificaciones',
      error: error.message
    });
  }
});

// @route   GET /api/certifications/all
// @desc    Obtener todas (admin)
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const certifications = await Certification.find()
      .sort({ issueDate: -1 });

    res.json({
      success: true,
      count: certifications.length,
      data: certifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener certificaciones',
      error: error.message
    });
  }
});

// @route   POST /api/certifications
// @desc    Crear certificación
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const certification = await Certification.create(data);
    res.status(201).json({
      success: true,
      data: certification,
      message: 'Certificación creada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear certificación',
      error: error.message
    });
  }
});

// @route   PUT /api/certifications/:id
// @desc    Actualizar certificación
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certificación no encontrada'
      });
    }

    res.json({
      success: true,
      data: certification,
      message: 'Certificación actualizada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar certificación',
      error: error.message
    });
  }
});

// @route   DELETE /api/certifications/:id
// @desc    Eliminar certificación
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certificación no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Certificación eliminada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar certificación',
      error: error.message
    });
  }
});

module.exports = router;
