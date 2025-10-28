'use client'

import { useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import styles from './Hero.module.css'

// Dynamic import 3D komponente (client-side only)
const Watch3D = dynamic(() => import('./Watch3D'), { ssr: false })

export default function Hero() {
  useEffect(() => {
    // Add 'animate' class to trigger animations
    const titleLines = document.querySelectorAll(`.${styles.titleLine}`)
    const subtitle = document.querySelector(`.${styles.heroSubtitle}`)
    const buttons = document.querySelector(`.${styles.heroButtons}`)
    
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add(styles.animate)
      }, index * 200)
    })
    
    if (subtitle) {
      setTimeout(() => {
        subtitle.classList.add(styles.animate)
      }, 600)
    }
    
    if (buttons) {
      setTimeout(() => {
        buttons.classList.add(styles.animate)
      }, 900)
    }

    // Parallax effect for mobile watch
    const isMobile = window.innerWidth <= 768
    
    if (isMobile) {
      const heroWatch = document.querySelector(`.${styles.heroWatch}`)
      const watchCircle = document.querySelector(`.${styles.watchCircle}`)
      const watchPlaceholder = document.querySelector(`.${styles.watchPlaceholder}`)
      
      const handleScroll = () => {
        const scrolled = window.pageYOffset
        const heroHeight = document.querySelector(`.${styles.hero}`)?.offsetHeight || 0
        
        if (scrolled < heroHeight) {
          const parallaxSpeed = 0.5
          const translateY = scrolled * parallaxSpeed
          
          if (heroWatch) {
            heroWatch.style.transform = `translateY(${translateY}px)`
          }
          
          if (watchCircle) {
            const currentRotation = (scrolled / 30) % 360
            watchCircle.style.transform = `translateX(-50%) rotate(${currentRotation}deg) translateY(${translateY * 0.3}px)`
          }
          
          if (watchPlaceholder) {
            watchPlaceholder.style.transform = `translateY(${translateY * 0.7}px)`
          }
        }
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Vreme je</span>
            <span className={`${styles.titleLine} ${styles.titleMain}`}>Umetnost</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Otkrijte savršenu harmoniju elegancije i preciznosti
          </p>
          <div className={styles.heroButtons}>
            <a href="#collection" className={styles.btnPrimary}>Istražite Kolekciju</a>
            <a href="#features" className={styles.btnOutline}>Saznajte Više</a>
          </div>
        </div>
        <div className={styles.heroWatch}>
          <div className={styles.watchCircle}></div>
          <div className={styles.watchPlaceholder}>
            <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
              <Watch3D />
            </Suspense>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Skroluj</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  )
}