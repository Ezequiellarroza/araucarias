import Hero from '../components/sections/Hero'
import Values from '../components/sections/Values'
import Intro from '../components/sections/Intro'
import HomeSuites from '../components/sections/HomeSuites'
import FeaturesPreview from '../components/sections/FeaturesPreview'
import Architecture from '../components/sections/Architecture'
import FinalCTA from '../components/sections/FinalCTA'

function Home() {
  return (
    <>
      <Hero />
      <HomeSuites />
      <Intro />
       <Values />
      <FeaturesPreview />
      <Architecture />
      <FinalCTA />
    </>
  )
}

export default Home