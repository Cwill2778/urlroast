'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem 0 2rem' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto 6rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255, 183, 3, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid var(--primary-glow)' }}
        >
          Next-Generation Digital Agency
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
        >
          We Build <span className="gradient-text">Digital Experiences</span> That Convert.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '600px' }}
        >
          Cronan Technology specializes in high-performance web applications, AI automation, and conversion rate optimization for modern businesses.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
        >
          <a href="mailto:info@cronantech.com" className="btn-primary" style={{ textDecoration: 'none' }}>
            Work With Us
          </a>
          <Link href="#services" className="btn-secondary">
            View Services
          </Link>
        </motion.div>
      </section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 6rem auto', y: yParallax }}
      >
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}
        >
          Our Expertise
        </motion.h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            transition={{ duration: 0.4 }}
            className="glass-panel"
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💻</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Custom Web Development</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Lightning-fast, highly scalable web applications built with modern frameworks like Next.js and React. We turn complex requirements into seamless user experiences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel"
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI Integrations</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Automate your workflows and supercharge your products with custom AI solutions using the latest LLMs from Google, OpenAI, and Anthropic.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-panel"
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Conversion Rate Optimization</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              We don't just build beautiful sites; we build sites that sell. Data-driven design tweaks that maximize your ROI and customer acquisition.
            </p>
          </motion.div>

        </div>
      </motion.section>

      {/* Featured Tools / Products Section */}
      <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto 6rem auto' }}>
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}
        >
          Our Products
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ rotateX: 2, rotateY: 2, scale: 1.02, boxShadow: '0 30px 60px rgba(255, 183, 3, 0.1)' }}
          transition={{ duration: 0.5 }}
          className="glass-panel" 
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '4rem 2rem', border: '1px solid var(--primary-glow)', background: 'linear-gradient(180deg, rgba(255,183,3,0.05) 0%, rgba(18,18,18,0.8) 100%)', transformStyle: 'preserve-3d' }}
        >
          <motion.div style={{ fontSize: '3rem', marginBottom: '1rem', transform: 'translateZ(30px)' }}>🔥</motion.div>
          <motion.h3 style={{ fontSize: '2rem', marginBottom: '1rem', transform: 'translateZ(20px)' }}>AI Landing Page Roaster</motion.h3>
          <motion.p style={{ fontSize: '1.1rem', color: '#a1a1aa', maxWidth: '600px', marginBottom: '2rem', lineHeight: '1.6', fontFamily: 'var(--font-space)', transform: 'translateZ(10px)' }}>
            Want to know why your landing page isn't converting? Our custom AI tool will brutally roast your website and rewrite your copy for maximum conversions. 
          </motion.p>
          <Link href="/roaster" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', transform: 'translateZ(30px)' }}>
            Try The Roaster <span>→</span>
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
