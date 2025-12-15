import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Advantages from '@/components/Advantages'
import TrustBlock from '@/components/TrustBlock'
import Gallery from '@/components/Gallery'
import CTA from '@/components/CTA'
import Contacts from '@/components/Contacts'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <TrustBlock />
      <Advantages />
      <Gallery />
      <CTA />
      <Contacts />
    </main>
  )
}

