'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const infoRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (infoRef.current) observer.observe(infoRef.current)
    if (formRef.current) observer.observe(formRef.current)

    return () => {
      if (infoRef.current) observer.unobserve(infoRef.current)
      if (formRef.current) observer.unobserve(formRef.current)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ovde kasnije dodaj backend logiku
    alert('Hvala! Vaša poruka je uspešno poslata.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo} ref={infoRef}>
            <h2 className={styles.sectionTitle}>Kontaktirajte Nas</h2>
            <p className={styles.contactText}>
              Imate pitanja? Tu smo da vam pomognemo da pronađete savršen sat.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email:</span>
                <span className={styles.contactValue}>info@chronos.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Telefon:</span>
                <span className={styles.contactValue}>+381 XX XXX XXXX</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Radno vreme:</span>
                <span className={styles.contactValue}>Pon-Pet: 9:00 - 18:00</span>
              </div>
            </div>
          </div>
          <div className={styles.contactForm} ref={formRef}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Vaše Ime"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Vaš Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <textarea
                placeholder="Vaša Poruka"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
              <button type="submit" className={styles.btnPrimary}>Pošaljite Poruku</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}