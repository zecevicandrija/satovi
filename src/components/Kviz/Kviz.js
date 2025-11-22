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
        description: 'Elegant and simple design for everyday wear.'
      }
    } else if (style === 'unique') {
      return {
        name: 'Bold Statement',
        image: '/Assets/sat2.jpg',
        description: 'Unique design that attracts attention.'
      }
    } else {
      return {
        name: 'Versatile Classic',
        image: '/Assets/sat3.jpg',
        description: 'Perfect combination of style and functionality.'
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
            Personalized For You
          </span>
          
          <h2 className={styles.kvizTitle}>
            Find Your
            <span className={styles.titleGold}>‎ Perfect Watch</span>
          </h2>
          
          <p className={styles.kvizSubtitle}>
            Answer a few quick questions and we'll recommend the ideal watch 
            that matches your style and needs.
          </p>
          
          <button className={styles.btnStart} onClick={openModal}>
            <span className={styles.btnIcon}>✨</span>
            <span>Start Quiz</span>
            <span className={styles.btnArrow}>→</span>
          </button>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>⚡</span>
              <span>2 minutes</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🎁</span>
              <span>10% discount</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💎</span>
              <span>Personalized</span>
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

            {/* Step 0: Name */}
            {step === 0 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>01</span>
                  <h3 className={styles.stepTitle}>Welcome!</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Let's start with your name</p>
                
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="E.g. John"
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
                  <span>Continue</span>
                  <span className={styles.btnNextArrow}>→</span>
                </button>
              </div>
            )}

            {/* Step 1: Who is the watch for */}
            {step === 1 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>02</span>
                  <h3 className={styles.stepTitle}>Hello {answers.name}! 👋</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Who is this watch for?</p>
                
                <div className={styles.options}>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'loved-one' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'loved-one')}
                  >
                    <span className={styles.optionIcon}>❤️</span>
                    <span className={styles.optionText}>Loved One</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'myself' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'myself')}
                  >
                    <span className={styles.optionIcon}>😊</span>
                    <span className={styles.optionText}>Myself</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'friend' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'friend')}
                  >
                    <span className={styles.optionIcon}>🤝</span>
                    <span className={styles.optionText}>Friend</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.recipient === 'parent' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('recipient', 'parent')}
                  >
                    <span className={styles.optionIcon}>👨‍👩‍👦</span>
                    <span className={styles.optionText}>Parent</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Style */}
            {step === 2 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>03</span>
                  <h3 className={styles.stepTitle}>Great! 🎨</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Which style do you prefer most?</p>
                
                <div className={styles.options}>
                  <button 
                    className={`${styles.optionBtn} ${styles.large} ${answers.style === 'minimalist' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('style', 'minimalist')}
                  >
                    <span className={styles.optionIcon}>⚪</span>
                    <span className={styles.optionText}>Minimalist</span>
                    <span className={styles.optionDesc}>Clean and elegant design</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${styles.large} ${answers.style === 'unique' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('style', 'unique')}
                  >
                    <span className={styles.optionIcon}>✨</span>
                    <span className={styles.optionText}>Unique & Bold</span>
                    <span className={styles.optionDesc}>Statement piece</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${styles.large} ${answers.style === 'anything' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('style', 'anything')}
                  >
                    <span className={styles.optionIcon}>🎨</span>
                    <span className={styles.optionText}>Anything Goes</span>
                    <span className={styles.optionDesc}>Open to all styles</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Purchase frequency */}
            {step === 3 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>04</span>
                  <h3 className={styles.stepTitle}>Excellent! ⭐</h3>
                </div>
                
                <p className={styles.stepSubtitle}>How often do you buy watches?</p>
                
                <div className={styles.options}>
                  <button 
                    className={`${styles.optionBtn} ${answers.frequency === 'rarely' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('frequency', 'rarely')}
                  >
                    <span className={styles.optionIcon}>🌙</span>
                    <span className={styles.optionText}>Rarely</span>
                    <span className={styles.optionDesc}>Special occasions</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.frequency === 'sometimes' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('frequency', 'sometimes')}
                  >
                    <span className={styles.optionIcon}>☀️</span>
                    <span className={styles.optionText}>Sometimes</span>
                    <span className={styles.optionDesc}>Few times a year</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                  <button 
                    className={`${styles.optionBtn} ${answers.frequency === 'often' ? styles.selected : ''}`}
                    onClick={() => handleAnswer('frequency', 'often')}
                  >
                    <span className={styles.optionIcon}>⭐</span>
                    <span className={styles.optionText}>Often</span>
                    <span className={styles.optionDesc}>Love new collections</span>
                    <span className={styles.optionCheck}>✓</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Email for discount */}
            {step === 4 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>05</span>
                  <h3 className={styles.stepTitle}>We have a result! 🎉</h3>
                </div>
                
                <p className={styles.stepSubtitle}>Would you like 10% off your purchase?</p>
                <p className={styles.stepDescription}>
                  Enter your email and get an exclusive code
                </p>
                
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="your.email@example.com"
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
                    <span>Send</span>
                    <span className={styles.btnNextArrow}>→</span>
                  </button>
                  <button className={styles.btnSkip} onClick={skipEmail}>
                    No thanks, continue
                  </button>
                </div>

                <p className={styles.privacyText}>
                  🔒 Your data is safe and will not be shared
                </p>
              </div>
            )}

            {/* Step 5: Result */}
            {step === 5 && (
              <div className={`${styles.step} ${styles[direction]}`}>
                <div className={styles.resultHeader}>
                  <div className={styles.resultBadge}>
                    <span className={styles.resultBadgeIcon}>🎯</span>
                    <span>Your Recommendation</span>
                  </div>
                  <h3 className={styles.resultTitle}>Perfect Match!</h3>
                  <p className={styles.resultSubtitle}>
                    Based on your answers, this is the ideal watch for you
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
                      <span className={styles.resultFeature}>✓ Premium quality</span>
                      <span className={styles.resultFeature}>✓ 5 year warranty</span>
                      <span className={styles.resultFeature}>✓ Free shipping</span>
                    </div>
                  </div>
                </div>

                {answers.email && (
                  <div className={styles.discountBox}>
                    <span className={styles.discountIcon}>🎁</span>
                    <div className={styles.discountText}>
                      <strong>Check your email!</strong>
                      <p>We sent you a code with 10% discount</p>
                    </div>
                  </div>
                )}

                <div className={styles.resultActions}>
                  <a href="#collection" className={styles.btnResult} onClick={closeModal}>
                    <span>View Collection</span>
                    <span className={styles.btnResultArrow}>→</span>
                  </a>
                  <button className={styles.btnShare}>
                    <span>📤</span>
                    <span>Share</span>
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
              {step < 5 ? `Question ${step + 1} of 5` : 'Complete!'}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}