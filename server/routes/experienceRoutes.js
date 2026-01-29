/**
 * ============================================
 * RUTAS DE EXPERIENCIA LABORAL
 * ============================================
 */

const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/auth');

// @route   GET /api/experience
// @desc    Obtener experiencia laboral
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .sort({ isCurrent: -1, startDate: -1, order: 1 });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener experiencia',
      error: error.message
    });
  }
});

// @route   GET /api/experience/all
// @desc    Obtener toda la experiencia (admin)
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const experiences = await Experience.find()
      .sort({ isCurrent: -1, startDate: -1 });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener experiencia',
      error: error.message
    });
  }
});

// @route   POST /api/experience
// @desc    Crear experiencia
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({
      success: true,
      data: experience,
      message: 'Experiencia creada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear experiencia',
      error: error.message
    });
  }
});

// @route   PUT /api/experience/:id
// @desc    Actualizar experiencia
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experiencia no encontrada'
      });
    }

    res.json({
      success: true,
      data: experience,
      message: 'Experiencia actualizada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar experiencia',
      error: error.message
    });
  }
});

// @route   DELETE /api/experience/:id
// @desc    Eliminar experiencia
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experiencia no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Experiencia eliminada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar experiencia',
      error: error.message
    });
  }
});

module.exports = router;
