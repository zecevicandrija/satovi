'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Kviz.module.css'

export default function Kviz() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [answers, setAnswers] = useState({
    name: '',
    recipient: '',
    style: '',
    frequency: '',
    email: ''
  })
  const [showConfetti, setShowConfetti] = useState(false)
  const contentRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
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

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
    setStep(0)
    setDirection('forward')
    setShowConfetti(false)
    setAnswers({
      name: '',
      recipient: '',
      style: '',
      frequency: '',
      email: ''
    })
  }

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('forward')
    
    setTimeout(() => {
      setStep(step + 1)
      setIsTransitioning(false)
    }, 300)
  }

  const handleBack = () => {
    if (isTransitioning || step === 0) return
    setIsTransitioning(true)
    setDirection('backward')
    
    setTimeout(() => {
      setStep(step - 1)
      setIsTransitioning(false)
    }, 300)
  }

  const handleAnswer = (field, value) => {
    setAnswers({ ...answers, [field]: value })
    setTimeout(() => {
      handleNext()
    }, 400)
  }

  const skipEmail = () => {
    setStep(5)
    triggerConfetti()
  }

  const submitEmail = () => {
    if (answers.email && validateEmail(answers.email)) {
      console.log('Email submitted:', answers.email)
      setStep(5)
      triggerConfetti()
    }
  }

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const getRecommendation = () => {
    const { recipient, style, frequency } = answers
    
    // Simple recommendation logic
    if (style === 'minimalist') {
      return {
        name: 'Classic Minimalist',
        image: '/Assets/sat1.jpg',
        description: 'Elegantan i jednostavan dizajn za svakodnevno nošenje.'
      }
    } else if (style === 'unique') {
      return {
        name: 'Bold Statement',
        image: '/Assets/sat2.jpg',
        description: 'Jedinstveni dizajn koji privlači pažnju.'
      }
    } else {
      return {
        name: 'Versatile Classic',
        image: '/Assets/sat3.jpg',
        description: 'Savršena kombinacija stila i funkcionalnosti.'
      }
    }
  }

  const recommendation = getRecommendation()

  return (
    <section className={styles.kvizSection} ref={sectionRef}>
      {/* Animated Background */}
      <div className={styles.bgAnimation}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.kvizContent} ref={contentRef}>
          <span className={styles.badge}>
            <span className={styles.badgeIcon}>🎯</span>
            Personalizovano Za Vas
          </span>
          
          <h2 className={styles.kvizTitle}>
            Pronađite Svoj
            <span className={styles.titleGold}>‎ Savršeni Sat</span>
          </h2>
          
          <p className={styles.kvizSubtitle}>
            Odgovorite na nekoliko brzih pitanja i preporučićemo Vam idealan sat 
            koji odgovara Vašem stilu i potrebama.
          </p>
          
          <button className={styles.btnStart} onClick={openModal}>
            <span className={styles.btnIcon}>✨</span>
            <span>Započni Kviz</span>
            <span className={styles.btnArrow}>→</span>
          </button>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <span>2 minuta</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎁</span>
              <span>10% popust</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💎</span>
              <span>Personalizovano</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={closeModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Back Button */}
            {step > 0 && step < 5 && (
              <button className={styles.backBtn} onClick={handleBack}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
            )}

            {/* Confetti */}
            {showConfetti && (
              <div className={styles.confetti}>
                {[...Array(30)].map((_, i) => (
                  <div key={i} className={styles.confettiPiece}></div>
                ))}
              </div>
            )}

            {/* Step 0: Ime */}
            {step === 0 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>01</span>
                  <h3 className={styles.stepTitle}>Dobrodošli!</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Započnimo sa Vašim imenom</p>
                
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Npr. Marko"
                    value={answers.name}
                    onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && answers.name && handleNext()}
                    autoFocus
                  />
                  <span className={styles.inputIcon}>👤</span>
                </div>
                
                <button 
                  className={styles.btnNext} 
                  onClick={handleNext}
                  disabled={!answers.name}
                >
                  <span>Nastavi</span>
                  <span className={styles.btnNextArrow}>→</span>
                </button>
              </div>
            )}

            {/* Step 1: Za koga je sat */}
            {step === 1 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>02</span>
                  <h3 className={styles.stepTitle}>Zdravo {answers.name}! 👋</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Za koga je ovaj sat?</p>
                
                <div className={styles.options}>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'loved-one' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'loved-one')}
                  >
                    <span className={styles.optionIcon}>❤️</span>
                    <span className={styles.optionText}>Voljenu Osobu</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'myself' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'myself')}
                  >
                    <span className={styles.optionIcon}>😊</span>
                    <span className={styles.optionText}>Sebe</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'friend' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'friend')}
                  >
                    <span className={styles.optionIcon}>🤝</span>
                    <span className={styles.optionText}>Prijatelja</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'parent' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'parent')}
                  >
                    <span className={styles.optionIcon}>👨‍👩‍👦</span>
                    <span className={styles.optionText}>Roditelja</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Stil */}
            {step === 2 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>03</span>
                  <h3 className={styles.stepTitle}>Odlično! 🎨</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Koji stil Vam se najviše dopada?</p>
                
                <div className={styles.options}>
                  <button 
                    className={`${styles.optionBtn} ${styles.large} ${answers.style === 'minimalist' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('style', 'minimalist')}
                  >
                    <span className={styles.optionIcon}>⚪</span>
                    <span className={styles.optionText}>Minimalističan</span>
                    <span className={styles.optionDesc}>Čist i elegantan dizajn</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${styles.large} ${answers.style === 'unique' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('style', 'unique')}
                  >
                    <span className={styles.optionIcon}>✨</span>
                    <span className={styles.optionText}>Jedinstveno & Moćno</span>
                    <span className={styles.optionDesc}>Statement komad</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${styles.large} ${answers.style === 'anything' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('style', 'anything')}
                  >
                    <span className={styles.optionIcon}>🎨</span>
                    <span className={styles.optionText}>Sve Može</span>
                    <span className={styles.optionDesc}>Otvoren za sve stilove</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Učestalost kupovine */}
            {step === 3 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>04</span>
                  <h3 className={styles.stepTitle}>Sjajno! ⭐</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Koliko često kupujete satove?</p>
                
                <div className={styles.options}>
                  <button 
                    className={`${styles.optionBtn} ${answers.frequency === 'rarely' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('frequency', 'rarely')}
                  >
                    <span className={styles.optionIcon}>🌙</span>
                    <span className={styles.optionText}>Retko</span>
                    <span className={styles.optionDesc}>Posebne prilike</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.frequency === 'sometimes' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('frequency', 'sometimes')}
                  >
                    <span className={styles.optionIcon}>☀️</span>
                    <span className={styles.optionText}>Povremeno</span>
                    <span className={styles.optionDesc}>Nekoliko puta godišnje</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.frequency === 'often' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('frequency', 'often')}
                  >
                    <span className={styles.optionIcon}>⭐</span>
                    <span className={styles.optionText}>Često</span>
                    <span className={styles.optionDesc}>Volim novu kolekciju</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Email za popust */}
            {step === 4 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>05</span>
                  <h3 className={styles.stepTitle}>Imamo rezultat! 🎉</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Želite li 10% popusta na Vašu kupovinu?</p>
                <p className={styles.stepDescription}>
                  Unesite email i dobićete ekskluzivni kod
                </p>
                
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="vas.email@example.com"
                    value={answers.email}
                    onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && answers.email && submitEmail()}
                  />
                  <span className={styles.inputIcon}>📧</span>
                </div>
                
                <div className={styles.buttonGroup}>
                  <button 
                    className={styles.btnNext} 
                    onClick={submitEmail} 
                    disabled={!answers.email || !validateEmail(answers.email)}
                  >
                    <span>Pošalji</span>
                    <span className={styles.btnNextArrow}>→</span>
                  </button>
                  <button className={styles.btnSkip} onClick={skipEmail}>
                    Ne hvala, nastavi
                  </button>
                </div>

                <p className={styles.privacyText}>
                  🔒 Vaši podaci su sigurni i neće biti deljeni
                </p>
              </div>
            )}

            {/* Step 5: Rezultat */}
            {step === 5 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.resultHeader}>
                  <div className={styles.resultBadge}>
                    <span className={styles.resultBadgeIcon}>🎯</span>
                    <span>Vaša Preporuka</span>
                  </div>
                  <h3 className={styles.resultTitle}>Savršeno Odgovara!</h3>
                  <p className={styles.resultSubtitle}>
                    Na osnovu Vaših odgovora, ovo je idealan sat za Vas
                  </p>
                </div>

                <div className={styles.resultCard}>
                  <div className={styles.resultImage}>
                    <img src={recommendation.image} alt={recommendation.name} />
                    <div className={styles.resultImageOverlay}>
                      <span className={styles.resultMatch}>98% Match</span>
                    </div>
                  </div>
                  
                  <div className={styles.resultInfo}>
                    <h4 className={styles.resultName}>{recommendation.name}</h4>
                    <p className={styles.resultDescription}>{recommendation.description}</p>
                    
                    <div className={styles.resultFeatures}>
                      <span className={styles.resultFeature}>✓ Premium kvalitet</span>
                      <span className={styles.resultFeature}>✓ 5 godina garancije</span>
                      <span className={styles.resultFeature}>✓ Besplatna dostava</span>
                    </div>
                  </div>
                </div>

                {answers.email && (
                  <div className={styles.discountBox}>
                    <span className={styles.discountIcon}>🎁</span>
                    <div className={styles.discountText}>
                      <strong>Proverite Vaš email!</strong>
                      <p>Poslali smo Vam kod sa 10% popustom</p>
                    </div>
                  </div>
                )}

                <div className={styles.resultActions}>
                  <a href="#collection" className={styles.btnResult} onClick={closeModal}>
                    <span>Pogledajte Kolekciju</span>
                    <span className={styles.btnResultArrow}>→</span>
                  </a>
                  <button className={styles.btnShare}>
                    <span>📤</span>
                    <span>Podeli</span>
                  </button>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>

            {/* Step Counter */}
            <div className={styles.stepCounter}>
              {step < 5 ? `Pitanje ${step + 1} od 5` : 'Gotovo!'}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}