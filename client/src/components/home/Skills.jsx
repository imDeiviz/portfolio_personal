import { FaReact, FaNodeJs, FaDatabase, FaCode, FaCheck } from 'react-icons/fa'

const Skills = ({ skills }) => {
  const categoryIcons = {
    frontend: { icon: FaReact, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
    backend: { icon: FaNodeJs, color: 'text-green-500', bg: 'bg-green-500/20' },
    database: { icon: FaDatabase, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    tools: { icon: FaCode, color: 'text-violet-400', bg: 'bg-violet-500/20' }
  }

  return (
    <section id="habilidades" className="py-20 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary-400 font-medium mb-2">MI STACK</p>
          <h2 className="text-4xl md:text-5xl font-bold">Tecnologías y <span className="gradient-text">Habilidades</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills.grouped || {}).map(([category, categorySkills]) => {
            const cat = categoryIcons[category] || categoryIcons.tools
            const Icon = cat.icon
            return (
              <div key={category} className="skill-card">
                <div className={`w-14 h-14 ${cat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`text-3xl ${cat.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 capitalize">{category}</h3>
                <ul className="space-y-2 text-dark-400">
                  {categorySkills.slice(0, 4).map((skill) => (
                    <li key={skill._id} className="flex items-center gap-2">
                      <FaCheck className={`text-sm ${cat.color}`} />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
