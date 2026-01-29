import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FaHome, FaUser, FaProjectDiagram, FaCode, FaEnvelope, 
  FaBars, FaTimes, FaSignOutAlt, FaExternalLinkAlt 
} from 'react-icons/fa'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/admin', icon: FaHome, label: 'Dashboard', exact: true },
    { path: '/admin/perfil', icon: FaUser, label: 'Perfil' },
    { path: '/admin/proyectos', icon: FaProjectDiagram, label: 'Proyectos' },
    { path: '/admin/habilidades', icon: FaCode, label: 'Habilidades' },
    { path: '/admin/mensajes', icon: FaEnvelope, label: 'Mensajes' },
  ]

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-dark-900 border-r border-dark-800 
        transition-all duration-300 fixed h-full z-40 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-dark-800 flex items-center justify-between">
          {sidebarOpen && (
            <Link to="/admin" className="text-xl font-bold gradient-text">
              Admin Panel
            </Link>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive(item.path, item.exact) 
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-400 border border-primary-500/30' 
                  : 'text-dark-400 hover:bg-dark-800 hover:text-white'
                }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-dark-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-400 
              hover:bg-dark-800 hover:text-white transition-all"
          >
            <FaExternalLinkAlt size={18} />
            {sidebarOpen && <span>Ver Portfolio</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 
              hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt size={20} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-dark-900/50 backdrop-blur-lg border-b border-dark-800 px-6 py-4 sticky top-0 z-30">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {menuItems.find(item => isActive(item.path, item.exact))?.label || 'Admin'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-dark-400 text-sm">
                Hola, <span className="text-white font-medium">{user?.name}</span>
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 
                flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
