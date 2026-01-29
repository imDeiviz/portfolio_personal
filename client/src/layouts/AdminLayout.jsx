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
    <div className="min-h-screen bg-dark-950 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-dark-900 border-b border-dark-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link to="/admin" className="text-xl font-bold gradient-text">
          Admin Panel
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-dark-800 rounded-lg transition-colors text-white"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-full md:h-screen z-50
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'} 
        bg-dark-900 border-r border-dark-800 transition-all duration-300 flex flex-col
      `}>
        {/* Logo (Desktop) */}
        <div className="hidden md:flex p-4 border-b border-dark-800 items-center justify-between">
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
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive(item.path, item.exact)
                  ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-400 border border-primary-500/30'
                  : 'text-dark-400 hover:bg-dark-800 hover:text-white'
                }`}
            >
              <item.icon size={20} className="min-w-[20px]" />
              {(sidebarOpen || window.innerWidth < 768) && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-dark-800 space-y-2 bg-dark-900">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-dark-400 
              hover:bg-dark-800 hover:text-white transition-all"
          >
            <FaExternalLinkAlt size={18} className="min-w-[18px]" />
            {(sidebarOpen || window.innerWidth < 768) && <span>Ver Portfolio</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 
              hover:bg-red-500/10 transition-all"
          >
            <FaSignOutAlt size={20} className="min-w-[20px]" />
            {(sidebarOpen || window.innerWidth < 768) && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Bar (Desktop) */}
        <header className="hidden md:block bg-dark-900/50 backdrop-blur-lg border-b border-dark-800 px-6 py-4 sticky top-0 z-30">
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
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
