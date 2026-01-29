import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import {
  FaSave, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe,
  FaCamera, FaLock
} from 'react-icons/fa'
import { profileAPI, authAPI } from '../../services/api'

const ProfileManager = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const response = await profileAPI.get()
      setProfile(response.data.data)
      setAvatarPreview(response.data.data.avatar)
    } catch (error) {
      toast.error('Error al cargar el perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))

      // Subir inmediatamente
      const formData = new FormData()
      formData.append('avatar', file)

      try {
        const response = await profileAPI.uploadAvatar(formData)
        setProfile({ ...profile, avatar: response.data.data.avatar })
        toast.success('Avatar actualizado')
      } catch (error) {
        toast.error('Error al subir avatar')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await profileAPI.update(profile)
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setSaving(true)

    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      toast.success('Contraseña actualizada correctamente')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al cambiar contraseña')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner w-12 h-12"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'general', label: 'General', icon: FaUser },
    { id: 'social', label: 'Redes Sociales', icon: FaGlobe },
    { id: 'stats', label: 'Estadísticas', icon: FaGlobe },
    { id: 'security', label: 'Seguridad', icon: FaLock }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
        <p className="text-dark-400">Gestiona tu información personal y configuración</p>
      </div>

      {/* Avatar Section */}
      <div className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-secondary-600 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-dark-800">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    👨‍💻
                  </div>
                )}
              </div>
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full 
              opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <FaCamera className="text-2xl" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile?.name}</h2>
            <p className="text-dark-400">{profile?.title}</p>
            <p className="text-dark-500 text-sm mt-1">{profile?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-700 pb-2 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-dark-400 hover:bg-dark-800'
                }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <form onSubmit={handleSubmit}>
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaUser className="inline mr-2" /> Nombre
                </label>
                <input
                  type="text"
                  value={profile?.name || ''}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="input"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Título / Rol</label>
                <input
                  type="text"
                  value={profile?.title || ''}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="input"
                  placeholder="Desarrollador Full Stack"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Biografía</label>
              <textarea
                value={profile?.bio || ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="input resize-none"
                rows="4"
                placeholder="Cuéntale al mundo sobre ti..."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaEnvelope className="inline mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={profile?.email || ''}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="input"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaPhone className="inline mr-2" /> Teléfono
                </label>
                <input
                  type="tel"
                  value={profile?.phone || ''}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="input"
                  placeholder="+34 612 345 678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaMapMarkerAlt className="inline mr-2" /> Ubicación
                </label>
                <input
                  type="text"
                  value={profile?.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="input"
                  placeholder="Madrid, España"
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <div className="spinner w-5 h-5 border-2"></div> : <FaSave />}
              Guardar Cambios
            </button>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaGithub className="inline mr-2" /> GitHub
                </label>
                <input
                  type="url"
                  value={profile?.social?.github || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social: { ...profile.social, github: e.target.value }
                  })}
                  className="input"
                  placeholder="https://github.com/usuario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaLinkedin className="inline mr-2 text-blue-400" /> LinkedIn
                </label>
                <input
                  type="url"
                  value={profile?.social?.linkedin || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social: { ...profile.social, linkedin: e.target.value }
                  })}
                  className="input"
                  placeholder="https://linkedin.com/in/usuario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaTwitter className="inline mr-2 text-blue-300" /> Twitter
                </label>
                <input
                  type="url"
                  value={profile?.social?.twitter || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social: { ...profile.social, twitter: e.target.value }
                  })}
                  className="input"
                  placeholder="https://twitter.com/usuario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaInstagram className="inline mr-2 text-pink-400" /> Instagram
                </label>
                <input
                  type="url"
                  value={profile?.social?.instagram || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social: { ...profile.social, instagram: e.target.value }
                  })}
                  className="input"
                  placeholder="https://instagram.com/usuario"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  <FaGlobe className="inline mr-2 text-green-400" /> Sitio Web
                </label>
                <input
                  type="url"
                  value={profile?.social?.website || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social: { ...profile.social, website: e.target.value }
                  })}
                  className="input"
                  placeholder="https://tusitio.com"
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <div className="spinner w-5 h-5 border-2"></div> : <FaSave />}
              Guardar Cambios
            </button>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700 space-y-6">
            <p className="text-dark-400 mb-4">Estas estadísticas se muestran en la sección "Sobre Mí"</p>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Años de Experiencia</label>
                <input
                  type="number"
                  min="0"
                  value={profile?.stats?.experience || 0}
                  onChange={(e) => setProfile({
                    ...profile,
                    stats: { ...profile.stats, experience: parseInt(e.target.value) }
                  })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Proyectos Completados</label>
                <input
                  type="number"
                  min="0"
                  value={profile?.stats?.projects || 0}
                  onChange={(e) => setProfile({
                    ...profile,
                    stats: { ...profile.stats, projects: parseInt(e.target.value) }
                  })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Clientes Satisfechos</label>
                <input
                  type="number"
                  min="0"
                  value={profile?.stats?.clients || 0}
                  onChange={(e) => setProfile({
                    ...profile,
                    stats: { ...profile.stats, clients: parseInt(e.target.value) }
                  })}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              {saving ? <div className="spinner w-5 h-5 border-2"></div> : <FaSave />}
              Guardar Cambios
            </button>
          </div>
        )}
      </form>

      {/* Security Tab */}
      {activeTab === 'security' && (
        <form onSubmit={handlePasswordChange} className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FaLock /> Cambiar Contraseña
          </h3>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña Actual</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <div className="spinner w-5 h-5 border-2"></div> : <FaLock />}
            Cambiar Contraseña
          </button>
        </form>
      )}
    </div>
  )
}

export default ProfileManager
