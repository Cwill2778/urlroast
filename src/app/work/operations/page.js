'use client';

import { motion } from 'framer-motion';

export default function OperationsSilo() {
  return (
    <main style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
      <section style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255, 183, 3, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1.5rem', border: '1px solid var(--primary-glow)' }}
        >
          For Contractors & Business Owners
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}
        >
          Streamline Your <span className="gradient-text">Operations</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '4rem' }}
        >
          Practical, bottom-line focused solutions designed to reduce administrative overhead and manage local field logistics effectively.
        </motion.p>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          
          {/* Streamlit Photo-Reporting */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Field Photo-Reporting (Streamlit)</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', marginBottom: '1.5rem' }}>
              A custom application built to rapidly intake, process, and generate professional PDF reports from field photography. Ideal for property inspectors and contractors who need to turn site visits into deliverables instantly.
            </p>
            <ul style={{ color: '#d4d4d8', marginBottom: '0', fontFamily: 'var(--font-space)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Automated image compression and formatting.</li>
              <li>Dynamic PDF generation.</li>
              <li>Cloud storage synchronization.</li>
            </ul>
          </motion.div>

          {/* HR Ledgers */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Automated HR & Payroll Ledgers</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', marginBottom: '1.5rem' }}>
              Eliminate manual data entry errors. Custom scripts and spreadsheet integrations that automatically calculate hours, taxes, and generate pay stubs based on raw time-clock data.
            </p>
            <ul style={{ color: '#d4d4d8', marginBottom: '0', fontFamily: 'var(--font-space)', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Direct integration with QuickBooks and Stripe.</li>
              <li>Automated compliance flagging.</li>
              <li>Time-saving batch processing.</li>
            </ul>
          </motion.div>

          {/* Property Maintenance Frameworks */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '3rem', background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,1) 100%)' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Tiered Maintenance Frameworks</h2>
            <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Structured, scalable SOPs (Standard Operating Procedures) for managing property portfolios. From tenant communication routing to automated vendor dispatching, I build the systems that let you scale your real estate footprint without scaling your headcount.
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
            Streamline Your Operations
          </a>
        </motion.div>

      </section>
    </main>
  );
}
