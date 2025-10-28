'use client'

import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>CHRONOS</h3>
            <p>Gde vreme postaje umetnost</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>Linkovi</h4>
            <ul>
              <li><a href="#home">Početna</a></li>
              <li><a href="#collection">Kolekcija</a></li>
              <li><a href="#features">Karakteristike</a></li>
              <li><a href="#contact">Kontakt</a></li>
            </ul>
          </div>
          <div className={styles.footerLegal}>
            <h4>Informacije</h4>
            <ul>
              <li><a href="#">Uslovi korišćenja</a></li>
              <li><a href="#">Politika privatnosti</a></li>
              <li><a href="#">Povraćaj</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 CHRONOS. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  )
}
