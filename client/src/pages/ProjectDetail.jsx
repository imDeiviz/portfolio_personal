import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa'
import { projectsAPI } from '../services/api'

const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProject()
  }, [slug])

  const loadProject = async () => {
    try {
      const response = await projectsAPI.getOne(slug)
      setProject(response.data.data)
    } catch (error) {
      console.error('Error loading project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="spinner w-16 h-16"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-3xl font-bold mb-4">Proyecto no encontrado</h1>
        <Link to="/" className="text-primary-400 hover:underline flex items-center gap-2">
          <FaArrowLeft /> Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/#proyectos" className="inline-flex items-center gap-2 text-dark-400 hover:text-white mb-8 transition-colors">
          <FaArrowLeft /> Volver a proyectos
        </Link>
        
        <div className="rounded-2xl overflow-hidden mb-8">
          <img 
            src={project.image || 'https://via.placeholder.com/800x400'} 
            alt={project.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {project.technologies?.map((tech, i) => (
            <span key={i} className="px-4 py-2 bg-dark-800 rounded-full text-sm text-primary-400">
              {tech}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        
        <p className="text-xl text-dark-400 mb-8">{project.description}</p>
        
        {project.longDescription && (
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-dark-300 leading-relaxed whitespace-pre-wrap">{project.longDescription}</p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <FaGithub /> Ver Código
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <FaExternalLinkAlt /> Ver Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
