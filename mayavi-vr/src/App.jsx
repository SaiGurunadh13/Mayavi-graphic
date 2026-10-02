import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MaskSection from './components/MaskSection'
import ImmersionSection from './components/ImmersionSection'
import ExperienceSection from './components/ExperienceSection'
import TechnologySection from './components/TechnologySection'
import ProductViewer from './components/ProductViewer'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loaded, setLoaded] = useState(false)
  const { progress } = useProgress()

  useEffect(() => {
    if (progress === 100) {
      // slight delay for smooth transition
      const timer = setTimeout(() => setLoaded(true), 800)
      return () => clearTimeout(timer)
    }
  }, [progress])

  useEffect(() => {
    if (loaded) {
      ScrollTrigger.refresh()
    }
  }, [loaded])

  return (
    <>
      <LoadingScreen progress={progress} loaded={loaded} />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}>
        <Navbar />
        <main>
          <Hero />
          <MaskSection />
          <ImmersionSection />
          <ExperienceSection />
          <TechnologySection />
          <ProductViewer />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
