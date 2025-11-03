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
    const badge = document.querySelector(`.${styles.heroBadge}`)
    
    // Animate badge first
    if (badge) {
      setTimeout(() => {
        badge.classList.add(styles.animate)
      }, 100)
    }
    
    // Then title lines
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add(styles.animate)
      }, 300 + index * 200)
    })
    
    // Subtitle
    if (subtitle) {
      setTimeout(() => {
        subtitle.classList.add(styles.animate)
      }, 900)
    }
    
    // Buttons
    if (buttons) {
      setTimeout(() => {
        buttons.classList.add(styles.animate)
      }, 1200)
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
      
      {/* Animated particles background */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle}></div>
        ))}
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          {/* Premium Badge */}
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>✦</span>
            <span>Ekskluzivna Kolekcija 2025</span>
            <span className={styles.badgeIcon}>✦</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Vreme je</span>
            <span className={`${styles.titleLine} ${styles.titleMain}`}>Umetnost</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Otkrijte savršenu harmoniju elegancije i preciznosti
          </p>
          
          <div className={styles.heroButtons}>
            <a href="#collection" className={styles.btnPrimary}>
              <span className={styles.btnText}>Pogledaj Kolekciju</span>
              <span className={styles.btnArrow}>→</span>
            </a>
            <a href="#features" className={styles.btnOutline}>
              <span>Otkrijte Više</span>
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🏆</span>
              <span className={styles.trustText}>2 God. Garancija</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🚚</span>
              <span className={styles.trustText}>Besplatna Dostava</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>💎</span>
              <span className={styles.trustText}>Premium Materijali</span>
            </div>
          </div>
        </div>
        
        <div className={styles.heroWatch}>
          <div className={styles.watchCircle}></div>
          <div className={styles.watchCircleSecondary}></div>
          <div className={styles.watchPlaceholder}>
            <Suspense fallback={
              <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
              </div>
            }>
              <Watch3D />
            </Suspense>
          </div>
          
          {/* Floating features around watch */}
          <div className={styles.floatingFeature} style={{ top: '10%', right: '10%' }}>
            <div className={styles.featureDot}></div>
            <div className={styles.featureLabel}>Safirno staklo</div>
          </div>
          <div className={styles.floatingFeature} style={{ bottom: '20%', right: '5%' }}>
            <div className={styles.featureDot}></div>
            <div className={styles.featureLabel}>Vodootporan</div>
          </div>
          <div className={styles.floatingFeature} style={{ top: '30%', left: '5%' }}>
            <div className={styles.featureDot}></div>
            <div className={styles.featureLabel}>Švajcarski mehanizam</div>
          </div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  )
}