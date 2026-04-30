import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProofBar from '@/components/ProofBar'
import About from '@/components/About'
import WhatWeBuy from '@/components/WhatWeBuy'
import HowItWorks from '@/components/HowItWorks'
import BeforeAfter from '@/components/BeforeAfter'
import Portfolio from '@/components/Portfolio'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProofBar />
      <About />
      <WhatWeBuy />
      <HowItWorks />
      <BeforeAfter />
      <Portfolio />
      <ContactForm />
      <Footer />
    </>
  )
}
