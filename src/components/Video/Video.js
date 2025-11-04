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
              Majstorstvo koje
              <span className={styles.titleBreak}></span>
              <span className={styles.titleGold}> Traje Večno</span>
            </h2>
            
            {/* <p className={styles.heroSubtitle}>
              Svaki sat je remek-delo preciznosti, dizajniran sa strašću 
              i izrađen od najfinijih materijala za one koji cene savršenstvo.
            </p> */}

            <div className={styles.heroCta}>
              <a href="#collection" className={styles.btnPrimary}>
                <span>Istražite Kolekciju</span>
                <span className={styles.btnArrow}>→</span>
              </a>
              <a href="#features" className={styles.btnSecondary}>
                {/* <span className={styles.playIcon}>▶</span> */}
                <span>Kontaktirajte Nas</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Godina Tradicije</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Zadovoljnih Kupaca</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99%</span>
                <span className={styles.statLabel}>Preciznost</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>Godine Garancije</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Grid */}
      <div className={styles.showcaseSection}>
        <div className={styles.container}>
          <div className={styles.showcaseHeader}>
            <span className={styles.showcaseLabel}>Detalji Koji Govore</span>
            <h3 className={styles.showcaseTitle}>
              Svaki Sat Priča
              <span className={styles.showcaseTitleGold}>‎ Svoju Priču</span>
            </h3>
          </div>

          <div className={styles.showcaseGrid}>
            {/* Large Feature */}
            <div className={styles.showcaseItem} data-size="large">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat5.jpg" alt="Sat detalj mehanizam" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>Švajcarski Mehanizam</span>
                    <h4 className={styles.showcaseItemTitle}>Automatski Mehanizam</h4>
                    <p className={styles.showcaseItemDesc}>
                      Preciznost koja ne zahteva bateriju. Svaki pokret ruke pokreće perfekciju.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medium Items */}
            <div className={styles.showcaseItem} data-size="medium">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat6.jpg" alt="Safirno staklo" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>Premium Materijali</span>
                    <h4 className={styles.showcaseItemTitle}>Safirno Staklo</h4>
                    <p className={styles.showcaseItemDesc}>
                      Otporno na grebanje i kristalno čisto.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.showcaseItem} data-size="medium">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat4.jpg" alt="Nehrđajući čelik" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>316L Čelik</span>
                    <h4 className={styles.showcaseItemTitle}>Nehrđajući Čelik</h4>
                    <p className={styles.showcaseItemDesc}>
                      Antikorozivan i hipoalergen za maksimalnu trajnost.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Items */}
            <div className={styles.showcaseItem} data-size="small">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat1.jpg" alt="Vodootpornost" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>100M</span>
                    <h4 className={styles.showcaseItemTitle}>Vodootporan</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.showcaseItem} data-size="small">
              <div className={styles.showcaseImage}>
                <img src="/Assets/sat2.jpg" alt="Luminozni kazaljke" />
                <div className={styles.showcaseOverlay}>
                  <div className={styles.showcaseContent}>
                    <span className={styles.showcaseTag}>Swiss Lume</span>
                    <h4 className={styles.showcaseItemTitle}>Svetli u Mraku</h4>
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
          <img src="/Assets/sat2.jpg" alt="Premium sat detalj" />
        </div>
        <div className={styles.parallaxContent}>
          <div className={styles.container}>
            <div className={styles.parallaxText}>
              <span className={styles.parallaxLabel}>Handcrafted Perfection</span>
              <h3 className={styles.parallaxTitle}>
                Stvoreno Za
                <span className={styles.parallaxTitleGold}>‎ Izvrsnost</span>
              </h3>
              <p className={styles.parallaxDesc}>
                Svaki sat prolazi kroz 200+ sati pažljive izrade. 
                Od biranja materijala do finalnog poliranja - svaki korak je majstorstvo.
              </p>
              <div className={styles.parallaxFeatures}>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>200+ sati ručne izrade</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>15+ kontrola kvaliteta</span>
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Doživotna podrška</span>
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
              Spremni Za Vaše Sledeće
              <span className={styles.ctaTitleGold}>‎Remek-Delo?</span>
            </h3>
            <p className={styles.ctaSubtitle}>
              Istražite našu ekskluzivnu kolekciju premium satova
            </p>
            <a href="/#contact" className={styles.ctaButton}>
              <span>Pogledajte Kolekciju</span>
              <span className={styles.ctaArrow}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}