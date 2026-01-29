import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { messagesAPI } from '../../services/api'

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await messagesAPI.send(formData)
      toast.success('¡Mensaje enviado correctamente!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al enviar mensaje')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="py-20 relative overflow-hidden">
      <div className="absolute w-96 h-96 bg-secondary-600 rounded-full filter blur-[80px] opacity-20 -bottom-48 -left-48"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary-400 font-medium mb-2">HABLEMOS</p>
          <h2 className="text-4xl md:text-5xl font-bold">Contáctame</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">¿Tienes un proyecto en mente?</h3>
            <p className="text-dark-400 mb-8">
              Estoy disponible para proyectos freelance y oportunidades laborales.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-dark-800 rounded-xl flex items-center justify-center">
                  <FaEnvelope className="text-xl text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-400">Email</p>
                  <a href={`mailto:${profile?.email}`} className="text-lg hover:text-primary-400 transition-colors">
                    {profile?.email}
                  </a>
                </div>
              </div>

              {profile?.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-dark-800 rounded-xl flex items-center justify-center">
                    <FaPhone className="text-xl text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">Teléfono</p>
                    <a href={`tel:${profile.phone}`} className="text-lg hover:text-green-400 transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-dark-800 rounded-xl flex items-center justify-center">
                  <FaMapMarkerAlt className="text-xl text-secondary-400" />
                </div>
                <div>
                  <p className="text-sm text-dark-400">Ubicación</p>
                  <p className="text-lg">{profile?.location}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-dark-700">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Asunto</label>
              <input
                type="text"
                className="input"
                placeholder="Asunto del mensaje"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea
                rows="5"
                className="input resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                <>
                  <div className="spinner w-5 h-5 border-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensaje <FaPaperPlane />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
