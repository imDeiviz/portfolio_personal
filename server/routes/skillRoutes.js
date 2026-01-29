const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

// @route   GET /api/skills
// @desc    Obtener todas las habilidades
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = { isActive: true };
    if (category) query.category = category;

    const skills = await Skill.find(query).sort({ category: 1, order: 1 });

    // Agrupar por categoría
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      count: skills.length,
      data: skills,
      grouped
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener habilidades',
      error: error.message
    });
  }
});

// @route   GET /api/skills/all
// @desc    Obtener todas (incluyendo inactivas) - Admin
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener habilidades',
      error: error.message
    });
  }
});

// @route   POST /api/skills
// @desc    Crear habilidad
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      data: skill,
      message: 'Habilidad creada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear habilidad',
      error: error.message
    });
  }
});

// @route   PUT /api/skills/:id
// @desc    Actualizar habilidad
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Habilidad no encontrada'
      });
    }

    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: skill,
      message: 'Habilidad actualizada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar habilidad',
      error: error.message
    });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Eliminar habilidad
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Habilidad no encontrada'
      });
    }

    await skill.deleteOne();

    res.json({
      success: true,
      message: 'Habilidad eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar habilidad',
      error: error.message
    });
  }
});

// @route   POST /api/skills/bulk
// @desc    Crear múltiples habilidades
// @access  Private
router.post('/bulk', protect, async (req, res) => {
  try {
    const { skills } = req.body;
    
    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de habilidades'
      });
    }

    const createdSkills = await Skill.insertMany(skills);

    res.status(201).json({
      success: true,
      count: createdSkills.length,
      data: createdSkills,
      message: `${createdSkills.length} habilidades creadas correctamente`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear habilidades',
      error: error.message
    });
  }
});

module.exports = router;
