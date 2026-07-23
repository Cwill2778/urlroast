'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem 0 2rem' }}>
      
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

      {/* The Three Pillars (Gateway) */}
      <motion.section 
        style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 6rem auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', perspective: '1000px', y: yParallax }}
      >
        
        {/* Pillar 1: Software & AI */}
        <Link href="/work/software" style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.15)' }}
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
            whileHover={{ rotateX: 5, rotateY: 0, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.15)' }}
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
            whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.15)' }}
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
    </main>
  );
}
