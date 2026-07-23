'use client';

import { motion } from 'framer-motion';

export default function SupportSilo() {
  return (
    <main style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <section style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255, 183, 3, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid var(--primary-glow)' }}
        >
          For Business Owners & High-Volume Teams
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
        >
          Exceptional <span className="gradient-text">Client Handling</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '4rem' }}
        >
          Trust-focused remote business assistance built on flawless communication, administrative reliability, and proactive problem solving.
        </motion.p>

        {/* Features Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>White-Glove Customer Support</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Provide your clients with immediate, articulate, and empathetic support. Whether through email, live chat, or phone systems, I act as a seamless extension of your brand, turning frustrated users into loyal advocates.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Executive Remote Assistance</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Reclaim your calendar. I handle inbox zero, meeting coordination, document formatting, and vendor follow-ups. You focus on the high-leverage tasks; I handle the noise.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>CRM & Data Management</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Keep your pipeline pristine. I ensure that your CRM (Salesforce, HubSpot, etc.) is meticulously updated, leads are categorized, and follow-up tasks are scheduled so no opportunity falls through the cracks.
            </p>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '5rem', textAlign: 'center' }}
        >
          <a href="mailto:info@cronantech.com" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Hire a Dedicated Assistant
          </a>
        </motion.div>

      </section>
    </main>
  );
}
