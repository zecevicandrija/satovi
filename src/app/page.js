'use client'

import ScrollProgress from '../components/ScrollProgress/ScrollProgress'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Story from '../components/Story/Story'
import Collection from '../components/Collection/Collection'
import Features from '../components/Features/Features'
import CTA from '../components/CTA/CTA'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import Kviz from '../components/Kviz/Kviz'
import Video from '../components/Video/Video'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Story />
      <Collection />
      <Video />
      <Features />
      <CTA />
      <Kviz />
      <Contact />
      <Footer />
    </>
  )
}
