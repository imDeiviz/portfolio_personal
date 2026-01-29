import { FaCode, FaServer, FaLayerGroup } from 'react-icons/fa'

const Services = () => {
  return (
    <section className="py-20 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary-400 font-medium mb-2">LO QUE OFREZCO</p>
          <h2 className="text-4xl md:text-5xl font-bold">Mis <span className="gradient-text">Servicios</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card group hover:border-primary-500/50">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl 
              flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaCode className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-4">Desarrollo Frontend</h3>
            <p className="text-dark-400">Interfaces modernas y responsivas con React + Vite, optimizadas para rendimiento.</p>
          </div>

          <div className="card group hover:border-green-500/50">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl 
              flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaServer className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-4">Desarrollo Backend</h3>
            <p className="text-dark-400">APIs REST robustas y escalables con Node.js y Express.</p>
          </div>

          <div className="card group hover:border-secondary-500/50">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-2xl 
              flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaLayerGroup className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-4">Desarrollo Full Stack</h3>
            <p className="text-dark-400">Aplicaciones web completas de principio a fin.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
