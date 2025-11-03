'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Features.module.css'

const features = [
  {
    number: '01',
    title: 'Švajcarska Preciznost',
    subtitle: 'Swiss Made Excellence',
    description: 'Automatski mehanizam vrhunskog kvaliteta garantuje tačnost od 99.9%. Svaki sat prolazi rigorozne testove kvaliteta.',
    badge: 'Premium',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    stats: '99.9%',
    statsLabel: 'Tačnost'
  },
  {
    number: '02',
    title: 'Premium Materijali',
    subtitle: 'Luxury Craftsmanship',
    description: 'Nehrđajući čelik 316L i safirno staklo otporno na grebanje. Vodootporno do 100m sa zaštitom od magnetnih polja.',
    badge: 'Certified',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    stats: '316L',
    statsLabel: 'Čelik'
  },
  {
    number: '03',
    title: 'Dizajn sa Strašću',
    subtitle: 'Timeless Elegance',
    description: 'Svaki detalj pažljivo osmišljen od strane award-winning dizajnera. Minimalistička elegancija koja nikad ne izlazi iz mode.',
    badge: 'Award Winner',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    stats: '200+',
    statsLabel: 'Sati rada'
  },
  {
    number: '04',
    title: '5 Godina Garancije',
    subtitle: 'Protected Investment',
    description: 'Potpuna međunarodna garancija sa besplatnim servisom i održavanjem. Vaša investicija je u sigurnim rukama.',
    badge: 'Garantovano',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    stats: '5',
    statsLabel: 'Godina'
  },
  {
    number: '05',
    title: '24/7 Premium Podrška',
    subtitle: 'Always Here For You',
    description: 'Naš ekspertski tim je dostupan non-stop putem chata, telefona ili emaila. Odgovor u manje od 1 sata garantovan.',
    badge: 'Live Support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M9 10h.01"/>
        <path d="M15 10h.01"/>
      </svg>
    ),
    stats: '<1h',
    statsLabel: 'Odgovor'
  },
  {
    number: '06',
    title: 'Besplatna Dostava',
    subtitle: 'Express Worldwide',
    description: 'Brza i sigurna dostava sa tracking-om i premium pakovanjem. Osiguranje uključeno. Dostava za 2-3 dana u Srbiji.',
    badge: 'Express',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13"/>
        <path d="M16 8h5l3 3v5h-2"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    stats: '2-3',
    statsLabel: 'Dana'
  }
]

export default function Features() {
  const cardRefs = useRef([])
  const sectionRef = useRef(null)
  const [activeCard, setActiveCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    // Section reveal observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current)
    }

    // Card reveal observer
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index
            setTimeout(() => {
              entry.target.classList.add(styles.reveal)
            }, index * 100)
          }
        })
      },
      { threshold: isMobile ? 0.1 : 0.3 }
    )

    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card)
    })

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current)
      }
      cardRefs.current.forEach((card) => {
        if (card) cardObserver.unobserve(card)
      })
    }
  }, [])

  return (
    <section className={styles.features} id="features" ref={sectionRef}>
      {/* Animated Background */}
      <div className={styles.bgAnimation}>
        <div className={styles.bgGradient1}></div>
        <div className={styles.bgGradient2}></div>
        <div className={styles.bgGrid}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.sectionHeader} ${isVisible ? styles.headerVisible : ''}`}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelIcon}>✦</span>
            Zašto Mi
            <span className={styles.labelIcon}>✦</span>
          </span>
          <h2 className={styles.sectionTitle}>
            Perfekcija u
            <span className={styles.titleHighlight}> Svakom Detalju</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Kombinacija švajcarske preciznosti, italijanskog dizajna i naše strasti za savršenstvom
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={styles.featureCard}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Number Badge */}
              <div className={styles.featureNumber}>{feature.number}</div>

              {/* Status Badge */}
              <div className={styles.featureBadge}>{feature.badge}</div>

              {/* Icon with Glow */}
              <div className={styles.iconWrapper}>
                <div className={styles.iconGlow}></div>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureSubtitle}>{feature.subtitle}</p>
                <p className={styles.featureDesc}>{feature.description}</p>
                
                {/* Stats */}
                <div className={styles.featureStats}>
                  <span className={styles.statsNumber}>{feature.stats}</span>
                  <span className={styles.statsLabel}>{feature.statsLabel}</span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className={styles.featureArrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>

              {/* Animated Border */}
              <div className={styles.cardBorder}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomSection} ${isVisible ? styles.bottomVisible : ''}`}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Spremni za savršen sat?</h3>
              <p className={styles.ctaText}>
                Pridružite se hiljadama zadovoljnih kupaca koji su već izabrali kvalitet
              </p>
            </div>
            <button className={styles.ctaButton}>
              <span>Pregledaj Kolekciju</span>
              <span className={styles.ctaButtonArrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}