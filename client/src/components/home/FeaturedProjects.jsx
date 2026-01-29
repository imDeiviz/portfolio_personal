import { Link } from 'react-router-dom'

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
            <Link
              to={`/proyecto/${project._id}`}
              key={project._id}
              className="project-card group block"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image || 'https://via.placeholder.com/600x400'}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-dark-700 rounded-full text-xs text-primary-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
