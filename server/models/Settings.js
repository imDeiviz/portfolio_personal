/**
 * ============================================
 * MODELO DE CONFIGURACIÓN DEL SITIO
 * ============================================
 * Permite configurar aspectos globales del portfolio
 * sin necesidad de modificar código
 */

const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  // Información del sitio
  siteName: {
    type: String,
    default: 'Mi Portfolio'
  },
  siteDescription: {
    type: String,
    default: 'Portfolio de Desarrollador Web'
  },
  siteKeywords: [{
    type: String
  }],
  
  // Logo y favicon
  logo: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  
  // Tema y colores personalizables
  theme: {
    primaryColor: { type: String, default: '#06b6d4' }, // cyan-500
    secondaryColor: { type: String, default: '#7c3aed' }, // violet-600
    accentColor: { type: String, default: '#10b981' }, // emerald-500
    backgroundColor: { type: String, default: '#020617' }, // dark-950
    textColor: { type: String, default: '#ffffff' },
    darkMode: { type: Boolean, default: true }
  },
  
  // Secciones activas - permite ocultar/mostrar secciones
  sections: {
    hero: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 1 } },
    about: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 2 } },
    skills: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 3 } },
    projects: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 4 } },
    experience: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 5 } },
    education: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 6 } },
    certifications: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 7 } },
    services: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 8 } },
    testimonials: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 9 } },
    blog: { enabled: { type: Boolean, default: false }, order: { type: Number, default: 10 } },
    contact: { enabled: { type: Boolean, default: true }, order: { type: Number, default: 11 } }
  },
  
  // Configuración de contacto
  contact: {
    emailNotifications: { type: Boolean, default: true },
    notificationEmail: { type: String, default: '' },
    autoReply: { type: Boolean, default: false },
    autoReplyMessage: { type: String, default: '' }
  },
  
  // SEO
  seo: {
    googleAnalyticsId: { type: String, default: '' },
    googleTagManagerId: { type: String, default: '' },
    facebookPixelId: { type: String, default: '' },
    enableSitemap: { type: Boolean, default: true },
    enableRobotsTxt: { type: Boolean, default: true }
  },
  
  // Integraciones externas
  integrations: {
    calendlyUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    blogRssUrl: { type: String, default: '' }
  },
  
  // Configuración de idiomas (preparado para i18n)
  languages: {
    default: { type: String, default: 'es' },
    available: [{ 
      code: { type: String },
      name: { type: String },
      flag: { type: String }
    }]
  },
  
  // Modo mantenimiento
  maintenance: {
    enabled: { type: Boolean, default: false },
    message: { type: String, default: 'Sitio en mantenimiento. Volvemos pronto.' },
    allowedIPs: [{ type: String }]
  },
  
  // Metadatos
  updatedAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Singleton - solo puede haber una configuración
SettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({
      languages: {
        default: 'es',
        available: [
          { code: 'es', name: 'Español', flag: '🇪🇸' },
          { code: 'en', name: 'English', flag: '🇺🇸' }
        ]
      }
    });
  }
  return settings;
};

module.exports = mongoose.model('Settings', SettingsSchema);
