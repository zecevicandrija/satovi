'use client'

import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="navbar">
        <div className={styles.navContainer}>
          <div className={styles.navLogo}>CHRONOS</div>
          <ul className={styles.navMenu}>
            <li><a href="#home">Početna</a></li>
            <li><a href="#collection">Kolekcija</a></li>
            <li><a href="#features">Karakteristike</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
          <div className={styles.navCta}>
            <a href="#collection" className={styles.btnSecondary}>Poručite Sada</a>
          </div>
          <div 
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`} 
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div 
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.active : ''}`}
        onClick={(e) => e.target === e.currentTarget && closeMobileMenu()}
      >
        <div className={styles.mobileMenuContent}>
          <ul className={styles.mobileMenuList}>
            <li><a href="#home" onClick={closeMobileMenu}>Početna</a></li>
            <li><a href="#collection" onClick={closeMobileMenu}>Kolekcija</a></li>
            <li><a href="#features" onClick={closeMobileMenu}>Karakteristike</a></li>
            <li><a href="#contact" onClick={closeMobileMenu}>Kontakt</a></li>
          </ul>
          <a href="#collection" className={styles.mobileMenuCta} onClick={closeMobileMenu}>
            Poručite Sada
          </a>
        </div>
      </div>
    </>
  )
}
