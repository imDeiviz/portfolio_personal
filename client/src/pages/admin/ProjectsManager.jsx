import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  FaPlus, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt,
  FaTimes, FaSave, FaStar, FaEye, FaEyeSlash, FaProjectDiagram
} from 'react-icons/fa'
import { projectsAPI } from '../../services/api'

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: '',
    category: 'fullstack',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    isActive: true,
    order: 0
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAllAdmin()
      setProjects(response.data.data)
    } catch (error) {
      toast.error('Error al cargar proyectos')
    } finally {
      setLoading(false)
    }
  }

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        longDescription: project.longDescription || '',
        technologies: project.technologies.join(', '),
        category: project.category,
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        featured: project.featured,
        isActive: project.isActive,
        order: project.order
      })
      setImagePreview(project.image)
    } else {
      setEditingProject(null)
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        technologies: '',
        category: 'fullstack',
        githubUrl: '',
        liveUrl: '',
        featured: false,
        isActive: true,
        order: projects.length
      })
      setImagePreview('')
    }
    setImageFile(null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProject(null)
    setImageFile(null)
    setImagePreview('')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key])
      })
      if (imageFile) {
        data.append('image', imageFile)
      }

      if (editingProject) {
        await projectsAPI.update(editingProject._id, formData, imageFile)
        toast.success('Proyecto actualizado correctamente')
      } else {
        await projectsAPI.create(formData, imageFile)
        toast.success('Proyecto creado correctamente')
      }

      closeModal()
      loadProjects()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar proyecto')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return

    try {
      await projectsAPI.delete(id)
      toast.success('Proyecto eliminado')
      loadProjects()
    } catch (error) {
      toast.error('Error al eliminar proyecto')
    }
  }

  const toggleFeatured = async (project) => {
    try {
      const data = new FormData()
      data.append('featured', !project.featured)
      await projectsAPI.update(project._id, data)
      loadProjects()
      toast.success(project.featured ? 'Quitado de destacados' : 'Añadido a destacados')
    } catch (error) {
      toast.error('Error al actualizar')
    }
  }

  const toggleActive = async (project) => {
    try {
      const data = new FormData()
      data.append('isActive', !project.isActive)
      await projectsAPI.update(project._id, data)
      loadProjects()
      toast.success(project.isActive ? 'Proyecto ocultado' : 'Proyecto visible')
    } catch (error) {
      toast.error('Error al actualizar')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-dark-400">Gestiona los proyectos de tu portfolio</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <FaPlus /> Nuevo Proyecto
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className={`bg-dark-800/50 rounded-2xl overflow-hidden border transition-all
              ${project.isActive ? 'border-dark-700' : 'border-red-500/30 opacity-60'}`}
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={project.image || 'https://via.placeholder.com/400x200'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-500/90 rounded-full text-xs font-medium flex items-center gap-1">
                    <FaStar /> Destacado
                  </span>
                )}
                {!project.isActive && (
                  <span className="px-2 py-1 bg-red-500/90 rounded-full text-xs font-medium">
                    Oculto
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              <p className="text-dark-400 text-sm line-clamp-2 mb-3">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 bg-dark-700 rounded text-xs text-primary-400">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-0.5 bg-dark-700 rounded text-xs text-dark-400">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-dark-700">
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="text-dark-400 hover:text-white transition-colors">
                      <FaGithub />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-dark-400 hover:text-white transition-colors">
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`p-2 rounded-lg transition-colors ${project.featured ? 'text-yellow-400 bg-yellow-500/10' : 'text-dark-400 hover:bg-dark-700'
                      }`}
                    title={project.featured ? 'Quitar de destacados' : 'Destacar'}
                  >
                    <FaStar />
                  </button>
                  <button
                    onClick={() => toggleActive(project)}
                    className={`p-2 rounded-lg transition-colors ${project.isActive ? 'text-dark-400 hover:bg-dark-700' : 'text-red-400 bg-red-500/10'
                      }`}
                    title={project.isActive ? 'Ocultar' : 'Mostrar'}
                  >
                    {project.isActive ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 text-dark-400 hover:bg-dark-700 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-dark-800/50 rounded-2xl border border-dark-700">
          <FaProjectDiagram className="text-5xl text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No hay proyectos aún</p>
          <button onClick={() => openModal()} className="btn-primary mt-4">
            Crear primer proyecto
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-dark-900 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border-t sm:border border-dark-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-dark-700 sticky top-0 bg-dark-900">
              <h2 className="text-xl font-bold">
                {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h2>
              <button onClick={closeModal} className="text-dark-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Imagen del Proyecto</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 bg-dark-800 rounded-xl overflow-hidden border border-dark-700">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-dark-500">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-dark-400 file:mr-4 file:py-2 file:px-4 file:rounded-full 
                      file:border-0 file:bg-primary-500/20 file:text-primary-400 hover:file:bg-primary-500/30"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  placeholder="Nombre del proyecto"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Descripción Corta *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input resize-none"
                  rows="2"
                  placeholder="Breve descripción del proyecto"
                  required
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Descripción Completa</label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="input resize-none"
                  rows="4"
                  placeholder="Descripción detallada del proyecto, tecnologías utilizadas, desafíos..."
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-2">Tecnologías *</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="input"
                  placeholder="React, Node.js, MongoDB (separadas por coma)"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Full Stack</option>
                  <option value="mobile">Mobile</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* URLs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaGithub className="inline mr-2" /> URL GitHub
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="input"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaExternalLinkAlt className="inline mr-2" /> URL Demo
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="input"
                    placeholder="https://demo.com/..."
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded bg-dark-800 border-dark-600 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm"><FaStar className="inline text-yellow-400 mr-1" /> Destacado</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 rounded bg-dark-800 border-dark-600 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm"><FaEye className="inline text-green-400 mr-1" /> Visible</span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4 border-t border-dark-700">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {saving ? (
                    <>
                      <div className="spinner w-5 h-5 border-2"></div> Guardando...
                    </>
                  ) : (
                    <>
                      <FaSave /> {editingProject ? 'Actualizar' : 'Crear'} Proyecto
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsManager
