import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaReact, FaNodeJs, 
  FaDatabase, FaTools, FaCode, FaEye, FaEyeSlash 
} from 'react-icons/fa'
import { skillsAPI } from '../../services/api'

const categoryConfig = {
  frontend: { label: 'Frontend', icon: FaReact, color: 'cyan' },
  backend: { label: 'Backend', icon: FaNodeJs, color: 'green' },
  database: { label: 'Base de Datos', icon: FaDatabase, color: 'emerald' },
  tools: { label: 'Herramientas', icon: FaTools, color: 'violet' },
  other: { label: 'Otros', icon: FaCode, color: 'gray' }
}

const SkillsManager = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    icon: 'FaCode',
    level: 80,
    color: 'cyan',
    order: 0,
    isActive: true
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const response = await skillsAPI.getAllAdmin()
      setSkills(response.data.data)
    } catch (error) {
      toast.error('Error al cargar habilidades')
    } finally {
      setLoading(false)
    }
  }

  const openModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill)
      setFormData({
        name: skill.name,
        category: skill.category,
        icon: skill.icon,
        level: skill.level,
        color: skill.color,
        order: skill.order,
        isActive: skill.isActive
      })
    } else {
      setEditingSkill(null)
      setFormData({
        name: '',
        category: 'frontend',
        icon: 'FaCode',
        level: 80,
        color: 'cyan',
        order: skills.length,
        isActive: true
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingSkill(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, formData)
        toast.success('Habilidad actualizada')
      } else {
        await skillsAPI.create(formData)
        toast.success('Habilidad creada')
      }
      closeModal()
      loadSkills()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta habilidad?')) return

    try {
      await skillsAPI.delete(id)
      toast.success('Habilidad eliminada')
      loadSkills()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const toggleActive = async (skill) => {
    try {
      await skillsAPI.update(skill._id, { isActive: !skill.isActive })
      loadSkills()
      toast.success(skill.isActive ? 'Habilidad ocultada' : 'Habilidad visible')
    } catch (error) {
      toast.error('Error al actualizar')
    }
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

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
          <h1 className="text-2xl font-bold">Habilidades</h1>
          <p className="text-dark-400">Gestiona tus tecnologías y skills</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <FaPlus /> Nueva Habilidad
        </button>
      </div>

      {/* Skills by Category */}
      {Object.entries(categoryConfig).map(([category, config]) => {
        const categorySkills = groupedSkills[category] || []
        if (categorySkills.length === 0) return null

        const Icon = config.icon

        return (
          <div key={category} className="bg-dark-800/50 rounded-2xl border border-dark-700 overflow-hidden">
            <div className={`p-4 border-b border-dark-700 flex items-center gap-3 bg-${config.color}-500/10`}>
              <div className={`w-10 h-10 rounded-xl bg-${config.color}-500/20 flex items-center justify-center`}>
                <Icon className={`text-xl text-${config.color}-400`} />
              </div>
              <div>
                <h2 className="font-bold">{config.label}</h2>
                <p className="text-dark-400 text-sm">{categorySkills.length} habilidades</p>
              </div>
            </div>

            <div className="p-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {categorySkills.map((skill) => (
                  <div 
                    key={skill._id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all
                      ${skill.isActive 
                        ? 'bg-dark-700/30 border-dark-600 hover:border-dark-500' 
                        : 'bg-dark-800/50 border-red-500/30 opacity-60'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-16 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-${config.color}-400 rounded-full`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-dark-400">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleActive(skill)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          skill.isActive ? 'text-dark-400 hover:bg-dark-600' : 'text-red-400'
                        }`}
                        title={skill.isActive ? 'Ocultar' : 'Mostrar'}
                      >
                        {skill.isActive ? <FaEye size={14} /> : <FaEyeSlash size={14} />}
                      </button>
                      <button
                        onClick={() => openModal(skill)}
                        className="p-1.5 text-dark-400 hover:bg-dark-600 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {skills.length === 0 && (
        <div className="text-center py-12 bg-dark-800/50 rounded-2xl border border-dark-700">
          <FaCode className="text-5xl text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">No hay habilidades aún</p>
          <button onClick={() => openModal()} className="btn-primary mt-4">
            Agregar primera habilidad
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-900 rounded-2xl w-full max-w-md border border-dark-700">
            <div className="flex justify-between items-center p-6 border-b border-dark-700">
              <h2 className="text-xl font-bold">
                {editingSkill ? 'Editar Habilidad' : 'Nueva Habilidad'}
              </h2>
              <button onClick={closeModal} className="text-dark-400 hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="React, Node.js, MongoDB..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                >
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nivel de Dominio: {formData.level}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-dark-500 mt-1">
                  <span>Básico</span>
                  <span>Intermedio</span>
                  <span>Experto</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Orden</label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="input"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded bg-dark-800 border-dark-600 text-primary-500"
                />
                <span className="text-sm">Visible en el portfolio</span>
              </label>

              <div className="flex gap-4 pt-4 border-t border-dark-700">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {saving ? <div className="spinner w-5 h-5 border-2"></div> : <FaSave />}
                  {editingSkill ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsManager
