'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Kviz.module.css'

export default function Kviz() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({
    name: '',
    recipient: '',
    style: '',
    frequency: '',
    email: ''
  })
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current)
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
    setAnswers({
      name: '',
      recipient: '',
      style: '',
      frequency: '',
      email: ''
    })
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleAnswer = (field, value) => {
    setAnswers({ ...answers, [field]: value })
    setTimeout(() => {
      handleNext()
    }, 300)
  }

  const skipEmail = () => {
    setStep(5)
  }

  const submitEmail = () => {
    if (answers.email) {
      // Ovde bi poslali email na backend
      console.log('Email submitted:', answers.email)
      setStep(5)
    }
  }

  return (
    <section className={styles.kvizSection}>
      <div className={styles.container}>
        <div className={styles.kvizContent} ref={contentRef}>
          <h2 className={styles.kvizTitle}>Još uvek niste našli šta Vam odgovara?</h2>
          <p className={styles.kvizSubtitle}>Tu smo da pomognemo.</p>
          <button className={styles.btnStart} onClick={openModal}>
            Započni Kviz
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>×</button>
            
            {/* Step 0: Ime */}
            {step === 0 && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>Dobrodošli!</h3>
                <p className={styles.stepSubtitle}>Kako se zovete?</p>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Unesite Vaše ime"
                  value={answers.name}
                  onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && answers.name && handleNext()}
                />
                <button 
                  className={styles.btnNext} 
                  onClick={handleNext}
                  disabled={!answers.name}
                >
                  Nastavi
                </button>
              </div>
            )}

            {/* Step 1: Za koga je sat */}
            {step === 1 && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>Zdravo {answers.name}!</h3>
                <p className={styles.stepSubtitle}>Za koga je ovaj sat?</p>
                <div className={styles.options}>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('recipient', 'loved-one')}
                  >
                    <span className={styles.optionIcon}>❤️</span>
                    Voljenu Osobu
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('recipient', 'myself')}
                  >
                    <span className={styles.optionIcon}>😊</span>
                    Sebe
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('recipient', 'friend')}
                  >
                    <span className={styles.optionIcon}>🤝</span>
                    Prijatelja
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('recipient', 'parent')}
                  >
                    <span className={styles.optionIcon}>👨‍👩‍👦</span>
                    Roditelja
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Stil */}
            {step === 2 && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>Odlično!</h3>
                <p className={styles.stepSubtitle}>Kako biste opisali Vaš stil?</p>
                <div className={styles.options}>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('style', 'minimalist')}
                  >
                    <span className={styles.optionIcon}>⚪</span>
                    Minimalističan
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('style', 'unique')}
                  >
                    <span className={styles.optionIcon}>✨</span>
                    Jedinstveno & Moćno
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('style', 'anything')}
                  >
                    <span className={styles.optionIcon}>🎨</span>
                    Sve Može
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Učestalost kupovine */}
            {step === 3 && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>Sjajno!</h3>
                <p className={styles.stepSubtitle}>Koliko često kupujete novi nakit/satove?</p>
                <div className={styles.options}>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('frequency', 'rarely')}
                  >
                    <span className={styles.optionIcon}>🌙</span>
                    Retko
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('frequency', 'sometimes')}
                  >
                    <span className={styles.optionIcon}>☀️</span>
                    Povremeno
                  </button>
                  <button 
                    className={styles.optionBtn}
                    onClick={() => handleAnswer('frequency', 'often')}
                  >
                    <span className={styles.optionIcon}>⭐</span>
                    Često
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Email za popust */}
            {step === 4 && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>Imamo rezultat!</h3>
                <p className={styles.stepSubtitle}>Želite li dobiti 10% popusta na Vašu kupovinu?</p>
                <p className={styles.stepDescription}>Prijavite se ovde da biste dobili kod.</p>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="Unesite Vaš email"
                  value={answers.email}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && answers.email && submitEmail()}
                />
                <div className={styles.buttonGroup}>
                  <button className={styles.btnNext} onClick={submitEmail} disabled={!answers.email}>
                    Pošalji
                  </button>
                  <button className={styles.btnSkip} onClick={skipEmail}>
                    Ne hvala
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Rezultat */}
            {step === 5 && (
              <div className={styles.step}>
                <h3 className={styles.stepTitle}>Savršeno!</h3>
                <p className={styles.stepSubtitle}>Našli smo idealan sat za Vas</p>
                <div className={styles.resultImage}>
                  <img src="/Assets/sat1.jpg" alt="Preporučeni sat" />
                </div>
                {answers.email && (
                  <p className={styles.discountMessage}>✅ Proverite Vaš email za kod sa popustom!</p>
                )}
                <a href="/#collection" className={styles.btnResult} onClick={closeModal}>
                  Pogledajte Kolekciju
                </a>
              </div>
            )}

            {/* Progress bar */}
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}