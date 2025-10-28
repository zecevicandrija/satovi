'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Collection.module.css'

const watches = [
  {
    id: 1,
    color: 'black',
    title: 'Midnight Black',
    description: 'Klasična elegancija',
    circleColor: '#1a1a1a',
    strokeColor: '#333',
    handColor: '#ccc',
    image: '/Assets/sat1.jpg'
  },
  {
    id: 2,
    color: 'silver',
    title: 'Sterling Silver',
    description: 'Moderna sofisticiranost',
    featured: true,
    circleColor: '#c0c0c0',
    strokeColor: '#a8a8a8',
    handColor: '#333',
    image: '/Assets/sat2.jpg'
  },
  {
    id: 3,
    color: 'gold',
    title: 'Royal Gold',
    description: 'Tiha perfekcija',
    circleColor: '#d4af37',
    strokeColor: '#b8941f',
    handColor: '#1a1a1a',
    image: '/Assets/sat3.jpg'
  },
  {
    id: 4,
    color: 'blue',
    title: 'Ocean Blue',
    description: 'Otmena preciznost',
    circleColor: '#1e3a5f',
    strokeColor: '#2c5282',
    handColor: '#c0c0c0',
    image: '/Assets/sat4.jpg'
  }
]

export default function Collection() {
  const [selectedWatch, setSelectedWatch] = useState(null)
  const [activeViews, setActiveViews] = useState({})
  const [visibleItems, setVisibleItems] = useState({})
  const itemRefs = useRef([])
  const intervalRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const watchId = entry.target.dataset.watchId
          
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal)
            setVisibleItems(prev => ({ ...prev, [watchId]: true }))
          } else {
            setVisibleItems(prev => ({ ...prev, [watchId]: false }))
          }
        })
      },
      { threshold: 0.5 }
    )

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item)
      })
    }
  }, [])

  // Auto-switch SAMO za mobilne uređaje
  useEffect(() => {
    // Proveri da li je mobilni uređaj
    const isMobile = window.innerWidth <= 768

    if (!isMobile) return // Izađi ako je desktop

    Object.keys(visibleItems).forEach(watchId => {
      if (visibleItems[watchId]) {
        if (!intervalRefs.current[watchId]) {
          intervalRefs.current[watchId] = setInterval(() => {
            setActiveViews(prev => ({
              ...prev,
              [watchId]: prev[watchId] === 'image' ? 'svg' : 'image'
            }))
          }, 5000)
        }
      } else {
        if (intervalRefs.current[watchId]) {
          clearInterval(intervalRefs.current[watchId])
          delete intervalRefs.current[watchId]
        }
      }
    })

    return () => {
      Object.values(intervalRefs.current).forEach(interval => clearInterval(interval))
    }
  }, [visibleItems])

  const handleSelect = (watch) => {
    setSelectedWatch(watch.id)
  }

  const showPrevious = (watchId, e) => {
    e.stopPropagation()
    setActiveViews(prev => ({
      ...prev,
      [watchId]: 'svg'
    }))
  }

  const showNext = (watchId, e) => {
    e.stopPropagation()
    setActiveViews(prev => ({
      ...prev,
      [watchId]: 'image'
    }))
  }

  return (
    <section className={styles.collection} id="collection">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Kolekcija</span>
          <h2 className={styles.sectionTitle}>Izaberite Vašu Boju</h2>
          <p className={styles.sectionSubtitle}>Isti sat, različite nijanse elegancije</p>
        </div>
        
        <div className={styles.collectionGrid}>
          {watches.map((watch, index) => (
            <div 
              key={watch.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${styles.collectionItem} ${watch.featured ? styles.featured : ''}`}
              data-color={watch.color}
              data-watch-id={watch.id}
            >
              {watch.featured && (
                <div className={styles.featuredBadge}>Popularno</div>
              )}
              
              {/* DESKTOP - samo sat i hover slika */}
              <div className={`${styles.itemImage} ${styles.desktopOnly}`}>
                <div className={styles.hoverImageOverlay}>
                  <img src={watch.image} alt={watch.title} />
                </div>
                <div className={styles.watchDisplay}>
                  <svg viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill={watch.circleColor} stroke={watch.strokeColor} strokeWidth="2"/>
                    <circle cx="100" cy="100" r="60" fill="none" stroke={watch.strokeColor} strokeWidth="1"/>
                    <line x1="100" y1="100" x2="100" y2="50" stroke={watch.handColor} strokeWidth="3"/>
                    <line x1="100" y1="100" x2="130" y2="100" stroke={watch.handColor} strokeWidth="2"/>
                    <circle cx="100" cy="100" r="5" fill={watch.handColor}/>
                  </svg>
                </div>
              </div>

              {/* MOBILE - strelice i auto-switch */}
              <div className={`${styles.itemImage} ${styles.mobileOnly}`}>
                <div className={styles.mobileDisplay}>
                  <div className={`${styles.viewContainer} ${activeViews[watch.id] === 'image' ? styles.showImage : styles.showSvg}`}>
                    <div className={styles.svgView}>
                      <svg viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill={watch.circleColor} stroke={watch.strokeColor} strokeWidth="2"/>
                        <circle cx="100" cy="100" r="60" fill="none" stroke={watch.strokeColor} strokeWidth="1"/>
                        <line x1="100" y1="100" x2="100" y2="50" stroke={watch.handColor} strokeWidth="3"/>
                        <line x1="100" y1="100" x2="130" y2="100" stroke={watch.handColor} strokeWidth="2"/>
                        <circle cx="100" cy="100" r="5" fill={watch.handColor}/>
                      </svg>
                    </div>
                    <div className={styles.imageView}>
                      <img src={watch.image} alt={watch.title} />
                    </div>
                  </div>
                  
                  <button 
                    className={`${styles.arrowBtn} ${styles.arrowLeft}`}
                    onClick={(e) => showPrevious(watch.id, e)}
                    aria-label="Prethodni prikaz"
                  >
                    ‹
                  </button>
                  <button 
                    className={`${styles.arrowBtn} ${styles.arrowRight}`}
                    onClick={(e) => showNext(watch.id, e)}
                    aria-label="Sledeći prikaz"
                  >
                    ›
                  </button>

                  <div className={styles.indicators}>
                    <span className={activeViews[watch.id] !== 'image' ? styles.active : ''}></span>
                    <span className={activeViews[watch.id] === 'image' ? styles.active : ''}></span>
                  </div>
                </div>
              </div>

              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{watch.title}</h3>
                <p className={styles.itemDesc}>{watch.description}</p>
                <button 
                  className={`${styles.btnSelect} ${selectedWatch === watch.id ? styles.selected : ''}`}
                  onClick={() => handleSelect(watch)}
                >
                  {selectedWatch === watch.id ? '✓ Izabrano' : 'Izaberite'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}