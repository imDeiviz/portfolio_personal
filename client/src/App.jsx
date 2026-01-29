import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

// Admin Pages
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProfileManager from './pages/admin/ProfileManager'
import ProjectsManager from './pages/admin/ProjectsManager'
import SkillsManager from './pages/admin/SkillsManager'
import MessagesManager from './pages/admin/MessagesManager'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="proyecto/:slug" element={<ProjectDetail />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="perfil" element={<ProfileManager />} />
        <Route path="proyectos" element={<ProjectsManager />} />
        <Route path="habilidades" element={<SkillsManager />} />
        <Route path="mensajes" element={<MessagesManager />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
