const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Tu Nombre'
  },
  title: {
    type: String,
    default: 'Desarrollador MERN Stack'
  },
  bio: {
    type: String,
    default: 'Desarrollador Full Stack apasionado por crear aplicaciones web modernas y escalables.'
  },
  avatar: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: 'tu@email.com'
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: 'Tu Ciudad, País'
  },
  social: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  stats: {
    experience: { type: Number, default: 3 },
    projects: { type: Number, default: 50 },
    clients: { type: Number, default: 30 }
  },
  services: [{
    title: String,
    description: String,
    icon: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Solo puede haber un perfil
ProfileSchema.statics.getProfile = async function() {
  let profile = await this.findOne();
  if (!profile) {
    profile = await this.create({});
  }
  return profile;
};

module.exports = mongoose.model('Profile', ProfileSchema);
