'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Video.module.css'

export default function Video() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const section = sectionRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const scrollY = window.scrollY
      
      // Calculate scroll progress through section
      const progress = (scrollY - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight)
      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const content = contentRef.current
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (content) {
      observer.observe(content)
    }

    return () => {
      if (content) {
        observer.unobserve(content)
      }
    }
  }, [])

  return (
    <section className={styles.videoSection} ref={sectionRef}>
      {/* Full-Width Video Background */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/Assets/video1.mp4" type="video/mp4" />
          {/* Fallback image */}
        </video>
        
        {/* Video Overlay */}
        <div className={styles.videoOverlay}></div>

        {/* Loading State */}
        {!isVideoLoaded && (
          <div className={styles.videoPlaceholder}>
            <div className={styles.loader}></div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className={styles.contentOverlay} ref={contentRef}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>
              <span className={styles.badgeIcon}>⌚</span>
              Swiss Made Excellence
            </span>
            
            <h2 className={styles.heroTitle}>
              Craftsmanship that
              <span className={styles.titleBreak}></span>
              <span className={styles.titleGold}> Lasts Forever</span>
            </h2>
            
            {/* <p className={styles.heroSubtitle}>
              Every watch is a masterpiece of precision, designed with passion 
              and crafted from the finest materials for those who appreciate perfection.
            </p> */}

            <div className={styles.heroCta}>
              <a href="#collection" className={styles.btnPrimary}>
                <span>Explore Collection</span>
                <span className={styles.btnArrow}>→</span>
              </a>
              <a href="#features" className={styles.btnSecondary}>
                {/* <span className={styles.playIcon}>▶</span> */}
                <span>Contact Us</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years of Tradition</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Satisfied Customers</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99%</span>
                <span className={styles.statLabel}>Precision</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Grid */}
      <div className={styles.showcaseSection}>
        <div className={styles.container}>
          <div className={styles.showcaseHeader}>
            <span className={styles.showcaseLabel}>Details That Speak</span>
            <h3 className={styles.showcaseTitle}>
              Every Watch Tells
              <span className={styles.showcaseTitleGold}>‎ Its Story</span>
            </h3>
          </div>

          <div className={styles.showcaseGrid}>
            {/* Large Feature */}
            <div className={styles.showcaseItem} data-size="large">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat5.jpg" alt="Watch mechanism detail" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>Swiss Movement</span>
                    <h4 className={styles.showcaseItemTitle}>Automatic Movement</h4>
                    <p className={styles.showcaseItemDesc}>
                      Precision that requires no battery. Every wrist movement powers perfection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Items */}
            <div className={styles.showcaseItem} data-size="medium">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat6.jpg" alt="Sapphire crystal" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>Premium Materials</span>
                    <h4 className={styles.showcaseItemTitle}>Sapphire Crystal</h4>
                    <p className={styles.showcaseItemDesc}>
                      Scratch-resistant and crystal clear.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.showcaseItem} data-size="medium">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat4.jpg" alt="Stainless steel" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>316L Steel</span>
                    <h4 className={styles.showcaseItemTitle}>Stainless Steel</h4>
                    <p className={styles.showcaseItemDesc}>
                      Anti-corrosive and hypoallergenic for maximum durability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Items */}
            <div className={styles.showcaseItem} data-size="small">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat1.jpg" alt="Water resistant" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>100M</span>
                    <h4 className={styles.showcaseItemTitle}>Water Resistant</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.showcaseItem} data-size="small">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat2.jpg" alt="Luminous hands" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>Swiss Lume</span>
                    <h4 className={styles.showcaseItemTitle}>Glows in Dark</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parallax Feature */}
      <div className={styles.parallaxSection}>
        <div 
          className={styles.parallaxImage}
          style={{
            transform: `translateY(${scrollProgress * 100}px)`
          }}
        >
          <img src="/Assets/sat2.jpg" alt="Premium watch detail" />
        </div>
        <div className={styles.parallaxContent}>
          <div className={styles.container}>
            <div className={styles.parallaxText}>
              <span className={styles.parallaxLabel}>Handcrafted Perfection</span>
              <h3 className={styles.parallaxTitle}>
                Built For
                <span className={styles.parallaxTitleGold}>‎ Excellence</span>
              </h3>
              <p className={styles.parallaxDesc}>
                Every watch goes through 200+ hours of careful craftsmanship. 
                From selecting materials to final polishing - every step is mastery.
              </p>
              <div className={styles.parallaxFeatures}>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>200+ hours of handcrafting</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>15+ quality checks</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Lifetime support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>
              Ready For Your Next
              <span className={styles.ctaTitleGold}>‎ Masterpiece?</span>
            </h3>
            <p className={styles.ctaSubtitle}>
              Explore our exclusive collection of premium watches
            </p>
            <a href="/#contact" className={styles.ctaButton}>
              <span>View Collection</span>
              <span className={styles.ctaArrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}