import { FaDownload } from 'react-icons/fa'

const About = ({ profile }) => {
  return (
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
  )
}

export default About
