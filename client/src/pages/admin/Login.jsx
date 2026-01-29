import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaEnvelope, FaLock, FaSignInAlt, FaCode } from 'react-icons/fa'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      toast.success('¡Bienvenido al panel de administración!')
      navigate('/admin')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute w-96 h-96 bg-primary-500 rounded-full filter blur-[120px] opacity-20 -top-48 -left-48"></div>
      <div className="absolute w-96 h-96 bg-secondary-600 rounded-full filter blur-[120px] opacity-20 -bottom-48 -right-48"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl mb-4">
            <FaCode className="text-4xl text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Panel Admin</h1>
          <p className="text-dark-400 mt-2">Inicia sesión para gestionar tu portfolio</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-dark-900/50 backdrop-blur-xl rounded-2xl p-8 border border-dark-800">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-dark-300">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input pl-12"
                  placeholder="admin@david.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2 text-dark-300">
                Contraseña
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input pl-12"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="spinner w-5 h-5 border-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <FaSignInAlt /> Iniciar Sesión
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-dark-500 text-sm mt-6">
          Panel de administración del portfolio
        </p>
      </div>
    </div>
  )
}

export default Login
