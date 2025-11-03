'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Story.module.css'

export default function Story() {
  const [counts, setCounts] = useState({
    precision: 0,
    support: 0,
    warranty: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const statRefs = useRef([])
  const imageRef = useRef(null)
  const featuresRefs = useRef([])

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateNumbers()
            
            // Desktop animations
            if (!isMobile && contentRef.current) {
              contentRef.current.classList.add(styles.reveal)
            }
            
            // Mobile animations
            if (isMobile && contentRef.current) {
              contentRef.current.classList.add(styles.mobileReveal)
            }
            
            // Animate stat items
            statRefs.current.forEach((stat, index) => {
              if (stat) {
                setTimeout(() => {
                  stat.classList.add(isMobile ? styles.mobileReveal : styles.reveal)
                }, index * 150)
              }
            })
            
            // Animate image
            if (imageRef.current) {
              setTimeout(() => {
                imageRef.current.classList.add(isMobile ? styles.mobileReveal : styles.reveal)
              }, 300)
            }
            
            // Animate features
            featuresRefs.current.forEach((feature, index) => {
              if (feature) {
                setTimeout(() => {
                  feature.classList.add(isMobile ? styles.mobileReveal : styles.reveal)
                }, 400 + index * 200)
              }
            })
          }
        })
      },
      { threshold: isMobile ? 0.15 : 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasAnimated])

  const animateNumbers = () => {
    // Precision: 0 -> 99
    let precisionCount = 0
    const precisionInterval = setInterval(() => {
      precisionCount += 2
      if (precisionCount >= 99) {
        precisionCount = 99
        clearInterval(precisionInterval)
      }
      setCounts(prev => ({ ...prev, precision: precisionCount }))
    }, 20)

    // Support: 0 -> 24
    let supportCount = 0
    const supportInterval = setInterval(() => {
      supportCount += 1
      if (supportCount >= 24) {
        supportCount = 24
        clearInterval(supportInterval)
      }
      setCounts(prev => ({ ...prev, support: supportCount }))
    }, 50)

    // Warranty: 0 -> 5
    let warrantyCount = 0
    const warrantyInterval = setInterval(() => {
      warrantyCount += 1
      if (warrantyCount >= 2) {
        warrantyCount = 2
        clearInterval(warrantyInterval)
      }
      setCounts(prev => ({ ...prev, warranty: warrantyCount }))
    }, 300)
  }

  return (
    <section className={styles.story} ref={sectionRef} id="story">
      <div className={styles.container}>
        {/* Main Story Content */}
        <div className={styles.storyGrid}>
          <div className={styles.storyContent} ref={contentRef}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelIcon}>✦</span>
              Naša Priča
              <span className={styles.labelIcon}>✦</span>
            </span>
            <h2 className={styles.sectionTitle}>
              Gde Tradicija Susreće
              <span className={styles.titleHighlight}> Inovaciju</span>
            </h2>
            <p className={styles.storyText}>
              Svaki sat je remek-delo pažljivo dizajnirano da odražava vašu jedinstvenu 
              individualnost. Kombinujemo vanvremensku eleganciju sa modernom preciznošću, 
              stvarajući izuzetan komad koji ćete nositi sa ponosom decenijama.
            </p>
            <p className={styles.storyTextSecondary}>
              Od izbora najfinijih materijala do poslednjeg poteza masterov, svaki detalj 
              je osmišljen da pruži savršenu harmoniju forme i funkcije.
            </p>
            
            {/* CTA Button */}
            <a href="#collection" className={styles.storyButton}>
              <span>Istražite Kolekciju</span>
              <span className={styles.buttonArrow}>→</span>
            </a>
          </div>
          
          {/* Story Image/Visual */}
          <div className={styles.storyImage} ref={imageRef}>
            <div className={styles.imageOverlay}>
              <div className={styles.imageGlow}></div>
            </div>
            <div className={styles.imagePlaceholder}>
              {/* <img 
                src="/Assets/pngsat.png" 
                alt="Premium sat CHRONOS" 
                className={styles.watchImage}
              /> */}
              {/* Ovde možeš staviti sliku sata ili grafiku */}
              <div className={styles.watchIllustration}>
                <div className={styles.watchFrame}></div>
                <div className={styles.watchDetails}>
                  <div className={styles.watchDetail}></div>
                  <div className={styles.watchDetail}></div>
                  <div className={styles.watchDetail}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className={styles.storyStats}>
          <div 
            className={styles.statItem}
            ref={(el) => (statRefs.current[0] = el)}
          >
            <div className={styles.statIcon}>⚡</div>
            <span className={styles.statNumber}>
              {counts.precision}%
            </span>
            <span className={styles.statLabel}>Švajcarska Preciznost</span>
            <span className={styles.statDescription}>Mehanizam najfinijeg kvaliteta</span>
          </div>
          <div 
            className={styles.statItem}
            ref={(el) => (statRefs.current[1] = el)}
          >
            <div className={styles.statIcon}>🛡️</div>
            <span className={styles.statNumber}>
              {counts.support}/7
            </span>
            <span className={styles.statLabel}>Premium Podrška</span>
            <span className={styles.statDescription}>Uvek tu za vas</span>
          </div>
          <div 
            className={styles.statItem}
            ref={(el) => (statRefs.current[2] = el)}
          >
            <div className={styles.statIcon}>💎</div>
            <span className={styles.statNumber}>
              {counts.warranty} God
            </span>
            <span className={styles.statLabel}>Garancija</span>
            <span className={styles.statDescription}>Osigurana kvaliteta</span>
          </div>
        </div>
        
        {/* Premium Features */}
        <div className={styles.premiumFeatures}>
          <div 
            className={styles.featureCard}
            ref={(el) => (featuresRefs.current[0] = el)}
          >
            <div className={styles.featureIconWrapper}>
              <span className={styles.featureIcon}>🔬</span>
            </div>
            <h3 className={styles.featureTitle}>Ručna Izrada</h3>
            <p className={styles.featureText}>
              Svaki sat je pažljivo sklopljen od strane iskusnih majstora sa više od 200 sati rada
            </p>
          </div>
          
          <div 
            className={styles.featureCard}
            ref={(el) => (featuresRefs.current[1] = el)}
          >
            <div className={styles.featureIconWrapper}>
              <span className={styles.featureIcon}>✨</span>
            </div>
            <h3 className={styles.featureTitle}>Premium Materijali</h3>
            <p className={styles.featureText}>
              Safirno staklo, nehrđajući čelik 316L i kožne narukvice najvišeg kvaliteta
            </p>
          </div>
          
          <div 
            className={styles.featureCard}
            ref={(el) => (featuresRefs.current[2] = el)}
          >
            <div className={styles.featureIconWrapper}>
              <span className={styles.featureIcon}>🏆</span>
            </div>
            <h3 className={styles.featureTitle}>Doživotna Vrednost</h3>
            <p className={styles.featureText}>
              Vremenski dizajn koji zadržava vrednost i postaje deo vaše porodične tradicije
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}