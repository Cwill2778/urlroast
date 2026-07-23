'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <main style={{ minHeight: '100vh', padding: '0 0 4rem 0', background: '#0a0a0c', display: 'flex', alignItems: 'center' }}>
      
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '6rem 2rem', 
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6rem',
        alignItems: 'flex-start'
      }}>
        
        {/* SECTION 1: The Pitch (Left Side) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1 1 400px' }}
        >
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: '800', 
            lineHeight: '1.1', 
            marginBottom: '2rem', 
            letterSpacing: '-0.02em', 
            color: '#ffffff' 
          }}>
            Let's Architect <span style={{ color: '#d4af37' }}>Your Next Solution.</span>
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: '#d4d4d8', lineHeight: '1.8', marginBottom: '2rem', fontFamily: 'var(--font-space)' }}>
            Whether you are looking to recruit specialized AI engineering talent, streamline your local business operations, or delegate high-level administrative tasks, Cronan Technology is ready to execute.
          </p>

          <p style={{ fontSize: '1rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '3rem', fontStyle: 'italic' }}>
            Fill out the secure form, or reach out directly via my professional channels.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }} className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }} className="contact-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn
            </a>
            <a href="mailto:ops@cronantechnology.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', textDecoration: 'none', fontSize: '1.1rem', transition: 'color 0.2s' }} className="contact-link">
              <Mail size={24} color="#d4af37" className="contact-icon" /> Email Directly: ops@cronantechnology.com
            </a>
          </div>
        </motion.div>

        {/* SECTION 2: The Premium Intake Form (Right Side) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ flex: '1 1 500px', background: '#111', padding: '3rem', borderRadius: '8px', border: '1px solid #222', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => e.preventDefault()}>
            
            {/* Field 1: Name / Company */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ color: '#71717a', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name / Company</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1.1rem', 
                  padding: '0.5rem 0',
                  outline: 'none',
                  fontFamily: 'var(--font-space)'
                }} 
              />
            </div>

            {/* Field 2: Professional Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ color: '#71717a', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Professional Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  borderBottom: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1.1rem', 
                  padding: '0.5rem 0',
                  outline: 'none',
                  fontFamily: 'var(--font-space)'
                }} 
              />
            </div>

            {/* Field 3: Area of Interest */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="interest" style={{ color: '#71717a', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Area of Interest</label>
              <select 
                id="interest" 
                name="interest"
                style={{ 
                  background: '#1a1a1a', 
                  border: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  padding: '1rem',
                  outline: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-space)',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select an area...</option>
                <option value="recruitment">Software & AI Recruitment</option>
                <option value="software">Custom Operational Software</option>
                <option value="support">Remote Assistance & Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Field 4: Estimated Budget / Salary Range */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="budget" style={{ color: '#71717a', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated Budget / Salary Range</label>
              <select 
                id="budget" 
                name="budget"
                style={{ 
                  background: '#1a1a1a', 
                  border: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  padding: '1rem',
                  outline: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-space)',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select a range...</option>
                <option value="tier1">$1,000 - $5,000</option>
                <option value="tier2">$5,000 - $10,000</option>
                <option value="tier3">$10,000+</option>
                <option value="fulltime">Full-Time Role Discussion</option>
              </select>
            </div>

            {/* Field 5: Project Scope / Inquiry Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="scope" style={{ color: '#71717a', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Scope / Inquiry Details</label>
              <textarea 
                id="scope" 
                name="scope"
                rows="4"
                style={{ 
                  background: 'transparent', 
                  border: '1px solid #333', 
                  color: '#fff', 
                  fontSize: '1rem', 
                  padding: '1rem',
                  outline: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-space)',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="btn-primary"
              style={{
                background: '#d4af37',
                color: '#000',
                border: 'none',
                padding: '1.2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1rem',
                borderRadius: '4px'
              }}
            >
              Initialize Sequence
            </button>
            
          </form>
        </motion.div>

      </section>

      <style jsx global>{`
        .contact-link:hover {
          color: #d4af37 !important;
        }
        .contact-link:hover .contact-icon {
          color: #d4af37 !important;
          stroke: #d4af37 !important;
        }
        input:focus {
          border-bottom-color: #d4af37 !important;
        }
        textarea:focus, select:focus {
          border-color: #d4af37 !important;
        }
      `}</style>
    </main>
  );
}
