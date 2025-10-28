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

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateNumbers()
            
            // Mobile animations
            if (isMobile && contentRef.current) {
              contentRef.current.classList.add(styles.mobileReveal)
            }
            
            // Animate stat items on mobile
            if (isMobile) {
              statRefs.current.forEach((stat) => {
                if (stat) stat.classList.add(styles.mobileReveal)
              })
            }
          }
        })
      },
      { threshold: 0.3 }
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
      precisionCount += 1
      if (precisionCount >= 99) {
        precisionCount = 99
        clearInterval(precisionInterval)
      }
      setCounts(prev => ({ ...prev, precision: precisionCount }))
    }, 25)

    // Support: 0 -> 24
    let supportCount = 0
    const supportInterval = setInterval(() => {
      supportCount += 1
      if (supportCount >= 24) {
        supportCount = 24
        clearInterval(supportInterval)
      }
      setCounts(prev => ({ ...prev, support: supportCount }))
    }, 60)

    // Warranty: 0 -> 2
    let warrantyCount = 0
    const warrantyInterval = setInterval(() => {
      warrantyCount += 1
      if (warrantyCount >= 2) {
        warrantyCount = 2
        clearInterval(warrantyInterval)
      }
      setCounts(prev => ({ ...prev, warranty: warrantyCount }))
    }, 600)
  }

  return (
    <section className={styles.story} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.storyContent} ref={contentRef}>
          <span className={styles.sectionLabel}>Naša Priča</span>
          <h2 className={styles.sectionTitle}>Gde se tradicija susreće sa inovacijom</h2>
          <p className={styles.storyText}>
            Svaki sat je remek-delo pažljivo dizajnirano da odražava vašu individualnost. 
            Kombinujemo vanvremensku eleganciju sa modernim dizajnom, stvarajući izuzetan 
            komad koji ćete nositi sa ponosom.
          </p>
          <div className={styles.storyStats}>
            <div 
              className={styles.statItem}
              ref={(el) => (statRefs.current[0] = el)}
            >
              <span className={styles.statNumber}>
                {counts.precision}%
              </span>
              <span className={styles.statLabel}>Preciznost</span>
            </div>
            <div 
              className={styles.statItem}
              ref={(el) => (statRefs.current[1] = el)}
            >
              <span className={styles.statNumber}>
                {counts.support}/7
              </span>
              <span className={styles.statLabel}>Podrška</span>
            </div>
            <div 
              className={styles.statItem}
              ref={(el) => (statRefs.current[2] = el)}
            >
              <span className={styles.statNumber}>
                {counts.warranty} God
              </span>
              <span className={styles.statLabel}>Garancija</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}