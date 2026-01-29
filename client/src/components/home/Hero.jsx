import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaChevronDown, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'

const Hero = ({ profile }) => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Blobs */}
      {/* Background Blobs */}
      <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-primary-500 rounded-full filter blur-3xl opacity-30 
        -top-10 -left-20 animate-pulse"></div>
      <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-secondary-600 rounded-full filter blur-3xl opacity-30 
        -bottom-10 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left">
          <p className="text-primary-400 font-medium mb-4 tracking-wider">👋 ¡Hola! Soy</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white block sm:inline">{profile?.name || 'Tu Nombre'} </span>
            <span className="gradient-text block sm:inline">{profile?.title || 'MERN Developer'}</span>
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

        <div className="relative flex justify-center order-first lg:order-last mb-12 lg:mb-0">
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 p-1 floating glow">
            <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center overflow-hidden">
              {profile?.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <span className="text-6xl sm:text-8xl">👨‍💻</span>
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
  )
}

export default Hero
