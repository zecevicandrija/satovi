'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './CTA.module.css'

export default function CTA() {
  const [isMounted, setIsMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 30
  })

  // Mount check
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.cta}>
      {/* Animated Background */}
      <div className={styles.bgAnimations}>
        {/* Floating Particles - Fixed positions to avoid hydration mismatch */}
        {isMounted && (
          <>
            <div className={styles.particle} style={{ left: '10%', animationDelay: '0s', animationDuration: '20s' }}></div>
            <div className={styles.particle} style={{ left: '20%', animationDelay: '1s', animationDuration: '18s' }}></div>
            <div className={styles.particle} style={{ left: '30%', animationDelay: '2s', animationDuration: '22s' }}></div>
            <div className={styles.particle} style={{ left: '40%', animationDelay: '0.5s', animationDuration: '19s' }}></div>
            <div className={styles.particle} style={{ left: '50%', animationDelay: '1.5s', animationDuration: '21s' }}></div>
            <div className={styles.particle} style={{ left: '60%', animationDelay: '2.5s', animationDuration: '17s' }}></div>
            <div className={styles.particle} style={{ left: '70%', animationDelay: '3s', animationDuration: '23s' }}></div>
            <div className={styles.particle} style={{ left: '80%', animationDelay: '0.8s', animationDuration: '16s' }}></div>
            <div className={styles.particle} style={{ left: '90%', animationDelay: '1.8s', animationDuration: '24s' }}></div>
            <div className={styles.particle} style={{ left: '15%', animationDelay: '2.8s', animationDuration: '20s' }}></div>
            <div className={styles.particle} style={{ left: '25%', animationDelay: '3.5s', animationDuration: '19s' }}></div>
            <div className={styles.particle} style={{ left: '45%', animationDelay: '4s', animationDuration: '21s' }}></div>
            <div className={styles.particle} style={{ left: '65%', animationDelay: '4.5s', animationDuration: '18s' }}></div>
            <div className={styles.particle} style={{ left: '75%', animationDelay: '1.2s', animationDuration: '22s' }}></div>
            <div className={styles.particle} style={{ left: '85%', animationDelay: '2.2s', animationDuration: '17s' }}></div>
          </>
        )}
        
        {/* Glow Orbs */}
        <div className={styles.glowOrb1}></div>
        <div className={styles.glowOrb2}></div>
        <div className={styles.glowOrb3}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.ctaContent}>
          {/* Premium Badge */}
          <div className={styles.premiumBadge}>
            <span className={styles.badgeIcon}>⭐</span>
            <span>Exclusive Offer</span>
            <span className={styles.badgeIcon}>⭐</span>
          </div>

          {/* Main Title */}
          <h2 className={styles.ctaTitle}>
            Don't Wait,
            <span className={styles.titleGold}> The Time Is Now</span>
          </h2>
          
          <p className={styles.ctaSubtitle}>
            Get the perfect watch that will accompany you for decades. 
            Limited offer with free shipping and extended warranty.
          </p>

          {/* Countdown Timer */}
          <div className={styles.urgencyBox}>
            <div className={styles.urgencyLabel}>
              🔥 Offer expires in:
            </div>
            <div className={styles.countdown}>
              <div className={styles.timeBox}>
                <span className={styles.timeNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Hours</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeBox}>
                <span className={styles.timeNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Minutes</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeBox}>
                <span className={styles.timeNumber}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Seconds</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <a href="#collection" className={styles.btnPrimary}>
              <span className={styles.btnIcon}>🛒</span>
              <span className={styles.btnText}>Order Now</span>
              <span className={styles.btnArrow}>→</span>
              <span className={styles.btnShine}></span>
            </a>
            <a href="#features" className={styles.btnSecondary}>
              <span className={styles.btnIcon}>💬</span>
              <span>Contact Us</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div className={styles.trustText}>
                <strong>100% Secure Purchase</strong>
                <span>SSL Encryption</span>
              </div>
            </div>
            
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <path d="M16 8h5l3 3v5h-2"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div className={styles.trustText}>
                <strong>Free Shipping</strong>
                <span>2-3 Business Days</span>
              </div>
            </div>
            
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className={styles.trustText}>
                <strong>30 Day Returns</strong>
                <span>No Questions Asked</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className={styles.socialProof}>
            <div className={styles.proofAvatars}>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatarMore}>+500</div>
            </div>
            <div className={styles.proofText}>
              <strong>2,500+ satisfied customers</strong> this week
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
                <span className={styles.rating}>4.9/5.0</span>
              </div>
            </div>
          </div>

          {/* Bonus Offer */}
          <div className={styles.bonusOffer}>
            <span className={styles.bonusIcon}>🎁</span>
            <span className={styles.bonusText}>
              <strong>BONUS:</strong> Premium box and 2 years extended warranty for first customers!
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}