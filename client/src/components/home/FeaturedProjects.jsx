import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const FeaturedProjects = ({ projects }) => {
  return (
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
  )
}

export default FeaturedProjects
