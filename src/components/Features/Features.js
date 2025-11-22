'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Features.module.css'

const features = [
  {
    number: '01',
    title: 'Swiss Precision',
    subtitle: 'Swiss Made Excellence',
    description: 'Premium quality automatic movement guarantees 99.9% accuracy. Every watch undergoes rigorous quality testing.',
    badge: 'Premium',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    stats: '99.9%',
    statsLabel: 'Accuracy'
  },
  {
    number: '02',
    title: 'Premium Materials',
    subtitle: 'Luxury Craftsmanship',
    description: '316L stainless steel and scratch-resistant sapphire crystal. Water-resistant up to 100m with magnetic field protection.',
    badge: 'Certified',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    stats: '316L',
    statsLabel: 'Steel'
  },
  {
    number: '03',
    title: 'Design with Passion',
    subtitle: 'Timeless Elegance',
    description: 'Every detail carefully crafted by award-winning designers. Minimalist elegance that never goes out of style.',
    badge: 'Award Winner',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    stats: '200+',
    statsLabel: 'Work Hours'
  },
  {
    number: '04',
    title: '5 Year Warranty',
    subtitle: 'Protected Investment',
    description: 'Full international warranty with free service and maintenance. Your investment is in safe hands.',
    badge: 'Guaranteed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    stats: '5',
    statsLabel: 'Years'
  },
  {
    number: '05',
    title: '24/7 Premium Support',
    subtitle: 'Always Here For You',
    description: 'Our expert team is available 24/7 via chat, phone or email. Response in less than 1 hour guaranteed.',
    badge: 'Live Support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M9 10h.01"/>
        <path d="M15 10h.01"/>
      </svg>
    ),
    stats: '<1h',
    statsLabel: 'Response'
  },
  {
    number: '06',
    title: 'Free Shipping',
    subtitle: 'Express Worldwide',
    description: 'Fast and secure delivery with tracking and premium packaging. Insurance included. 2-3 day delivery in Serbia.',
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
    statsLabel: 'Days'
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
            Why Us
            <span className={styles.labelIcon}>✦</span>
          </span>
          <h2 className={styles.sectionTitle}>
            Perfection in
            <span className={styles.titleHighlight}> Every Detail</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A combination of Swiss precision, Italian design and our passion for perfection
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
              <h3 className={styles.ctaTitle}>Ready for the perfect watch?</h3>
              <p className={styles.ctaText}>
                Join thousands of satisfied customers who have already chosen quality
              </p>
            </div>
            <button className={styles.ctaButton}>
              <span>View Collection</span>
              <span className={styles.ctaButtonArrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}