/**
 * ============================================
 * SEED DE BASE DE DATOS - ESCALABLE
 * ============================================
 * Ejecutar: cd server && npm run seed
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

// Modelos
const User = require('../models/User');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Settings = require('../models/Settings');
const Experience = require('../models/Experience');
const Certification = require('../models/Certification');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// ==================== DATOS INICIALES ====================

const adminUser = {
  name: 'David',
  email: 'admin@david.com',
  password: 'admin123',
  role: 'admin'
};

const initialProfile = {
  name: 'David',
  title: 'Desarrollador Full Stack MERN',
  bio: 'Soy un apasionado desarrollador web con experiencia en la creación de aplicaciones modernas utilizando el stack MERN (MongoDB, Express, React, Node.js). Me especializo en construir interfaces de usuario intuitivas y APIs robustas. Siempre estoy aprendiendo nuevas tecnologías y mejorando mis habilidades.',
  email: 'admin@david.com',
  phone: '+34 612 345 678',
  location: 'Madrid, España',
  social: {
    github: 'https://github.com/david',
    linkedin: 'https://linkedin.com/in/david',
    twitter: 'https://twitter.com/david',
    instagram: '',
    youtube: '',
    website: ''
  },
  stats: {
    experience: 3,
    projects: 50,
    clients: 30
  },
  services: [
    {
      title: 'Desarrollo Frontend',
      description: 'Interfaces modernas y responsivas con React, optimizadas para rendimiento y UX.',
      icon: 'FaCode'
    },
    {
      title: 'Desarrollo Backend',
      description: 'APIs REST robustas y escalables con Node.js, Express y bases de datos.',
      icon: 'FaServer'
    },
    {
      title: 'Desarrollo Full Stack',
      description: 'Aplicaciones web completas de principio a fin, desde el diseño hasta el despliegue.',
      icon: 'FaLayerGroup'
    }
  ]
};

// Habilidades organizadas por categoría - FÁCIL DE EXTENDER
const initialSkills = [
  // ===== FRONTEND =====
  { name: 'React', category: 'frontend', icon: 'FaReact', level: 95, color: 'cyan', order: 1 },
  { name: 'Vite', category: 'frontend', icon: 'SiVite', level: 90, color: 'yellow', order: 2 },
  { name: 'JavaScript ES6+', category: 'frontend', icon: 'FaJs', level: 95, color: 'yellow', order: 3 },
  { name: 'TypeScript', category: 'frontend', icon: 'SiTypescript', level: 80, color: 'blue', order: 4 },
  { name: 'HTML5', category: 'frontend', icon: 'FaHtml5', level: 95, color: 'orange', order: 5 },
  { name: 'CSS3 / SASS', category: 'frontend', icon: 'FaCss3Alt', level: 90, color: 'blue', order: 6 },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'SiTailwindcss', level: 95, color: 'cyan', order: 7 },
  { name: 'Redux Toolkit', category: 'frontend', icon: 'SiRedux', level: 85, color: 'purple', order: 8 },
  { name: 'React Router', category: 'frontend', icon: 'FaReact', level: 90, color: 'red', order: 9 },
  { name: 'React Query', category: 'frontend', icon: 'FaReact', level: 75, color: 'pink', order: 10 },
  
  // ===== BACKEND =====
  { name: 'Node.js', category: 'backend', icon: 'FaNodeJs', level: 90, color: 'green', order: 1 },
  { name: 'Express.js', category: 'backend', icon: 'SiExpress', level: 90, color: 'gray', order: 2 },
  { name: 'REST APIs', category: 'backend', icon: 'FaServer', level: 95, color: 'blue', order: 3 },
  { name: 'JWT Auth', category: 'backend', icon: 'FaLock', level: 90, color: 'red', order: 4 },
  { name: 'WebSockets', category: 'backend', icon: 'FaPlug', level: 70, color: 'yellow', order: 5 },
  { name: 'GraphQL', category: 'backend', icon: 'SiGraphql', level: 60, color: 'pink', order: 6 },
  
  // ===== DATABASE =====
  { name: 'MongoDB', category: 'database', icon: 'SiMongodb', level: 90, color: 'green', order: 1 },
  { name: 'Mongoose ODM', category: 'database', icon: 'SiMongodb', level: 90, color: 'red', order: 2 },
  { name: 'MongoDB Atlas', category: 'database', icon: 'SiMongodb', level: 85, color: 'green', order: 3 },
  { name: 'Redis', category: 'database', icon: 'SiRedis', level: 60, color: 'red', order: 4 },
  { name: 'PostgreSQL', category: 'database', icon: 'SiPostgresql', level: 50, color: 'blue', order: 5 },
  
  // ===== DEVOPS =====
  { name: 'Git / GitHub', category: 'devops', icon: 'FaGitAlt', level: 90, color: 'orange', order: 1 },
  { name: 'Docker', category: 'devops', icon: 'FaDocker', level: 75, color: 'blue', order: 2 },
  { name: 'Vercel', category: 'devops', icon: 'SiVercel', level: 90, color: 'white', order: 3 },
  { name: 'Railway', category: 'devops', icon: 'FaServer', level: 85, color: 'purple', order: 4 },
  { name: 'Netlify', category: 'devops', icon: 'SiNetlify', level: 85, color: 'cyan', order: 5 },
  { name: 'GitHub Actions', category: 'devops', icon: 'FaGithub', level: 70, color: 'gray', order: 6 },
  { name: 'Linux Basics', category: 'devops', icon: 'FaLinux', level: 65, color: 'yellow', order: 7 },
  
  // ===== TOOLS =====
  { name: 'VS Code', category: 'tools', icon: 'SiVisualstudiocode', level: 95, color: 'blue', order: 1 },
  { name: 'Postman', category: 'tools', icon: 'SiPostman', level: 90, color: 'orange', order: 2 },
  { name: 'Figma', category: 'tools', icon: 'SiFigma', level: 70, color: 'purple', order: 3 },
  { name: 'NPM / Yarn', category: 'tools', icon: 'FaNpm', level: 90, color: 'red', order: 4 },
  { name: 'ESLint / Prettier', category: 'tools', icon: 'SiEslint', level: 85, color: 'purple', order: 5 },
  
  // ===== SOFT SKILLS =====
  { name: 'Trabajo en equipo', category: 'softskills', icon: 'FaUsers', level: 90, color: 'blue', order: 1 },
  { name: 'Comunicación', category: 'softskills', icon: 'FaComments', level: 85, color: 'green', order: 2 },
  { name: 'Resolución de problemas', category: 'softskills', icon: 'FaPuzzlePiece', level: 90, color: 'yellow', order: 3 },
  { name: 'Autodidacta', category: 'softskills', icon: 'FaBook', level: 95, color: 'purple', order: 4 },
  
  // ===== LANGUAGES =====
  { name: 'Español (Nativo)', category: 'languages', icon: 'FaGlobe', level: 100, color: 'yellow', order: 1 },
  { name: 'Inglés (B2)', category: 'languages', icon: 'FaGlobe', level: 75, color: 'blue', order: 2 }
];

const initialProjects = [
  {
    title: 'E-Commerce MERN',
    description: 'Tienda online completa con carrito, pagos con Stripe, panel admin y gestión de inventario.',
    longDescription: 'Aplicación de comercio electrónico completa desarrollada con el stack MERN. Incluye autenticación de usuarios, carrito de compras persistente, integración con Stripe para pagos seguros, panel de administración para gestión de productos e inventario, sistema de reseñas y calificaciones, y notificaciones por email.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux', 'Tailwind CSS'],
    category: 'fullstack',
    status: 'completed',
    githubUrl: 'https://github.com/david/ecommerce-mern',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    order: 1
  },
  {
    title: 'Red Social Real-Time',
    description: 'Plataforma social con posts, likes, comentarios y chat en tiempo real con Socket.io.',
    longDescription: 'Red social moderna con todas las funcionalidades esenciales. Los usuarios pueden crear perfiles, publicar contenido, dar likes y comentar. Incluye sistema de seguimiento, notificaciones en tiempo real y chat privado implementado con Socket.io. Optimizada para dispositivos móviles.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Redux', 'Node.js', 'Express', 'Cloudinary'],
    category: 'fullstack',
    status: 'completed',
    githubUrl: 'https://github.com/david/social-network',
    liveUrl: 'https://social-demo.vercel.app',
    featured: true,
    order: 2
  },
  {
    title: 'Dashboard Analytics',
    description: 'Panel de administración con gráficos interactivos, reportes y gestión de usuarios.',
    longDescription: 'Dashboard administrativo completo con visualización de datos en tiempo real. Incluye gráficos interactivos con Recharts, exportación de reportes en PDF/Excel, gestión de usuarios y roles, métricas de rendimiento del negocio y sistema de alertas personalizables.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
    technologies: ['React', 'Recharts', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT'],
    category: 'fullstack',
    status: 'completed',
    githubUrl: 'https://github.com/david/dashboard',
    liveUrl: 'https://dashboard-demo.vercel.app',
    featured: true,
    order: 3
  },
  {
    title: 'Task Manager Kanban',
    description: 'Gestor de tareas estilo Trello con drag & drop, proyectos y equipos.',
    longDescription: 'Aplicación de gestión de tareas estilo Kanban. Permite crear tableros, listas y tarjetas con funcionalidad drag & drop. Incluye asignación de tareas a equipos, fechas límite, etiquetas de colores, archivos adjuntos y sistema de notificaciones.',
    image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600',
    technologies: ['React', 'DnD Kit', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    category: 'fullstack',
    status: 'completed',
    githubUrl: 'https://github.com/david/task-manager',
    liveUrl: 'https://tasks-demo.vercel.app',
    featured: false,
    order: 4
  },
  {
    title: 'API REST Documentada',
    description: 'API robusta con autenticación JWT, documentación Swagger y tests completos.',
    longDescription: 'API RESTful completamente documentada y testeada. Implementa autenticación con JWT y refresh tokens, rate limiting, validación de datos con Joi, manejo de errores centralizado, documentación interactiva con Swagger, y tests unitarios e integración con Jest.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Swagger', 'Jest', 'JWT'],
    category: 'backend',
    status: 'completed',
    githubUrl: 'https://github.com/david/rest-api',
    liveUrl: 'https://api-docs-demo.vercel.app',
    featured: false,
    order: 5
  },
  {
    title: 'Blog Platform CMS',
    description: 'Plataforma de blogs con editor rich text, categorías, SEO y sistema de comentarios.',
    longDescription: 'Plataforma de blogging moderna con CMS completo. Editor de texto enriquecido con TipTap, gestión de categorías y etiquetas, optimización SEO automática, sistema de comentarios con moderación, suscripción por email y panel de estadísticas.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600',
    technologies: ['React', 'TipTap', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    category: 'fullstack',
    status: 'inProgress',
    githubUrl: 'https://github.com/david/blog-platform',
    liveUrl: '',
    featured: false,
    order: 6
  }
];

const initialExperience = [
  {
    company: 'Tech Startup',
    position: 'Full Stack Developer',
    location: 'Madrid, España',
    locationType: 'hybrid',
    employmentType: 'fulltime',
    startDate: new Date('2022-06-01'),
    endDate: null,
    isCurrent: true,
    description: 'Desarrollo de aplicaciones web con el stack MERN. Liderazgo técnico en proyectos de cliente.',
    achievements: [
      'Reduje el tiempo de carga de la aplicación principal en un 40%',
      'Implementé CI/CD con GitHub Actions',
      'Mentoría a 2 desarrolladores junior'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    order: 1
  },
  {
    company: 'Digital Agency',
    position: 'Frontend Developer',
    location: 'Barcelona, España',
    locationType: 'remote',
    employmentType: 'fulltime',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2022-05-31'),
    isCurrent: false,
    description: 'Desarrollo de interfaces de usuario para clientes de diversos sectores.',
    achievements: [
      'Desarrollé más de 15 landing pages optimizadas',
      'Implementé sistema de componentes reutilizables',
      'Mejoré accesibilidad (WCAG 2.1 AA)'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    order: 2
  }
];

const initialCertifications = [
  {
    name: 'MongoDB Developer Certification',
    issuer: 'MongoDB University',
    credentialId: 'MDB-123456',
    credentialUrl: 'https://university.mongodb.com/certification',
    issueDate: new Date('2023-06-15'),
    hasNoExpiry: false,
    expiryDate: new Date('2026-06-15'),
    category: 'development',
    featured: true,
    skills: ['MongoDB', 'Mongoose', 'Database Design'],
    order: 1
  },
  {
    name: 'React - The Complete Guide',
    issuer: 'Udemy',
    credentialId: 'UC-12345678',
    credentialUrl: 'https://udemy.com/certificate/xxx',
    issueDate: new Date('2022-03-20'),
    hasNoExpiry: true,
    category: 'development',
    featured: true,
    skills: ['React', 'Redux', 'Hooks'],
    order: 2
  },
  {
    name: 'Node.js Developer Course',
    issuer: 'Udemy',
    credentialId: 'UC-87654321',
    credentialUrl: 'https://udemy.com/certificate/yyy',
    issueDate: new Date('2022-01-10'),
    hasNoExpiry: true,
    category: 'development',
    featured: false,
    skills: ['Node.js', 'Express', 'REST APIs'],
    order: 3
  }
];

const initialSettings = {
  siteName: 'David | Portfolio',
  siteDescription: 'Portfolio de Desarrollador Full Stack MERN',
  siteKeywords: ['desarrollador web', 'MERN stack', 'React', 'Node.js', 'portfolio'],
  theme: {
    primaryColor: '#06b6d4',
    secondaryColor: '#7c3aed',
    accentColor: '#10b981',
    backgroundColor: '#020617',
    textColor: '#ffffff',
    darkMode: true
  },
  sections: {
    hero: { enabled: true, order: 1 },
    about: { enabled: true, order: 2 },
    skills: { enabled: true, order: 3 },
    experience: { enabled: true, order: 4 },
    projects: { enabled: true, order: 5 },
    certifications: { enabled: true, order: 6 },
    services: { enabled: true, order: 7 },
    testimonials: { enabled: false, order: 8 },
    blog: { enabled: false, order: 9 },
    contact: { enabled: true, order: 10 }
  },
  languages: {
    default: 'es',
    available: [
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'en', name: 'English', flag: '🇺🇸' }
    ]
  }
};

// ==================== FUNCIÓN PRINCIPAL ====================
const seedDatabase = async () => {
  try {
    console.log('\n🔄 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Limpiar base de datos
    console.log('🧹 Limpiando base de datos...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Settings.deleteMany({}),
      Experience.deleteMany({}),
      Certification.deleteMany({})
    ]);
    console.log('   ✅ Base de datos limpia\n');

    // Crear datos
    console.log('📝 Creando datos iniciales...\n');

    // Usuario admin
    const user = await User.create(adminUser);
    console.log(`   👤 Admin creado: ${user.email}`);

    // Perfil
    await Profile.create(initialProfile);
    console.log('   📋 Perfil creado');

    // Settings
    await Settings.create(initialSettings);
    console.log('   ⚙️  Configuración creada');

    // Habilidades
    await Skill.insertMany(initialSkills);
    console.log(`   🛠️  ${initialSkills.length} habilidades creadas`);

    // Proyectos
    await Project.insertMany(initialProjects);
    console.log(`   💼 ${initialProjects.length} proyectos creados`);

    // Experiencia
    await Experience.insertMany(initialExperience);
    console.log(`   🏢 ${initialExperience.length} experiencias creadas`);

    // Certificaciones
    await Certification.insertMany(initialCertifications);
    console.log(`   📜 ${initialCertifications.length} certificaciones creadas`);

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║         🎉 BASE DE DATOS INICIALIZADA CON ÉXITO          ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║   📧 Email:     admin@david.com                          ║
║   🔑 Password:  admin123                                 ║
║                                                           ║
║   🌐 Panel Admin: http://localhost:5173/admin            ║
║                                                           ║
║   ⚠️  Recuerda cambiar la contraseña después del         ║
║      primer inicio de sesión                             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
