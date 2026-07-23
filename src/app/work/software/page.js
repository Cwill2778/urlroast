'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SoftwareSilo() {
  return (
    <main style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <section style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255, 183, 3, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid var(--primary-glow)' }}
        >
          For Technical Recruiters & Engineering Managers
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
        >
          Engineering <span className="gradient-text">Scalable Systems</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '4rem' }}
        >
          A deep dive into my architectural decisions, tech stack proficiency, and experience managing complex, multi-file codebases using React, Next.js, and Python.
        </motion.p>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          
          {/* React Hearts UI */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>React Hearts UI</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', marginBottom: '1.5rem' }}>
              A high-performance, component-driven user interface built natively in React. Emphasizes clean state management, reusable hooks, and flawless framerate animations using Framer Motion.
            </p>
            <ul style={{ color: '#d4d4d8', marginBottom: '2rem', fontFamily: 'var(--font-space)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Strict TypeScript architectures.</li>
              <li>Custom hooks for complex game-state logic.</li>
              <li>Responsive, mobile-first CSS architecture.</li>
            </ul>
          </motion.div>

          {/* PropFolio Local */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>PropFolio Local (Python/SQLite3)</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', marginBottom: '1.5rem' }}>
              A robust backend architecture built for local real estate portfolio management. Utilizes Python for rapid data processing and SQLite3 for lightweight, embedded relational data storage.
            </p>
            <ul style={{ color: '#d4d4d8', marginBottom: '2rem', fontFamily: 'var(--font-space)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Normalized database schema design.</li>
              <li>Secure data encryption and local caching.</li>
              <li>Experience managing AI-assisted multi-file codebases with Kiro and Cline.</li>
            </ul>
          </motion.div>

          {/* AI Landing Page Roaster */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)', border: '1px solid var(--primary-glow)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>AI Landing Page Roaster</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', marginBottom: '1.5rem' }}>
              A live production Next.js application that integrates directly with Google's Gemini 2.0 Flash API to audit and rewrite user landing pages.
            </p>
            <Link href="/roaster" className="btn-secondary" style={{ display: 'inline-block' }}>View Live App</Link>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '5rem', textAlign: 'center' }}
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Examine the Codebase
          </a>
        </motion.div>

      </section>
    </main>
  );
}
