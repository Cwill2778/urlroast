'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Inbox, CheckCircle2, LayoutDashboard, Database, Shield, Zap, Terminal } from 'lucide-react';

export default function SupportSilo() {
  return (
    <main style={{ minHeight: '100vh', padding: '0 0 4rem 0', background: '#050505' }}>
      
      {/* SECTION 1: The Support Hero */}
      <section style={{ 
        position: 'relative', 
        padding: '8rem 2rem 6rem 2rem', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Soft fading gold gradient backdrop */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100%',
          background: 'radial-gradient(ellipse at top center, rgba(212, 175, 55, 0.08) 0%, rgba(5,5,5,1) 60%)',
          zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-block', 
              color: '#d4af37', // Warm Gold
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            Delegate With Confidence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '400', lineHeight: '1.2', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff', fontFamily: 'var(--font-oswald)' }}
          >
            Technical Assistance & Client Relations
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#d4d4d8', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '750px', margin: '0 auto 3rem auto' }}
          >
            I provide founders and agencies with high-level administrative bandwidth. From managing sensitive HR ledgers to executing polished customer relations, I handle the operational details so you can focus on scaling your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="mailto:info@cronantech.com" className="btn-primary" style={{ display: 'inline-block', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold' }}>
              Discuss Your Support Needs
            </a>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* SECTION 2: Core Focus 01 - Frontline Customer Relations */}
        <section style={{ margin: '6rem 0', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span className="badge">[ Client Communication ]</span>
              <span className="badge">[ CRM Management ]</span>
              <span className="badge">[ Tech Troubleshooting ]</span>
            </div>
            
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Focus</h2>
            <p style={{ fontSize: '1.4rem', color: '#fff', lineHeight: '1.5', marginBottom: '2rem' }}>
              Your clients' experience dictates your brand's reputation. I act as a polished, professional extension of your company.
            </p>

            <h3 style={{ fontSize: '1.1rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Execution</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Inbox size={20} color="#d4af37" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', margin: 0 }}>
                  Providing prompt, articulate, and empathetic customer support via email, ticketing systems, or live chat.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Zap size={20} color="#d4af37" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', margin: 0 }}>
                  Troubleshooting basic technical inquiries before they escalate to your core engineering team.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Database size={20} color="#d4af37" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', margin: 0 }}>
                  Managing CRM databases to ensure client histories, project statuses, and communication logs are perfectly maintained.
                </p>
              </li>
            </ul>
          </motion.div>
          
          {/* Right Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ 
              background: 'linear-gradient(145deg, rgba(20,20,22,1) 0%, rgba(10,10,12,1) 100%)', 
              borderRadius: '12px', 
              padding: '1rem', 
              border: '1px solid #222',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Clean CRM Dashboard Mockup */}
              <div style={{ 
                background: '#0a0a0c', 
                borderRadius: '8px', 
                height: '350px', 
                border: '1px solid #1a1a1a',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555' }}>
                    <LayoutDashboard size={20} />
                    <div style={{ width: '100px', height: '6px', background: '#222', borderRadius: '4px' }} />
                  </div>
                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.5rem', 
                    background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', 
                    padding: '0.25rem 0.75rem', borderRadius: '20px', color: '#22c55e', fontSize: '0.8rem', fontWeight: 'bold',
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.2)'
                  }}>
                    <CheckCircle2 size={14} />
                    RESOLVED
                  </div>
                </div>

                {/* Fake Email Threads */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#222' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ width: '40%', height: '8px', background: '#333', borderRadius: '4px' }} />
                        <div style={{ width: '80%', height: '6px', background: '#222', borderRadius: '4px' }} />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: Core Focus 02 - HR & Administrative Ledgers */}
        <section style={{ margin: '8rem 0', display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ 
              background: 'linear-gradient(145deg, rgba(20,20,22,1) 0%, rgba(10,10,12,1) 100%)', 
              borderRadius: '12px', 
              padding: '1rem', 
              border: '1px solid #222',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Abstract Ledger Mockup */}
              <div style={{ 
                background: '#0a0a0c', 
                borderRadius: '8px', 
                height: '350px', 
                border: '1px solid #1a1a1a',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', padding: '1rem', background: '#111', borderBottom: '1px solid #222' }}>
                  <div style={{ flex: 2, height: '6px', background: '#333', borderRadius: '4px', margin: '0 0.5rem' }} />
                  <div style={{ flex: 1, height: '6px', background: '#333', borderRadius: '4px', margin: '0 0.5rem' }} />
                  <div style={{ flex: 1, height: '6px', background: '#333', borderRadius: '4px', margin: '0 0.5rem' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ flex: 2, height: '6px', background: '#222', borderRadius: '4px', margin: '0 0.5rem' }} />
                      <div style={{ flex: 1, height: '6px', background: '#222', borderRadius: '4px', margin: '0 0.5rem' }} />
                      <div style={{ 
                        flex: 1, height: '6px', 
                        background: i === 3 ? 'rgba(212, 175, 55, 0.5)' : '#222', // Subtle amber glow on one row
                        boxShadow: i === 3 ? '0 0 10px rgba(212, 175, 55, 0.3)' : 'none',
                        borderRadius: '4px', margin: '0 0.5rem' 
                      }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span className="badge">[ Data Integrity ]</span>
              <span className="badge">[ Payroll ]</span>
              <span className="badge">[ Operational Trust ]</span>
            </div>
            
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Focus</h2>
            <p style={{ fontSize: '1.4rem', color: '#fff', lineHeight: '1.5', marginBottom: '2rem' }}>
              Back-office administrative drag is the silent killer of agency growth. I bring extreme organization to your internal data.
            </p>

            <h3 style={{ fontSize: '1.1rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Execution</h3>
            
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Database size={20} color="#d4af37" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', margin: 0 }}>
                  Precise management of sensitive HR ledgers and contractor data.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Shield size={20} color="#d4af37" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', margin: 0 }}>
                  Assisting with payroll preparation, invoice processing, and expense tracking to ensure financial operations run without friction.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#d4af37" style={{ flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#a1a1aa', lineHeight: '1.6', fontFamily: 'var(--font-space)', margin: 0 }}>
                  Auditing internal documents and compliance checklists to maintain structural integrity across your organization.
                </p>
              </li>
            </ul>
          </motion.div>
          
        </section>

        {/* SECTION 4: The "Technical" Assistant Advantage */}
        <section style={{ margin: '8rem 0' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ 
              padding: '4rem 3rem', 
              background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,1) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.1)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Beyond Traditional Assistance</h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', fontFamily: 'var(--font-space)' }}>
                Most remote assistants require intense onboarding and struggle with technical concepts. Because my foundation is in software architecture and business operations, I offer a rare hybrid of skills.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              
              <div style={{ textAlign: 'left' }}>
                <Database size={32} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>System Comprehension</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                  I don't just use your software; I understand how it works. I adapt to proprietary CRMs, CMS platforms, and internal databases instantly.
                </p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <Terminal size={32} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>Process Improvement</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                  If I notice a repetitive administrative task slowing us down, I have the engineering capability to script a solution or automate the workflow.
                </p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <Zap size={32} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>Autonomous Execution</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                  You need an assistant who brings solutions, not just questions. I operate with high autonomy and strict attention to detail.
                </p>
              </div>

            </div>
          </motion.div>
        </section>

        {/* SECTION 5: The Partnership Footer */}
        <section style={{ margin: '8rem 0 4rem 0', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>Buy back your time.</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              If your days are consumed by inbox management, ledger audits, and administrative bottlenecks, it is time to bring in a trusted proxy. Let's discuss how I can support your daily operations.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:info@cronantech.com" className="btn-primary" style={{ textDecoration: 'none', background: '#d4af37', color: '#000', border: 'none' }}>
                Schedule a Consultation
              </a>
              <Link href="/work/software" className="btn-secondary" style={{ borderColor: '#333' }}>
                View Software Architecture
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
      <style jsx global>{`
        .badge {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-family: var(--font-space);
          font-size: 0.8rem;
          color: #d4af37;
        }
      `}</style>
    </main>
  );
}
