'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem 0 2rem' }}>
      {/* Top Announcement Banner */}
      <Link href="https://romanexchange.cronantech.com" style={{ textDecoration: 'none', width: '100%', maxWidth: '1200px', margin: '0 auto 2rem auto', display: 'block' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01, boxShadow: '0 10px 30px rgba(255, 183, 3, 0.1)' }}
          style={{
            background: 'linear-gradient(90deg, rgba(255, 183, 3, 0.1) 0%, rgba(255, 183, 3, 0.02) 100%)',
            border: '1px solid rgba(255, 183, 3, 0.2)',
            borderLeft: '4px solid var(--primary)',
            borderRadius: '8px',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
            Live Community Build
          </div>
          <p style={{ color: '#d4d4d8', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
            Currently accepting feature suggestions, likes, and dislikes of community platforms during our live community build of <strong>The Roman Exchange</strong>, a 100% free community connecting platform. No advertisements, ever. No paywalls, ever. My promise to you. Because unlike the others, this will be built by a Roman, for Romans.
          </p>
        </motion.div>
      </Link>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto 4rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
        >
          Select Your <span className="gradient-text">Journey</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', maxWidth: '600px' }}
        >
          Please select the portal that best aligns with your objectives.
        </motion.p>
      </section>

      {/* Content Layout */}
      <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', flexWrap: 'wrap', gap: '3rem', margin: '0 auto 6rem auto' }}>
        
        {/* Main Content (The Three Pillars) */}
        <motion.section 
          style={{ flex: '1 1 65%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', perspective: '1000px', y: yParallax }}
        >
          
          {/* Pillar 1: Software & AI */}
          <Link href="/work/software" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={isMobile ? {} : { rotateX: 5, rotateY: -5, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.15)' }}
              style={{ 
                background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)', 
                border: '1px solid var(--border)', 
                borderRadius: '16px', 
                padding: '3rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                height: '100%',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)' }} />
              <motion.div style={{ fontSize: '3rem', marginBottom: '1.5rem', transform: 'translateZ(30px)' }}>⚙️</motion.div>
              <motion.h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', transform: 'translateZ(20px)' }}>Software & AI</motion.h2>
              <motion.p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', transform: 'translateZ(10px)' }}>
                Scalable applications and machine learning integrations for modern enterprises.
              </motion.p>
            </motion.div>
          </Link>

          {/* Pillar 2: Business Operations */}
          <Link href="/work/operations" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={isMobile ? {} : { rotateX: 5, rotateY: 0, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.15)' }}
              style={{ 
                background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)', 
                border: '1px solid var(--border)', 
                borderRadius: '16px', 
                padding: '3rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                height: '100%',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#d4d4d8' }} />
              <motion.div style={{ fontSize: '3rem', marginBottom: '1.5rem', transform: 'translateZ(30px)' }}>🏢</motion.div>
              <motion.h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', transform: 'translateZ(20px)' }}>Business Operations</motion.h2>
              <motion.p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', transform: 'translateZ(10px)' }}>
                Custom administrative tools, HR ledgers, and automated workflow solutions.
              </motion.p>
            </motion.div>
          </Link>

          {/* Pillar 3: Customer Relations */}
          <Link href="/work/support" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={isMobile ? {} : { rotateX: 5, rotateY: 5, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.15)' }}
              style={{ 
                background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)', 
                border: '1px solid var(--border)', 
                borderRadius: '16px', 
                padding: '3rem 2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                height: '100%',
                transformStyle: 'preserve-3d',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#a1a1aa' }} />
              <motion.div style={{ fontSize: '3rem', marginBottom: '1.5rem', transform: 'translateZ(30px)' }}>🤝</motion.div>
              <motion.h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', transform: 'translateZ(20px)' }}>Customer Relations</motion.h2>
              <motion.p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', transform: 'translateZ(10px)' }}>
                Remote business assistance, dedicated client handling, and reliable support.
              </motion.p>
            </motion.div>
          </Link>

        </motion.section>

        {/* Announcements Side Column */}
        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ 
            flex: '1 1 30%', 
            minWidth: '300px',
            background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#444' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', borderBottom: '1px solid #333', paddingBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
            Announcements
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Announcement 0: The Roman Exchange */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid var(--primary)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-space)', letterSpacing: '0.1em' }}>LIVE NOW</div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>The Roman Exchange</h3>
              <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.6' }}>
                Currently accepting feature suggestions, likes, and dislikes of community platforms during our live community build of <strong>The Roman Exchange</strong>, a 100% free community connecting platform. No advertisements, ever. No paywalls, ever. My promise to you. Because unlike the others, this will be built by a Roman, for Romans.
              </p>
            </div>

            {/* Announcement 1 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid #555' }}>
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', fontFamily: 'var(--font-space)', letterSpacing: '0.1em' }}>AUGUST 2026</div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>Cronan OS Audio Daemon</h3>
              <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.6' }}>
                The embedded terminal now features global audio playback controls. Open the terminal and type <code>audio play</code> or <code>audio volume 50</code> to try it out.
              </p>
            </div>

            {/* Announcement 2 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid #555' }}>
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', fontFamily: 'var(--font-space)', letterSpacing: '0.1em' }}>JULY 2026</div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>Nailed It Property Solutions</h3>
              <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.6' }}>
                A brand new case study has been deployed to the Software & AI silo showcasing an SEO-optimized full stack deployment.
              </p>
            </div>


            {/* Announcement 3 */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid #555' }}>
              <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.5rem', fontFamily: 'var(--font-space)', letterSpacing: '0.1em' }}>SUMMER 2026</div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>Now Accepting Clients</h3>
              <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.6' }}>
                Cronan Technology is currently taking on new projects for Q3. Navigate to the Contact portal to initiate communication.
              </p>
            </div>
            
            {/* Announcement 4 (Donation) */}
            <div style={{ background: 'rgba(255,183,3,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '2px solid var(--primary)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-space)', letterSpacing: '0.1em' }}>SUPPORT THE DEV</div>
              <h3 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>Keep Roman Exchange Free</h3>
              <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '1rem' }}>
                If you love using The Roman Exchange and want to support its continued development by a solo Software Engineering student, consider buying me a coffee!
              </p>
              <a 
                href="https://pay.cronantech.com/b/bJeeVeg1udUCgBQaTA2Ry03" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-block',
                  background: 'var(--primary)', 
                  color: '#000', 
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none', 
                  fontWeight: 'bold',
                  fontSize: '0.85rem'
                }}
              >
                ☕ Donate via Stripe
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </main>
  );
}
