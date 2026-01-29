import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowRight, 
  FaDownload, FaChevronDown, FaReact, FaNodeJs, FaDatabase,
  FaCode, FaServer, FaLayerGroup, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaWhatsapp, FaPaperPlane, FaExternalLinkAlt, FaCheck
} from 'react-icons/fa'
import { profileAPI, projectsAPI, skillsAPI, messagesAPI } from '../services/api'

const Home = () => {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState({ grouped: {} })
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        profileAPI.get(),
        projectsAPI.getAll({ featured: true, limit: 6 }),
        skillsAPI.getAll()
      ])
      setProfile(profileRes.data.data)
      setProjects(projectsRes.data.data)
      setSkills(skillsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await messagesAPI.send(formData)
      toast.success('¡Mensaje enviado correctamente!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al enviar mensaje')
    } finally {
      setSending(false)
    }
  }

  const categoryIcons = {
    frontend: { icon: FaReact, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
    backend: { icon: FaNodeJs, color: 'text-green-500', bg: 'bg-green-500/20' },
    database: { icon: FaDatabase, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    tools: { icon: FaCode, color: 'text-violet-400', bg: 'bg-violet-500/20' }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-16 h-16"></div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Blobs */}
        <div className="absolute w-96 h-96 bg-primary-500 rounded-full filter blur-[80px] opacity-30 
          top-20 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-secondary-600 rounded-full filter blur-[80px] opacity-30 
          bottom-20 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center lg:text-left">
            <p className="text-primary-400 font-medium mb-4 tracking-wider">👋 ¡Hola! Soy</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">{profile?.name || 'Tu Nombre'}</span><br />
              <span className="gradient-text">{profile?.title || 'MERN Developer'}</span>
            </h1>
            <p className="text-xl text-dark-400 mb-8 max-w-xl">
              {profile?.bio || 'Desarrollador Full Stack especializado en React, Node.js, Express y MongoDB.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#proyectos" className="btn-primary flex items-center gap-2">
                Ver Proyectos <FaArrowRight />
              </a>
              <a href="#contacto" className="btn-secondary">
                Contactar
              </a>
            </div>
            <div className="flex gap-6 mt-10 justify-center lg:justify-start">
              {profile?.social?.github && (
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" 
                  className="text-2xl text-dark-400 hover:text-primary-400 transition-colors">
                  <FaGithub />
                </a>
              )}
              {profile?.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-2xl text-dark-400 hover:text-blue-400 transition-colors">
                  <FaLinkedin />
                </a>
              )}
              {profile?.social?.twitter && (
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-2xl text-dark-400 hover:text-blue-300 transition-colors">
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 p-1 floating glow">
              <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center overflow-hidden">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-8xl">👨‍💻</span>
                )}
              </div>
            </div>
            {/* Floating Icons */}
            <div className="absolute -top-4 right-10 bg-dark-800 p-4 rounded-xl shadow-xl floating" 
              style={{ animationDelay: '-1s' }}>
              <FaReact className="text-4xl text-cyan-400" />
            </div>
            <div className="absolute top-20 -left-4 bg-dark-800 p-4 rounded-xl shadow-xl floating" 
              style={{ animationDelay: '-2s' }}>
              <FaNodeJs className="text-4xl text-green-500" />
            </div>
            <div className="absolute bottom-10 -right-4 bg-dark-800 p-4 rounded-xl shadow-xl floating" 
              style={{ animationDelay: '-0.5s' }}>
              <FaDatabase className="text-4xl text-emerald-400" />
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <a href="#sobre-mi" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-dark-400 hover:text-white">
          <FaChevronDown className="text-2xl" />
        </a>
      </section>

      {/* Sobre Mí */}
      <section id="sobre-mi" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium mb-2">CONÓCEME</p>
            <h2 className="text-4xl md:text-5xl font-bold">Sobre <span className="gradient-text">Mí</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-primary-500/10 to-secondary-600/10 rounded-3xl p-8 border border-dark-800">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-dark-800/50 rounded-2xl p-6 text-center">
                  <h3 className="text-4xl font-bold gradient-text">{profile?.stats?.experience || 3}+</h3>
                  <p className="text-dark-400 mt-2">Años de Experiencia</p>
                </div>
                <div className="bg-dark-800/50 rounded-2xl p-6 text-center">
                  <h3 className="text-4xl font-bold gradient-text">{profile?.stats?.projects || 50}+</h3>
                  <p className="text-dark-400 mt-2">Proyectos</p>
                </div>
                <div className="bg-dark-800/50 rounded-2xl p-6 text-center">
                  <h3 className="text-4xl font-bold gradient-text">{profile?.stats?.clients || 30}+</h3>
                  <p className="text-dark-400 mt-2">Clientes</p>
                </div>
                <div className="bg-dark-800/50 rounded-2xl p-6 text-center">
                  <h3 className="text-4xl font-bold gradient-text">100%</h3>
                  <p className="text-dark-400 mt-2">Compromiso</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">{profile?.title || 'Desarrollador Full Stack MERN'}</h3>
              <p className="text-dark-400 mb-6 leading-relaxed">{profile?.bio}</p>
              {profile?.resume && (
                <a href={profile.resume} download className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium">
                  <FaDownload /> Descargar CV
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Habilidades */}
      <section id="habilidades" className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium mb-2">MI STACK</p>
            <h2 className="text-4xl md:text-5xl font-bold">Tecnologías y <span className="gradient-text">Habilidades</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills.grouped || {}).map(([category, categorySkills]) => {
              const cat = categoryIcons[category] || categoryIcons.tools
              const Icon = cat.icon
              return (
                <div key={category} className="skill-card">
                  <div className={`w-14 h-14 ${cat.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`text-3xl ${cat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 capitalize">{category}</h3>
                  <ul className="space-y-2 text-dark-400">
                    {categorySkills.slice(0, 4).map((skill) => (
                      <li key={skill._id} className="flex items-center gap-2">
                        <FaCheck className={`text-sm ${cat.color}`} />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium mb-2">MI TRABAJO</p>
            <h2 className="text-4xl md:text-5xl font-bold">Proyectos <span className="gradient-text">Destacados</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image || 'https://via.placeholder.com/600x400'} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-400 transition-colors">
                        <FaGithub className="text-xl" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="w-12 h-12 bg-secondary-600 rounded-full flex items-center justify-center hover:bg-secondary-500 transition-colors">
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-dark-700 rounded-full text-xs text-primary-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium mb-2">LO QUE OFREZCO</p>
            <h2 className="text-4xl md:text-5xl font-bold">Mis <span className="gradient-text">Servicios</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group hover:border-primary-500/50">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl 
                flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaCode className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Desarrollo Frontend</h3>
              <p className="text-dark-400">Interfaces modernas y responsivas con React + Vite, optimizadas para rendimiento.</p>
            </div>
            
            <div className="card group hover:border-green-500/50">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl 
                flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaServer className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Desarrollo Backend</h3>
              <p className="text-dark-400">APIs REST robustas y escalables con Node.js y Express.</p>
            </div>
            
            <div className="card group hover:border-secondary-500/50">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-2xl 
                flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaLayerGroup className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Desarrollo Full Stack</h3>
              <p className="text-dark-400">Aplicaciones web completas de principio a fin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-secondary-600 rounded-full filter blur-[80px] opacity-20 -bottom-48 -left-48"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary-400 font-medium mb-2">HABLEMOS</p>
            <h2 className="text-4xl md:text-5xl font-bold">Contáctame</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">¿Tienes un proyecto en mente?</h3>
              <p className="text-dark-400 mb-8">
                Estoy disponible para proyectos freelance y oportunidades laborales.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-dark-800 rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-xl text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">Email</p>
                    <a href={`mailto:${profile?.email}`} className="text-lg hover:text-primary-400 transition-colors">
                      {profile?.email}
                    </a>
                  </div>
                </div>
                
                {profile?.phone && (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-dark-800 rounded-xl flex items-center justify-center">
                      <FaPhone className="text-xl text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-dark-400">Teléfono</p>
                      <a href={`tel:${profile.phone}`} className="text-lg hover:text-green-400 transition-colors">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-dark-800 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">Ubicación</p>
                    <p className="text-lg">{profile?.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="input" 
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Asunto</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Asunto del mensaje"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required 
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea 
                  rows="5" 
                  className="input resize-none" 
                  placeholder="Cuéntame sobre tu proyecto..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={sending}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <div className="spinner w-5 h-5 border-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Mensaje <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
