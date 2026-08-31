import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import EconomicModel from './components/EconomicModel'
import TaskShowcase from './components/TaskShowcase'
import Security from './components/Security'
import Comparison from './components/Comparison'

import Documentation from './components/Documentation'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <EconomicModel />
        <TaskShowcase />
        <Security />
        <Comparison />
        <Documentation />
      </main>
      <Footer />
    </>
  )
}
