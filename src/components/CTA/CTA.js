'use client'

import { useEffect, useRef } from 'react'
import styles from './CTA.module.css'

export default function CTA() {
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

  return (
    <section className={styles.cta}>
      <div className={styles.ctaContent} ref={contentRef}>
        <h2 className={styles.ctaTitle}>Vreme je za savršen sat</h2>
        <p className={styles.ctaSubtitle}>Unesite eleganciju u svaki trenutak vašeg dana</p>
        <a href="#collection" className={styles.btnPrimary}>Poručite Odmah</a>
      </div>
    </section>
  )
}