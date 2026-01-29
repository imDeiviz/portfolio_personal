import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { 
  FaEnvelope, FaEnvelopeOpen, FaTrash, FaArchive, FaInbox,
  FaReply, FaTimes, FaCheck, FaFilter
} from 'react-icons/fa'
import { messagesAPI } from '../../services/api'

const MessagesManager = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [filter, setFilter] = useState('all') // all, unread, archived
  const [stats, setStats] = useState({ total: 0, unread: 0, archived: 0 })

  useEffect(() => {
    loadMessages()
  }, [filter])

  const loadMessages = async () => {
    try {
      const params = {}
      if (filter === 'unread') params.unread = true
      if (filter === 'archived') params.archived = true
      if (filter === 'all') params.archived = false

      const response = await messagesAPI.getAll(params)
      setMessages(response.data.data)
      setStats({
        total: response.data.count,
        unread: response.data.unreadCount
      })
    } catch (error) {
      toast.error('Error al cargar mensajes')
    } finally {
      setLoading(false)
    }
  }

  const openMessage = async (message) => {
    setSelectedMessage(message)
    
    if (!message.isRead) {
      try {
        await messagesAPI.markRead(message._id)
        loadMessages()
      } catch (error) {
        console.error('Error marking as read:', error)
      }
    }
  }

  const closeMessage = () => {
    setSelectedMessage(null)
  }

  const handleArchive = async (id) => {
    try {
      await messagesAPI.archive(id)
      toast.success('Mensaje archivado')
      if (selectedMessage?._id === id) closeMessage()
      loadMessages()
    } catch (error) {
      toast.error('Error al archivar')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este mensaje permanentemente?')) return

    try {
      await messagesAPI.delete(id)
      toast.success('Mensaje eliminado')
      if (selectedMessage?._id === id) closeMessage()
      loadMessages()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now - d
    
    // Less than 24 hours
    if (diff < 86400000) {
      return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
    // Less than 7 days
    if (diff < 604800000) {
      return d.toLocaleDateString('es-ES', { weekday: 'short' })
    }
    // Default
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
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
          <h1 className="text-2xl font-bold">Mensajes</h1>
          <p className="text-dark-400">
            {stats.unread > 0 ? (
              <span className="text-primary-400">{stats.unread} mensajes sin leer</span>
            ) : (
              'Gestiona los mensajes de contacto'
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            filter === 'all' ? 'bg-primary-500/20 text-primary-400' : 'text-dark-400 hover:bg-dark-800'
          }`}
        >
          <FaInbox /> Bandeja de entrada
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            filter === 'unread' ? 'bg-primary-500/20 text-primary-400' : 'text-dark-400 hover:bg-dark-800'
          }`}
        >
          <FaEnvelope /> Sin leer
          {stats.unread > 0 && (
            <span className="px-2 py-0.5 bg-red-500 rounded-full text-xs text-white">
              {stats.unread}
            </span>
          )}
        </button>
        <button
          onClick={() => setFilter('archived')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            filter === 'archived' ? 'bg-primary-500/20 text-primary-400' : 'text-dark-400 hover:bg-dark-800'
          }`}
        >
          <FaArchive /> Archivados
        </button>
      </div>

      {/* Messages Layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 bg-dark-800/50 rounded-2xl border border-dark-700 overflow-hidden">
          <div className="divide-y divide-dark-700 max-h-[600px] overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => openMessage(message)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?._id === message._id 
                      ? 'bg-primary-500/10 border-l-2 border-primary-500' 
                      : 'hover:bg-dark-700/30'
                  } ${!message.isRead ? 'bg-dark-700/20' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0
                      ${message.isRead ? 'bg-dark-700 text-dark-400' : 'bg-primary-500/20 text-primary-400'}`}>
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-medium truncate ${!message.isRead ? 'text-white' : 'text-dark-300'}`}>
                          {message.name}
                        </span>
                        <span className="text-xs text-dark-500 flex-shrink-0">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${!message.isRead ? 'text-dark-300' : 'text-dark-500'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-dark-500 truncate mt-1">
                        {message.message}
                      </p>
                    </div>
                    {!message.isRead && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-dark-400">
                <FaEnvelope className="text-4xl mx-auto mb-2 opacity-50" />
                <p>No hay mensajes</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3 bg-dark-800/50 rounded-2xl border border-dark-700 overflow-hidden">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-dark-700">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 
                      flex items-center justify-center font-bold text-lg">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">{selectedMessage.name}</h2>
                      <a href={`mailto:${selectedMessage.email}`} className="text-primary-400 hover:underline text-sm">
                        {selectedMessage.email}
                      </a>
                      <p className="text-dark-500 text-xs mt-1">
                        {new Date(selectedMessage.createdAt).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleArchive(selectedMessage._id)}
                      className="p-2 text-dark-400 hover:bg-dark-700 rounded-lg transition-colors"
                      title="Archivar"
                    >
                      <FaArchive />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={closeMessage}
                      className="p-2 text-dark-400 hover:bg-dark-700 rounded-lg transition-colors lg:hidden"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="px-6 py-4 border-b border-dark-700">
                <h3 className="text-xl font-semibold">{selectedMessage.subject}</h3>
              </div>

              {/* Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-dark-300 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-dark-700">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FaReply /> Responder
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-dark-400">
              <FaEnvelopeOpen className="text-6xl mb-4 opacity-30" />
              <p>Selecciona un mensaje para leerlo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessagesManager
