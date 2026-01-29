const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configurar Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Solo se permiten imágenes'));
  }
});

// @route   GET /api/projects
// @desc    Obtener todos los proyectos
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    
    let query = { isActive: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let projects = Project.find(query).sort({ order: 1, createdAt: -1 });
    
    if (limit) projects = projects.limit(parseInt(limit));

    const result = await projects;

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos',
      error: error.message
    });
  }
});

// @route   GET /api/projects/all
// @desc    Obtener todos los proyectos (incluyendo inactivos) - Admin
// @access  Private
router.get('/all', protect, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos',
      error: error.message
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Obtener proyecto por ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyecto',
      error: error.message
    });
  }
});

// @route   POST /api/projects
// @desc    Crear proyecto
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    
    // Parsear technologies si viene como string
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
    }

    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
      message: 'Proyecto creado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear proyecto',
      error: error.message
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Actualizar proyecto
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    const updateData = { ...req.body };
    
    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies.split(',').map(t => t.trim());
    }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: project,
      message: 'Proyecto actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar proyecto',
      error: error.message
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Eliminar proyecto
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: 'Proyecto eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar proyecto',
      error: error.message
    });
  }
});

module.exports = router;
