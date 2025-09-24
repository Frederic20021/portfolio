import HeroSection from './components/sections/hero'
import PhilosophySection from './components/sections/philosophy'
import ServicesSection from './components/sections/services'
import { heroText }from './constants/heroText'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection heroText={heroText} />
      <PhilosophySection />
      <ServicesSection />
    </div>
  );
}
