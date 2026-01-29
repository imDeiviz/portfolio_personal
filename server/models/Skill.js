const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'tools', 'softskills', 'languages', 'other'],
    default: 'other'
  },
  icon: {
    type: String,
    default: 'fas fa-code'
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    default: 80
  },
  color: {
    type: String,
    default: 'cyan'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
