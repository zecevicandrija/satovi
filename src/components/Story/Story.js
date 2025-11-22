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

    // Warranty: 0 -> 2
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
              Our Story
              <span className={styles.labelIcon}>✦</span>
            </span>
            <h2 className={styles.sectionTitle}>
              Where Tradition Meets
              <span className={styles.titleHighlight}> Innovation</span>
            </h2>
            <p className={styles.storyText}>
              Every watch is a masterpiece carefully designed to reflect your unique 
              individuality. We combine timeless elegance with modern precision, 
              creating an exceptional piece you'll wear with pride for decades.
            </p>
            <p className={styles.storyTextSecondary}>
              From selecting the finest materials to the final master's touch, every detail 
              is crafted to provide the perfect harmony of form and function.
            </p>
            
            {/* CTA Button */}
            <a href="#collection" className={styles.storyButton}>
              <span>Explore Collection</span>
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
                alt="CHRONOS Premium Watch" 
                className={styles.watchImage}
              /> */}
              {/* You can place a watch image or graphic here */}
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
            <span className={styles.statLabel}>Swiss Precision</span>
            <span className={styles.statDescription}>Finest quality movement</span>
          </div>
          <div 
            className={styles.statItem}
            ref={(el) => (statRefs.current[1] = el)}
          >
            <div className={styles.statIcon}>🛡️</div>
            <span className={styles.statNumber}>
              {counts.support}/7
            </span>
            <span className={styles.statLabel}>Premium Support</span>
            <span className={styles.statDescription}>Always here for you</span>
          </div>
          <div 
            className={styles.statItem}
            ref={(el) => (statRefs.current[2] = el)}
          >
            <div className={styles.statIcon}>💎</div>
            <span className={styles.statNumber}>
              {counts.warranty} Years
            </span>
            <span className={styles.statLabel}>Warranty</span>
            <span className={styles.statDescription}>Quality assured</span>
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
            <h3 className={styles.featureTitle}>Handcrafted</h3>
            <p className={styles.featureText}>
              Each watch is carefully assembled by experienced masters with over 200 hours of work
            </p>
          </div>
          
          <div 
            className={styles.featureCard}
            ref={(el) => (featuresRefs.current[1] = el)}
          >
            <div className={styles.featureIconWrapper}>
              <span className={styles.featureIcon}>✨</span>
            </div>
            <h3 className={styles.featureTitle}>Premium Materials</h3>
            <p className={styles.featureText}>
              Sapphire crystal, 316L stainless steel and highest quality leather straps
            </p>
          </div>
          
          <div 
            className={styles.featureCard}
            ref={(el) => (featuresRefs.current[2] = el)}
          >
            <div className={styles.featureIconWrapper}>
              <span className={styles.featureIcon}>🏆</span>
            </div>
            <h3 className={styles.featureTitle}>Lifetime Value</h3>
            <p className={styles.featureText}>
              Timeless design that retains value and becomes part of your family tradition
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}