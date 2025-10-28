'use client'

import { useEffect, useRef } from 'react'
import styles from './Features.module.css'

const features = [
  {
    title: 'Švajcarska Preciznost',
    description: 'Mehanizam vrhunskog kvaliteta za tačnost od 99.9%',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    )
  },
  {
    title: 'Premium Materijali',
    description: 'Nehrđajući čelik i safirno staklo za dugotrajnost',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    title: 'Dizajn sa Strašću',
    description: 'Svaki detalj pažljivo osmišljen za vaš stil',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
  {
    title: '2 Godine Garancije',
    description: 'Potpuna podrška i zaštita vaše investicije',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    title: '24/7 Podrška',
    description: 'Tu smo za vas u svakom trenutku',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    title: 'Besplatna Dostava',
    description: 'Brza i sigurna dostava direktno na vašu adresu',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    )
  }
]

export default function Features() {
  const cardRefs = useRef([])

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.mobileFlipIn)
            }
          })
        },
        { threshold: 0.1 }
      )

      cardRefs.current.forEach((card) => {
        if (card) observer.observe(card)
      })

      return () => {
        cardRefs.current.forEach((card) => {
          if (card) observer.unobserve(card)
        })
      }
    }
  }, [])

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Karakteristike</span>
          <h2 className={styles.sectionTitle}>Perfekcija u Svakom Detalju</h2>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.featureCard}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}