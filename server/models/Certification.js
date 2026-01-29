/**
 * ============================================
 * MODELO DE CERTIFICACIONES
 * ============================================
 * Certificados y credenciales profesionales
 */

const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  issuer: {
    type: String,
    required: [true, 'El emisor es requerido'],
    trim: true
  },
  issuerLogo: {
    type: String,
    default: ''
  },
  credentialId: {
    type: String,
    default: ''
  },
  credentialUrl: {
    type: String,
    default: ''
  },
  issueDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    default: null // null = no expira
  },
  hasNoExpiry: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: ''
  },
  skills: [{
    type: String
  }],
  category: {
    type: String,
    enum: ['cloud', 'development', 'security', 'data', 'design', 'management', 'other'],
    default: 'development'
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

// Virtual para verificar si está expirada
CertificationSchema.virtual('isExpired').get(function() {
  if (this.hasNoExpiry || !this.expiryDate) return false;
  return new Date() > this.expiryDate;
});

CertificationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Certification', CertificationSchema);
