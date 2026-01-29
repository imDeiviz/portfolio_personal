/**
 * ============================================
 * RUTAS DE CONFIGURACIÓN
 * ============================================
 */

const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');
const { SKILL_CATEGORIES, PROJECT_CATEGORIES, SOCIAL_PLATFORMS } = require('../config/constants');

// @route   GET /api/settings
// @desc    Obtener configuración pública
// @access  Public
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener configuración',
      error: error.message
    });
  }
});

// @route   GET /api/settings/constants
// @desc    Obtener constantes del sistema (categorías, etc.)
// @access  Public
router.get('/constants', async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        skillCategories: SKILL_CATEGORIES,
        projectCategories: PROJECT_CATEGORIES,
        socialPlatforms: SOCIAL_PLATFORMS
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener constantes',
      error: error.message
    });
  }
});

// @route   PUT /api/settings
// @desc    Actualizar configuración
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined) {
          settings[key] = req.body[key];
        }
      });
    }
    
    settings.updatedAt = Date.now();
    settings.updatedBy = req.user._id;
    await settings.save();

    res.json({
      success: true,
      data: settings,
      message: 'Configuración actualizada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar configuración',
      error: error.message
    });
  }
});

// @route   PUT /api/settings/sections
// @desc    Actualizar orden y visibilidad de secciones
// @access  Private
router.put('/sections', protect, async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    settings.sections = { ...settings.sections, ...req.body };
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({
      success: true,
      data: settings.sections,
      message: 'Secciones actualizadas'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar secciones',
      error: error.message
    });
  }
});

// @route   PUT /api/settings/theme
// @desc    Actualizar tema
// @access  Private
router.put('/theme', protect, async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    settings.theme = { ...settings.theme, ...req.body };
    settings.updatedAt = Date.now();
    await settings.save();

    res.json({
      success: true,
      data: settings.theme,
      message: 'Tema actualizado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar tema',
      error: error.message
    });
  }
});

module.exports = router;
