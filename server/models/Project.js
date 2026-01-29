const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [100, 'Máximo 100 caracteres']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    maxlength: [500, 'Máximo 500 caracteres']
  },
  longDescription: {
    type: String,
    maxlength: [2000, 'Máximo 2000 caracteres']
  },
  image: {
    type: String,
    default: 'https://placehold.co/600x400?text=Proyecto'
  },
  images: [{
    type: String
  }],
  technologies: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'mobile', 'other'],
    default: 'fullstack'
  },
  githubUrl: {
    type: String,
    default: ''
  },
  liveUrl: {
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
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generar slug antes de guardar
ProjectSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
