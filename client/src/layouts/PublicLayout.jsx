import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const PublicLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#habilidades', label: 'Habilidades' },
    { href: '#proyectos', label: 'Proyectos' },
  ]

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-950/90 backdrop-blur-lg shadow-lg' : ''
        }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold gradient-text">
              &lt;Dev /&gt;
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
              <a href="#contacto" className="btn-primary text-sm">
                Contacto
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 z-40 bg-dark-950/98 backdrop-blur-xl transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}>
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-3xl font-bold text-dark-300 hover:text-primary-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="btn-primary w-full max-w-xs text-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </a>

            <div className="flex gap-8 mt-12">
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <FaGithub size={32} />
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <FaLinkedin size={32} />
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <FaTwitter size={32} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-2xl font-bold gradient-text">
              &lt;Dev /&gt;
            </Link>
            <p className="text-dark-400 text-sm text-center">
              © {new Date().getFullYear()} Todos los derechos reservados. Hecho con ❤️ y MERN Stack
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
