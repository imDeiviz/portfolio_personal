/**
 * ============================================
 * MODELO DE EDUCACIÓN
 * ============================================
 * Formación académica y cursos
 */

const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: [true, 'La institución es requerida'],
    trim: true
  },
  institutionLogo: {
    type: String,
    default: ''
  },
  institutionUrl: {
    type: String,
    default: ''
  },
  degree: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  field: {
    type: String,
    default: ''
  },
  degreeType: {
    type: String,
    enum: ['highschool', 'associate', 'bachelor', 'master', 'doctorate', 'bootcamp', 'course', 'certification', 'other'],
    default: 'other'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    default: null
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  grade: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  achievements: [{
    type: String
  }],
  skills: [{
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

module.exports = mongoose.model('Education', EducationSchema);
