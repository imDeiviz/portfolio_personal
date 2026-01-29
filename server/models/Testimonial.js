/**
 * ============================================
 * MODELO DE TESTIMONIOS
 * ============================================
 * Reseñas y recomendaciones de clientes
 */

const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  position: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'El contenido es requerido'],
    maxlength: [1000, 'Máximo 1000 caracteres']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    default: null
  },
  source: {
    type: String,
    enum: ['linkedin', 'email', 'direct', 'upwork', 'fiverr', 'other'],
    default: 'direct'
  },
  sourceUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
