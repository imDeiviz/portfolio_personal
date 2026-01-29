import { useState, useEffect } from 'react'
import { profileAPI, projectsAPI, skillsAPI } from '../services/api'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Skills from '../components/home/Skills'
import FeaturedProjects from '../components/home/FeaturedProjects'
import Services from '../components/home/Services'
import Contact from '../components/home/Contact'

const Home = () => {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState({ grouped: {} })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        profileAPI.get(),
        projectsAPI.getAll({ featured: true, limit: 6 }),
        skillsAPI.getAll()
      ])
      setProfile(profileRes.data.data)
      setProjects(projectsRes.data.data)
      setSkills(skillsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-16 h-16"></div>
      </div>
    )
  }

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <FeaturedProjects projects={projects} />
      <Services />
      <Contact profile={profile} />
    </>
  )
}

export default Home
