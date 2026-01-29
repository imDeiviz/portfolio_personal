/**
 * ============================================
 * CONFIGURACIÓN CENTRAL DEL SERVIDOR
 * ============================================
 * Aquí se definen todas las constantes y configuraciones
 * que se pueden modificar fácilmente para escalar la aplicación
 */

// Categorías de habilidades - Añade nuevas aquí
const SKILL_CATEGORIES = {
  frontend: {
    name: 'Frontend',
    icon: 'FaReact',
    color: 'cyan',
    order: 1
  },
  backend: {
    name: 'Backend',
    icon: 'FaNodeJs',
    color: 'green',
    order: 2
  },
  database: {
    name: 'Base de Datos',
    icon: 'FaDatabase',
    color: 'emerald',
    order: 3
  },
  devops: {
    name: 'DevOps & Cloud',
    icon: 'FaCloud',
    color: 'blue',
    order: 4
  },
  mobile: {
    name: 'Mobile',
    icon: 'FaMobile',
    color: 'purple',
    order: 5
  },
  tools: {
    name: 'Herramientas',
    icon: 'FaTools',
    color: 'violet',
    order: 6
  },
  softskills: {
    name: 'Soft Skills',
    icon: 'FaUsers',
    color: 'pink',
    order: 7
  },
  languages: {
    name: 'Idiomas',
    icon: 'FaGlobe',
    color: 'yellow',
    order: 8
  },
  other: {
    name: 'Otros',
    icon: 'FaCode',
    color: 'gray',
    order: 99
  }
};

// Categorías de proyectos - Añade nuevas aquí
const PROJECT_CATEGORIES = {
  frontend: { name: 'Frontend', color: 'cyan' },
  backend: { name: 'Backend', color: 'green' },
  fullstack: { name: 'Full Stack', color: 'violet' },
  mobile: { name: 'Mobile', color: 'purple' },
  api: { name: 'API', color: 'yellow' },
  ecommerce: { name: 'E-Commerce', color: 'pink' },
  saas: { name: 'SaaS', color: 'blue' },
  opensource: { name: 'Open Source', color: 'orange' },
  other: { name: 'Otro', color: 'gray' }
};

// Tipos de servicios ofrecidos
const SERVICE_TYPES = {
  development: { name: 'Desarrollo', icon: 'FaCode' },
  consulting: { name: 'Consultoría', icon: 'FaLightbulb' },
  maintenance: { name: 'Mantenimiento', icon: 'FaWrench' },
  training: { name: 'Formación', icon: 'FaGraduationCap' }
};

// Niveles de habilidad
const SKILL_LEVELS = {
  beginner: { name: 'Principiante', min: 0, max: 30 },
  intermediate: { name: 'Intermedio', min: 31, max: 60 },
  advanced: { name: 'Avanzado', min: 61, max: 85 },
  expert: { name: 'Experto', min: 86, max: 100 }
};

// Estados de proyectos
const PROJECT_STATUS = {
  completed: { name: 'Completado', color: 'green' },
  inProgress: { name: 'En Progreso', color: 'yellow' },
  planned: { name: 'Planificado', color: 'blue' },
  maintenance: { name: 'En Mantenimiento', color: 'orange' }
};

// Redes sociales soportadas - Añade nuevas aquí
const SOCIAL_PLATFORMS = {
  github: { name: 'GitHub', icon: 'FaGithub', color: '#333', urlPrefix: 'https://github.com/' },
  linkedin: { name: 'LinkedIn', icon: 'FaLinkedin', color: '#0077B5', urlPrefix: 'https://linkedin.com/in/' },
  twitter: { name: 'Twitter/X', icon: 'FaTwitter', color: '#1DA1F2', urlPrefix: 'https://twitter.com/' },
  instagram: { name: 'Instagram', icon: 'FaInstagram', color: '#E4405F', urlPrefix: 'https://instagram.com/' },
  youtube: { name: 'YouTube', icon: 'FaYoutube', color: '#FF0000', urlPrefix: 'https://youtube.com/@' },
  twitch: { name: 'Twitch', icon: 'FaTwitch', color: '#9146FF', urlPrefix: 'https://twitch.tv/' },
  discord: { name: 'Discord', icon: 'FaDiscord', color: '#5865F2', urlPrefix: '' },
  stackoverflow: { name: 'Stack Overflow', icon: 'FaStackOverflow', color: '#F58025', urlPrefix: 'https://stackoverflow.com/users/' },
  medium: { name: 'Medium', icon: 'FaMedium', color: '#00AB6C', urlPrefix: 'https://medium.com/@' },
  devto: { name: 'Dev.to', icon: 'FaDev', color: '#0A0A0A', urlPrefix: 'https://dev.to/' },
  codepen: { name: 'CodePen', icon: 'FaCodepen', color: '#000000', urlPrefix: 'https://codepen.io/' },
  dribbble: { name: 'Dribbble', icon: 'FaDribbble', color: '#EA4C89', urlPrefix: 'https://dribbble.com/' },
  behance: { name: 'Behance', icon: 'FaBehance', color: '#1769FF', urlPrefix: 'https://behance.net/' },
  website: { name: 'Sitio Web', icon: 'FaGlobe', color: '#4CAF50', urlPrefix: '' }
};

// Configuración de uploads
const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  allowedDocTypes: ['application/pdf'],
  imageQuality: 80,
  thumbnailSize: { width: 300, height: 200 }
};

// Configuración de paginación
const PAGINATION = {
  defaultLimit: 10,
  maxLimit: 100
};

// Configuración de rate limiting
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo de requests por ventana
};

module.exports = {
  SKILL_CATEGORIES,
  PROJECT_CATEGORIES,
  SERVICE_TYPES,
  SKILL_LEVELS,
  PROJECT_STATUS,
  SOCIAL_PLATFORMS,
  UPLOAD_CONFIG,
  PAGINATION,
  RATE_LIMIT
};
