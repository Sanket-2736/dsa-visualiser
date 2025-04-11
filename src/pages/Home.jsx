import React from 'react'
import HeroSection from '../components/HeroSection'
import InteractiveLearning from '../components/IInteractiveLearning'
import DataStructuresSection from '../components/DataStructuresSection'
import TestimonialSection from '../components/TestimonialSection'

function Home() {
  return (
    <div>
      {/* hero section: */}
      <HeroSection/>
      {/* interative learning section */}
      <InteractiveLearning/>
      {/* explore data structures */}
      <DataStructuresSection/>
      {/* testimonials */}
      <TestimonialSection/>
    </div>
  )
}

export default Home
