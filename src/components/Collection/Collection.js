'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Collection.module.css'

const watches = [
  {
    id: 1,
    color: 'black',
    title: 'Midnight Elegance',
    subtitle: 'Noćna Elegancija',
    description: 'Za one koji vole klasiku',
    price: '89.990',
    oldPrice: '129.990',
    discount: '31%',
    circleColor: '#1a1a1a',
    strokeColor: '#333',
    handColor: '#ccc',
    image: '/Assets/sat1.jpg',
    badge: 'Best Seller',
    badgeType: 'bestseller',
    stock: 'U stoku',
    rating: 4.9,
    reviews: 127,
    features: ['Safirno staklo', '50m vodootpornost', 'Automatski mehanizam'],
    materials: ['Nehrđajući čelik', 'Kožna narukvica', 'Swiss movement']
  },
  {
    id: 2,
    color: 'silver',
    title: 'Sterling Prestige',
    subtitle: 'Srebrna Elegancija',
    description: 'Moderna sofisticiranost',
    featured: true,
    price: '99.990',
    oldPrice: '149.990',
    discount: '33%',
    circleColor: '#c0c0c0',
    strokeColor: '#a8a8a8',
    handColor: '#333',
    image: '/Assets/sat2.jpg',
    badge: 'Najpopularniji',
    badgeType: 'popular',
    stock: 'Samo 3 preostala',
    stockUrgent: true,
    rating: 5.0,
    reviews: 243,
    features: ['Anti-refleks', '100m vodootpornost', 'Hronograf'],
    materials: ['316L čelik', 'Milanesi narukvica', 'Precision quartz']
  },
  {
    id: 3,
    color: 'gold',
    title: 'Royal Excellence',
    subtitle: 'Kraljevsko Zlato',
    description: 'Luksuz koji traje',
    price: '119.990',
    oldPrice: '179.990',
    discount: '33%',
    circleColor: '#d4af37',
    strokeColor: '#b8941f',
    handColor: '#1a1a1a',
    image: '/Assets/sat3.jpg',
    badge: 'Premium',
    badgeType: 'premium',
    stock: 'Limitirana serija',
    rating: 4.8,
    reviews: 89,
    features: ['18K pozlata', '30m vodootpornost', 'Ručna izrada'],
    materials: ['Pozlaćeni čelik', 'Premium koža', 'Japanese movement']
  },
  {
    id: 4,
    color: 'blue',
    title: 'Ocean Dynasty',
    subtitle: 'Okean Dubine',
    description: 'Dubok i misteriozans',
    price: '94.990',
    oldPrice: '139.990',
    discount: '32%',
    circleColor: '#1e3a5f',
    strokeColor: '#2c5282',
    handColor: '#c0c0c0',
    image: '/Assets/sat4.jpg',
    badge: 'Novo',
    badgeType: 'new',
    stock: 'U stoku',
    rating: 4.7,
    reviews: 156,
    features: ['Plavi safir', '200m vodootpornost', 'Svetleće kazaljke'],
    materials: ['Titanijum', 'Gumena narukvica', 'Dive watch certified']
  }
]

export default function Collection() {
  const [selectedWatch, setSelectedWatch] = useState(null)
  const [activeViews, setActiveViews] = useState({})
  const [visibleItems, setVisibleItems] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)
  const [wishlist, setWishlist] = useState({})
  const [quickView, setQuickView] = useState(null)
  const [viewingCount, setViewingCount] = useState({})
  const itemRefs = useRef([])
  const intervalRefs = useRef({})
  const cardRefs = useRef([])

  // Intersection Observer za scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const watchId = entry.target.dataset.watchId
          
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(styles.reveal)
            }, parseInt(entry.target.dataset.index) * 200)
            setVisibleItems(prev => ({ ...prev, [watchId]: true }))
          } else {
            setVisibleItems(prev => ({ ...prev, [watchId]: false }))
          }
        })
      },
      { threshold: 0.2 }
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

  // Elegant Hover Effects - Handled in CSS
  // No JS needed for smooth hover animations

  // Auto-switch za mobilne
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    if (!isMobile) return

    Object.keys(visibleItems).forEach(watchId => {
      if (visibleItems[watchId]) {
        if (!intervalRefs.current[watchId]) {
          intervalRefs.current[watchId] = setInterval(() => {
            setActiveViews(prev => ({
              ...prev,
              [watchId]: prev[watchId] === 'image' ? 'svg' : 'image'
            }))
          }, 4000)
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

  // Fake "people viewing" counter
  useEffect(() => {
    const updateViewingCount = () => {
      const newCounts = {}
      watches.forEach(watch => {
        newCounts[watch.id] = Math.floor(Math.random() * 8) + 3 // 3-10 ljudi
      })
      setViewingCount(newCounts)
    }

    updateViewingCount()
    const interval = setInterval(updateViewingCount, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleAddToCart = (watch, e) => {
    e.stopPropagation()
    setSelectedWatch(watch.id)
    
    // Animacija dugmeta
    const button = e.currentTarget
    button.classList.add(styles.addToCartAnimation)
    
    setTimeout(() => {
      button.classList.remove(styles.addToCartAnimation)
    }, 1000)
  }

  const toggleWishlist = (watchId, e) => {
    e.stopPropagation()
    setWishlist(prev => ({
      ...prev,
      [watchId]: !prev[watchId]
    }))
  }

  const showPrevious = (watchId, e) => {
    e.stopPropagation()
    setActiveViews(prev => ({ ...prev, [watchId]: 'svg' }))
  }

  const showNext = (watchId, e) => {
    e.stopPropagation()
    setActiveViews(prev => ({ ...prev, [watchId]: 'image' }))
  }

  const openQuickView = (watch, e) => {
    e.stopPropagation()
    setQuickView(watch)
  }

  const closeQuickView = () => {
    setQuickView(null)
  }

  return (
    <section className={styles.collection} id="collection">
      {/* Animated Background */}
      <div className={styles.collectionBg}>
        <div className={styles.bgGradient}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelIcon}>✦</span>
            Premium Kolekcija
            <span className={styles.labelIcon}>✦</span>
          </span>
          <h2 className={styles.sectionTitle}>
            Izaberite Vaš
            <span className={styles.titleHighlight}>‎ Stil</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Svaki sat je remek-delo. Različite boje, ista savršenost.
          </p>
          
          {/* Trust Bar */}
          <div className={styles.trustBar}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span>Besplatna Dostava</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span>2 God. Garancija</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span>30 Dana Vraćanje</span>
            </div>
          </div>
        </div>
        
        {/* Collection Grid */}
        <div className={styles.collectionGrid}>
          {watches.map((watch, index) => (
            <div 
              key={watch.id}
              ref={(el) => {
                itemRefs.current[index] = el
                cardRefs.current[index] = el
              }}
              className={`${styles.collectionItem} ${watch.featured ? styles.featured : ''}`}
              data-color={watch.color}
              data-watch-id={watch.id}
              data-index={index}
              onMouseEnter={() => setHoveredCard(watch.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Color Particles */}
              <div className={styles.colorParticles}>
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={styles.particle}
                    style={{ 
                      background: watch.circleColor,
                      animationDelay: `${i * 0.3}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Badges */}
              <div className={styles.badges}>
                {watch.badge && (
                  <div className={`${styles.badge} ${styles[watch.badgeType]}`}>
                    {watch.badge}
                  </div>
                )}
                {watch.discount && (
                  <div className={styles.discountBadge}>
                    -{watch.discount}
                  </div>
                )}
              </div>

              {/* Wishlist Button */}
              <button 
                className={`${styles.wishlistBtn} ${wishlist[watch.id] ? styles.active : ''}`}
                onClick={(e) => toggleWishlist(watch.id, e)}
                aria-label="Add to wishlist"
              >
                <svg viewBox="0 0 24 24" fill={wishlist[watch.id] ? 'currentColor' : 'none'} stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              {/* Live Viewers */}
              {viewingCount[watch.id] && (
                <div className={styles.liveViewers}>
                  <span className={styles.viewerDot}></span>
                  <span>{viewingCount[watch.id]} ljudi gleda</span>
                </div>
              )}
              
              {/* DESKTOP - Hover Image Effect */}
              <div className={`${styles.itemImage} ${styles.desktopOnly}`}>
                <div className={styles.imageWrapper}>
                  <div className={styles.hoverImageOverlay}>
                    <img src={watch.image} alt={watch.title} />
                    <div className={styles.imageGlow}></div>
                  </div>
                  <div className={styles.watchDisplay}>
                    <svg viewBox="0 0 200 200">
                      <defs>
                        <radialGradient id={`grad-${watch.id}`}>
                          <stop offset="0%" stopColor={watch.circleColor} stopOpacity="1" />
                          <stop offset="100%" stopColor={watch.strokeColor} stopOpacity="0.8" />
                        </radialGradient>
                        <filter id={`glow-${watch.id}`}>
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      <circle cx="100" cy="100" r="80" fill={`url(#grad-${watch.id})`} stroke={watch.strokeColor} strokeWidth="2" filter={`url(#glow-${watch.id})`}/>
                      <circle cx="100" cy="100" r="60" fill="none" stroke={watch.strokeColor} strokeWidth="1" opacity="0.5"/>
                      <line x1="100" y1="100" x2="100" y2="50" stroke={watch.handColor} strokeWidth="3" strokeLinecap="round"/>
                      <line x1="100" y1="100" x2="130" y2="100" stroke={watch.handColor} strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="100" cy="100" r="5" fill={watch.handColor}/>
                    </svg>
                  </div>
                </div>

                {/* Quick View Button */}
                <button 
                  className={styles.quickViewBtn}
                  onClick={(e) => openQuickView(watch, e)}
                >
                  <span>👁</span>
                  <span>Brzi Pregled</span>
                </button>

                {/* Specs Preview on Hover */}
                <div className={styles.hoverSpecs}>
                  {watch.features.map((feature, idx) => (
                    <div key={idx} className={styles.specItem}>
                      <span className={styles.specIcon}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MOBILE - Swipe & Auto-switch */}
              <div className={`${styles.itemImage} ${styles.mobileOnly}`}>
                <div className={styles.mobileDisplay}>
                  <div className={`${styles.viewContainer} ${activeViews[watch.id] === 'image' ? styles.showImage : styles.showSvg}`}>
                    <div className={styles.svgView}>
                      <svg viewBox="0 0 200 200">
                        <defs>
                          <radialGradient id={`grad-mobile-${watch.id}`}>
                            <stop offset="0%" stopColor={watch.circleColor} stopOpacity="1" />
                            <stop offset="100%" stopColor={watch.strokeColor} stopOpacity="0.8" />
                          </radialGradient>
                        </defs>
                        <circle cx="100" cy="100" r="80" fill={`url(#grad-mobile-${watch.id})`} stroke={watch.strokeColor} strokeWidth="2"/>
                        <circle cx="100" cy="100" r="60" fill="none" stroke={watch.strokeColor} strokeWidth="1" opacity="0.5"/>
                        <line x1="100" y1="100" x2="100" y2="50" stroke={watch.handColor} strokeWidth="3" strokeLinecap="round"/>
                        <line x1="100" y1="100" x2="130" y2="100" stroke={watch.handColor} strokeWidth="2" strokeLinecap="round"/>
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

              {/* Item Info */}
              <div className={styles.itemInfo}>
                <div className={styles.colorDot} style={{ background: watch.circleColor }}></div>
                
                <h3 className={styles.itemTitle}>{watch.title}</h3>
                <p className={styles.itemSubtitle}>{watch.subtitle}</p>
                <p className={styles.itemDesc}>{watch.description}</p>

                {/* Rating */}
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(watch.rating) ? styles.filled : ''}>★</span>
                    ))}
                  </div>
                  <span className={styles.ratingText}>
                    {watch.rating} ({watch.reviews} recenzija)
                  </span>
                </div>

                {/* Price */}
                <div className={styles.priceSection}>
                  <div className={styles.priceMain}>
                    <span className={styles.price}>{watch.price} RSD</span>
                    {watch.oldPrice && (
                      <span className={styles.oldPrice}>{watch.oldPrice} RSD</span>
                    )}
                  </div>
                  {watch.discount && (
                    <span className={styles.savings}>
                      Ušteda: {parseInt(watch.oldPrice.replace('.', '')) - parseInt(watch.price.replace('.', ''))} RSD
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className={`${styles.stockStatus} ${watch.stockUrgent ? styles.urgent : ''}`}>
                  <span className={styles.stockDot}></span>
                  <span>{watch.stock}</span>
                </div>

                {/* Feature Tags */}
                <div className={styles.featureTags}>
                  {watch.features.slice(0, 2).map((feature, idx) => (
                    <span key={idx} className={styles.tag}>{feature}</span>
                  ))}
                </div>

                {/* CTA Button */}
                <button 
                  className={`${styles.btnAddToCart} ${selectedWatch === watch.id ? styles.selected : ''}`}
                  onClick={(e) => handleAddToCart(watch, e)}
                >
                  <span className={styles.btnIcon}>
                    {selectedWatch === watch.id ? '✓' : '🛒'}
                  </span>
                  <span className={styles.btnText}>
                    {selectedWatch === watch.id ? 'Dodato u Korpu' : 'Dodaj u Korpu'}
                  </span>
                  <span className={styles.btnShine}></span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <p className={styles.ctaText}>Niste sigurni koji sat je za vas?</p>
          <button className={styles.ctaButton}>
            <span>Kontaktirajte Nas</span>
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div className={styles.modalOverlay} onClick={closeQuickView}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeQuickView}>×</button>
            <div className={styles.modalGrid}>
              <div className={styles.modalImage}>
                <img src={quickView.image} alt={quickView.title} />
              </div>
              <div className={styles.modalInfo}>
                <h3>{quickView.title}</h3>
                <p className={styles.modalSubtitle}>{quickView.subtitle}</p>
                <div className={styles.modalRating}>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(quickView.rating) ? styles.filled : ''}>★</span>
                    ))}
                  </div>
                  <span>{quickView.rating} ({quickView.reviews})</span>
                </div>
                <div className={styles.modalPrice}>
                  <span className={styles.price}>{quickView.price} RSD</span>
                  {quickView.oldPrice && <span className={styles.oldPrice}>{quickView.oldPrice} RSD</span>}
                </div>
                <div className={styles.modalFeatures}>
                  <h4>Karakteristike:</h4>
                  <ul>
                    {quickView.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.modalMaterials}>
                  <h4>Materijali:</h4>
                  <ul>
                    {quickView.materials.map((material, idx) => (
                      <li key={idx}>{material}</li>
                    ))}
                  </ul>
                </div>
                <button className={styles.modalCtaBtn} onClick={(e) => handleAddToCart(quickView, e)}>
                  Dodaj u Korpu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}