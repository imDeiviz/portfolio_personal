/**
 * ============================================
 * MODELO DE EXPERIENCIA LABORAL
 * ============================================
 * Para mostrar tu trayectoria profesional
 */

const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'El nombre de la empresa es requerido'],
    trim: true
  },
  companyLogo: {
    type: String,
    default: ''
  },
  companyUrl: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    required: [true, 'El puesto es requerido'],
    trim: true
  },
  location: {
    type: String,
    default: ''
  },
  locationType: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    default: 'onsite'
  },
  employmentType: {
    type: String,
    enum: ['fulltime', 'parttime', 'contract', 'freelance', 'internship'],
    default: 'fulltime'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    default: null // null = trabajo actual
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  achievements: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
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

// Virtual para calcular duración
ExperienceSchema.virtual('duration').get(function() {
  const end = this.endDate || new Date();
  const months = (end.getFullYear() - this.startDate.getFullYear()) * 12 + 
                 (end.getMonth() - this.startDate.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0 && remainingMonths > 0) {
    return `${years} año${years > 1 ? 's' : ''} y ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
  } else if (years > 0) {
    return `${years} año${years > 1 ? 's' : ''}`;
  } else {
    return `${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
  }
});

ExperienceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
