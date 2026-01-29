/**
 * ============================================
 * CONFIGURACIÓN CENTRAL DEL CLIENTE
 * ============================================
 * Todas las constantes y configuraciones del frontend
 * Modifica aquí para personalizar tu portfolio
 */

import { 
  FaReact, FaNodeJs, FaDatabase, FaTools, FaCode, FaCloud, 
  FaMobile, FaUsers, FaGlobe, FaGithub, FaLinkedin, FaTwitter,
  FaInstagram, FaYoutube, FaTwitch, FaDiscord, FaStackOverflow,
  FaMedium, FaDev, FaCodepen, FaDribbble, FaBehance
} from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

// ==================== CATEGORÍAS DE HABILIDADES ====================
// Añade nuevas categorías aquí cuando aprendas nuevas tecnologías
export const SKILL_CATEGORIES = {
  frontend: {
    name: 'Frontend',
    icon: FaReact,
    color: 'cyan',
    bgColor: 'bg-cyan-500/20',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    description: 'Desarrollo de interfaces de usuario'
  },
  backend: {
    name: 'Backend',
    icon: FaNodeJs,
    color: 'green',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/30',
    description: 'Desarrollo del lado del servidor'
  },
  database: {
    name: 'Base de Datos',
    icon: FaDatabase,
    color: 'emerald',
    bgColor: 'bg-emerald-500/20',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    description: 'Gestión y diseño de bases de datos'
  },
  devops: {
    name: 'DevOps & Cloud',
    icon: FaCloud,
    color: 'blue',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    description: 'Infraestructura y despliegue'
  },
  mobile: {
    name: 'Mobile',
    icon: FaMobile,
    color: 'purple',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    description: 'Desarrollo de aplicaciones móviles'
  },
  tools: {
    name: 'Herramientas',
    icon: FaTools,
    color: 'violet',
    bgColor: 'bg-violet-500/20',
    textColor: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    description: 'Herramientas de desarrollo'
  },
  softskills: {
    name: 'Soft Skills',
    icon: FaUsers,
    color: 'pink',
    bgColor: 'bg-pink-500/20',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    description: 'Habilidades blandas'
  },
  languages: {
    name: 'Idiomas',
    icon: FaGlobe,
    color: 'yellow',
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    description: 'Idiomas que dominas'
  },
  other: {
    name: 'Otros',
    icon: FaCode,
    color: 'gray',
    bgColor: 'bg-gray-500/20',
    textColor: 'text-gray-400',
    borderColor: 'border-gray-500/30',
    description: 'Otras habilidades'
  }
};

// ==================== CATEGORÍAS DE PROYECTOS ====================
export const PROJECT_CATEGORIES = {
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

// ==================== REDES SOCIALES ====================
export const SOCIAL_PLATFORMS = {
  github: { name: 'GitHub', icon: FaGithub, color: '#333', hoverColor: 'hover:text-white' },
  linkedin: { name: 'LinkedIn', icon: FaLinkedin, color: '#0077B5', hoverColor: 'hover:text-blue-500' },
  twitter: { name: 'Twitter/X', icon: FaTwitter, color: '#1DA1F2', hoverColor: 'hover:text-blue-400' },
  instagram: { name: 'Instagram', icon: FaInstagram, color: '#E4405F', hoverColor: 'hover:text-pink-500' },
  youtube: { name: 'YouTube', icon: FaYoutube, color: '#FF0000', hoverColor: 'hover:text-red-500' },
  twitch: { name: 'Twitch', icon: FaTwitch, color: '#9146FF', hoverColor: 'hover:text-purple-500' },
  discord: { name: 'Discord', icon: FaDiscord, color: '#5865F2', hoverColor: 'hover:text-indigo-500' },
  stackoverflow: { name: 'Stack Overflow', icon: FaStackOverflow, color: '#F58025', hoverColor: 'hover:text-orange-500' },
  medium: { name: 'Medium', icon: FaMedium, color: '#00AB6C', hoverColor: 'hover:text-green-500' },
  devto: { name: 'Dev.to', icon: FaDev, color: '#0A0A0A', hoverColor: 'hover:text-white' },
  codepen: { name: 'CodePen', icon: FaCodepen, color: '#000000', hoverColor: 'hover:text-white' },
  dribbble: { name: 'Dribbble', icon: FaDribbble, color: '#EA4C89', hoverColor: 'hover:text-pink-400' },
  behance: { name: 'Behance', icon: FaBehance, color: '#1769FF', hoverColor: 'hover:text-blue-600' },
  website: { name: 'Sitio Web', icon: FaGlobe, color: '#4CAF50', hoverColor: 'hover:text-green-400' }
};

// ==================== ICONOS DE TECNOLOGÍAS ====================
// Mapeo de nombres de tecnología a iconos
export const TECH_ICONS = {
  'react': FaReact,
  'node.js': FaNodeJs,
  'nodejs': FaNodeJs,
  'mongodb': SiMongodb,
  'express': SiExpress,
  'typescript': SiTypescript,
  'tailwind': SiTailwindcss,
  'tailwindcss': SiTailwindcss,
  // Añade más según necesites
};

// ==================== NIVELES DE HABILIDAD ====================
export const SKILL_LEVELS = [
  { min: 0, max: 30, label: 'Principiante', color: 'bg-gray-500' },
  { min: 31, max: 60, label: 'Intermedio', color: 'bg-yellow-500' },
  { min: 61, max: 85, label: 'Avanzado', color: 'bg-blue-500' },
  { min: 86, max: 100, label: 'Experto', color: 'bg-green-500' }
];

// ==================== ESTADOS DE PROYECTO ====================
export const PROJECT_STATUS = {
  completed: { name: 'Completado', color: 'green', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
  inProgress: { name: 'En Progreso', color: 'yellow', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
  planned: { name: 'Planificado', color: 'blue', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
  maintenance: { name: 'En Mantenimiento', color: 'orange', bgColor: 'bg-orange-500/20', textColor: 'text-orange-400' }
};

// ==================== TIPOS DE EMPLEO ====================
export const EMPLOYMENT_TYPES = {
  fulltime: { name: 'Tiempo Completo', short: 'Full-time' },
  parttime: { name: 'Medio Tiempo', short: 'Part-time' },
  contract: { name: 'Contrato', short: 'Contract' },
  freelance: { name: 'Freelance', short: 'Freelance' },
  internship: { name: 'Prácticas', short: 'Internship' }
};

// ==================== TIPOS DE UBICACIÓN ====================
export const LOCATION_TYPES = {
  onsite: { name: 'Presencial', icon: '🏢' },
  remote: { name: 'Remoto', icon: '🏠' },
  hybrid: { name: 'Híbrido', icon: '🔄' }
};

// ==================== ANIMACIONES ====================
export const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  }
};

// ==================== BREAKPOINTS ====================
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

// ==================== CONFIGURACIÓN DEL TEMA ====================
export const THEME = {
  colors: {
    primary: 'cyan',
    secondary: 'violet',
    accent: 'emerald'
  },
  gradients: {
    primary: 'from-cyan-500 to-violet-600',
    secondary: 'from-violet-500 to-purple-600',
    accent: 'from-emerald-500 to-cyan-600'
  }
};

// ==================== SECCIONES DEL PORTFOLIO ====================
// Modifica para añadir/quitar secciones
export const PORTFOLIO_SECTIONS = [
  { id: 'hero', name: 'Inicio', href: '#inicio' },
  { id: 'about', name: 'Sobre Mí', href: '#sobre-mi' },
  { id: 'skills', name: 'Habilidades', href: '#habilidades' },
  { id: 'experience', name: 'Experiencia', href: '#experiencia' },
  { id: 'projects', name: 'Proyectos', href: '#proyectos' },
  { id: 'certifications', name: 'Certificaciones', href: '#certificaciones' },
  { id: 'services', name: 'Servicios', href: '#servicios' },
  { id: 'testimonials', name: 'Testimonios', href: '#testimonios' },
  { id: 'contact', name: 'Contacto', href: '#contacto' }
];

export default {
  SKILL_CATEGORIES,
  PROJECT_CATEGORIES,
  SOCIAL_PLATFORMS,
  TECH_ICONS,
  SKILL_LEVELS,
  PROJECT_STATUS,
  EMPLOYMENT_TYPES,
  LOCATION_TYPES,
  ANIMATIONS,
  BREAKPOINTS,
  THEME,
  PORTFOLIO_SECTIONS
};
