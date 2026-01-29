const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    match: [/^\S+@\S+\.\S+$/, 'Email inválido']
  },
  subject: {
    type: String,
    required: [true, 'El asunto es requerido'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'El mensaje es requerido']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
