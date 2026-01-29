const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// @route   GET /api/messages
// @desc    Obtener todos los mensajes
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { archived, unread } = req.query;
    
    let query = {};
    if (archived === 'true') query.isArchived = true;
    if (archived === 'false') query.isArchived = false;
    if (unread === 'true') query.isRead = false;

    const messages = await Message.find(query).sort({ createdAt: -1 });

    // Contar no leídos
    const unreadCount = await Message.countDocuments({ isRead: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener mensajes',
      error: error.message
    });
  }
});

// @route   POST /api/messages
// @desc    Enviar mensaje (desde formulario de contacto)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validaciones básicas
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: '¡Mensaje enviado correctamente! Te responderé pronto.',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar mensaje',
      error: error.message
    });
  }
});

// @route   GET /api/messages/:id
// @desc    Obtener mensaje por ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener mensaje',
      error: error.message
    });
  }
});

// @route   PUT /api/messages/:id/read
// @desc    Marcar mensaje como leído
// @access  Private
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar mensaje',
      error: error.message
    });
  }
});

// @route   PUT /api/messages/:id/archive
// @desc    Archivar/Desarchivar mensaje
// @access  Private
router.put('/:id/archive', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    message.isArchived = !message.isArchived;
    await message.save();

    res.json({
      success: true,
      data: message,
      message: message.isArchived ? 'Mensaje archivado' : 'Mensaje desarchivado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al archivar mensaje',
      error: error.message
    });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Eliminar mensaje
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Mensaje eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar mensaje',
      error: error.message
    });
  }
});

// @route   GET /api/messages/stats/count
// @desc    Obtener estadísticas de mensajes
// @access  Private
router.get('/stats/count', protect, async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const unread = await Message.countDocuments({ isRead: false });
    const archived = await Message.countDocuments({ isArchived: true });

    res.json({
      success: true,
      data: { total, unread, archived }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
});

module.exports = router;
