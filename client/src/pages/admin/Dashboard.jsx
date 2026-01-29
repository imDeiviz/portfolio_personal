import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaProjectDiagram, FaCode, FaEnvelope, FaEye, FaUser, FaArrowRight } from 'react-icons/fa'
import { projectsAPI, skillsAPI, messagesAPI, profileAPI } from '../../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    unreadMessages: 0
  })
  const [recentMessages, setRecentMessages] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [projectsRes, skillsRes, messagesRes, profileRes] = await Promise.all([
        projectsAPI.getAllAdmin(),
        skillsAPI.getAllAdmin(),
        messagesAPI.getAll(),
        profileAPI.get()
      ])

      setStats({
        projects: projectsRes.data.count,
        skills: skillsRes.data.count,
        messages: messagesRes.data.count,
        unreadMessages: messagesRes.data.unreadCount
      })
      setRecentMessages(messagesRes.data.data.slice(0, 5))
      setProfile(profileRes.data.data)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Proyectos',
      value: stats.projects,
      icon: FaProjectDiagram,
      color: 'from-primary-500 to-blue-600',
      link: '/admin/proyectos'
    },
    {
      title: 'Habilidades',
      value: stats.skills,
      icon: FaCode,
      color: 'from-green-500 to-emerald-600',
      link: '/admin/habilidades'
    },
    {
      title: 'Mensajes',
      value: stats.messages,
      icon: FaEnvelope,
      color: 'from-secondary-500 to-purple-600',
      link: '/admin/mensajes',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null
    },
    {
      title: 'Visitas',
      value: '1.2K',
      icon: FaEye,
      color: 'from-orange-500 to-red-600',
      link: '#'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-500/20 to-secondary-600/20 rounded-2xl p-6 border border-primary-500/30">
        <h1 className="text-2xl font-bold mb-2">
          ¡Bienvenido, {profile?.name || 'Admin'}! 👋
        </h1>
        <p className="text-dark-400">
          Gestiona tu portfolio desde este panel. Actualiza proyectos, habilidades y responde mensajes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700 hover:border-dark-600 
              transition-all duration-300 hover:transform hover:-translate-y-1 group relative"
          >
            {stat.badge && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center 
                justify-center text-xs font-bold animate-pulse">
                {stat.badge}
              </span>
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center 
              justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className="text-xl text-white" />
            </div>
            <p className="text-dark-400 text-sm">{stat.title}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-dark-800/50 rounded-2xl border border-dark-700 overflow-hidden">
          <div className="p-6 border-b border-dark-700 flex justify-between items-center">
            <h2 className="text-xl font-bold">Mensajes Recientes</h2>
            <Link to="/admin/mensajes" className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
              Ver todos <FaArrowRight />
            </Link>
          </div>
          <div className="divide-y divide-dark-700">
            {recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message._id} className="p-4 hover:bg-dark-700/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
                      ${message.isRead ? 'bg-dark-700' : 'bg-primary-500/20 text-primary-400'}`}>
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{message.name}</p>
                        {!message.isRead && (
                          <span className="px-2 py-0.5 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                            Nuevo
                          </span>
                        )}
                      </div>
                      <p className="text-dark-400 text-sm truncate">{message.subject}</p>
                      <p className="text-dark-500 text-xs mt-1">
                        {new Date(message.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-dark-400">
                <FaEnvelope className="text-4xl mx-auto mb-2 opacity-50" />
                <p>No hay mensajes aún</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-dark-800/50 rounded-2xl border border-dark-700 overflow-hidden">
          <div className="p-6 border-b border-dark-700">
            <h2 className="text-xl font-bold">Acciones Rápidas</h2>
          </div>
          <div className="p-6 space-y-4">
            <Link
              to="/admin/proyectos"
              className="flex items-center gap-4 p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl 
                flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaProjectDiagram className="text-xl" />
              </div>
              <div>
                <p className="font-medium">Agregar Proyecto</p>
                <p className="text-dark-400 text-sm">Añade un nuevo proyecto a tu portfolio</p>
              </div>
            </Link>

            <Link
              to="/admin/habilidades"
              className="flex items-center gap-4 p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl 
                flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaCode className="text-xl" />
              </div>
              <div>
                <p className="font-medium">Gestionar Habilidades</p>
                <p className="text-dark-400 text-sm">Actualiza tus tecnologías y skills</p>
              </div>
            </Link>

            <Link
              to="/admin/perfil"
              className="flex items-center gap-4 p-4 bg-dark-700/30 rounded-xl hover:bg-dark-700/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-xl 
                flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaUser className="text-xl" />
              </div>
              <div>
                <p className="font-medium">Editar Perfil</p>
                <p className="text-dark-400 text-sm">Actualiza tu información personal</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
