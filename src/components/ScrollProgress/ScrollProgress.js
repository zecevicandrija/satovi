'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Use requestAnimationFrame for smooth 60fps updates
      rafRef.current = requestAnimationFrame(() => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = (window.pageYOffset / windowHeight) * 100
        setScrollProgress(scrolled)
      })
    }

    // Call immediately to set initial value
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div 
      className={styles.scrollProgress} 
      style={{ 
        transform: `scaleX(${scrollProgress / 100})`,
        transformOrigin: 'left'
      }}
    />
  )
}