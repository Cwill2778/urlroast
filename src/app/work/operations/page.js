'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Workflow, Database, MessagesSquare, Settings, CheckCircle2, Factory } from 'lucide-react';

export default function OperationsSilo() {
  return (
    <main style={{ minHeight: '100vh', padding: '0 0 4rem 0', background: '#0a0a0c' }}>
      
      {/* SECTION 1: The Operations Hero */}
      <section style={{ 
        position: 'relative', 
        padding: '8rem 2rem 6rem 2rem', 
        textAlign: 'left', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start',
        overflow: 'hidden'
      }}>
        {/* Structured Grid Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          maskImage: 'radial-gradient(ellipse at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: 0
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              display: 'inline-block', 
              color: '#a1a1aa', 
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            Streamlining the Field
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff' }}
          >
            Business Operations & Logistics
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#d4d4d8', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '700px' }}
          >
            I bridge the gap between technology and the physical job site. By designing custom internal tools and structured service frameworks, I eliminate administrative bloat and optimize day-to-day execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="#solutions" className="btn-primary" style={{ display: 'inline-block', background: '#fff', color: '#000', border: 'none' }}>
              View Real-World Solutions
            </Link>
          </motion.div>
        </div>
      </section>

      <div id="solutions" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* SECTION 2: Case Study 01 - The Field Logistics Solution */}
        <section style={{ margin: '6rem 0' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span className="badge">[ Process Automation ]</span>
            <span className="badge">[ Streamlit ]</span>
            <span className="badge">[ Field Tech ]</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#fff' }}>Mobile Field Reporting App</h2>
            
          {/* 3-Column Process Layout */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'stretch' }}>
            
            {/* The Chaos */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.03)', border: '1px solid #333', padding: '2rem', borderRadius: '12px', position: 'relative' }}
            >
              <h3 style={{ fontSize: '1.1rem', color: '#ef4444', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Workflow size={18} /> The Chaos
              </h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                On-site residential contractors lose hours daily to manual photo documentation, disjointed text messages, and chaotic project hand-offs, leading to client disputes and administrative bottlenecks.
              </p>
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', color: '#555' }} className="hide-mobile">
              <motion.div
                 animate={{ x: [0, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight size={32} />
              </motion.div>
            </div>

            {/* The Tech */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.03)', border: '1px solid #333', padding: '2rem', borderRadius: '12px', position: 'relative' }}
            >
              <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Settings size={18} /> The Solution
              </h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                Deployed a custom, lightweight web application (built with Python/Streamlit) designed specifically for mobile use on active job sites. It allows crews to instantly upload, timestamp, and categorize "Before" and "After" photos into a centralized database directly from their iPhones.
              </p>
            </motion.div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', color: '#555' }} className="hide-mobile">
              <motion.div
                 animate={{ x: [0, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                <ArrowRight size={32} />
              </motion.div>
            </div>

            {/* The Result */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ flex: '1 1 300px', background: 'rgba(255,255,255,0.03)', border: '1px solid #333', padding: '2rem', borderRadius: '12px', position: 'relative' }}
            >
              <h3 style={{ fontSize: '1.1rem', color: '#22c55e', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} /> The Impact
              </h3>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                Standardized project documentation, drastically reduced back-office administrative drag, and provided irrefutable visual proof of completed work to clients, speeding up invoice processing.
              </p>
            </motion.div>

          </div>
        </section>

        <div style={{ height: '1px', width: '100%', background: 'var(--border)', margin: '4rem 0' }} />

        {/* SECTION 3: Case Study 02 - The Service Framework */}
        <section style={{ margin: '6rem 0' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span className="badge">[ Property Tech ]</span>
            <span className="badge">[ Process Engineering ]</span>
            <span className="badge">[ Logistics ]</span>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginBottom: '3rem' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Tiered Property Maintenance Logistics</h2>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)', marginBottom: '1.5rem' }}>
                <strong style={{ color: '#d4d4d8' }}>The Problem:</strong> Property management firms often struggle with inconsistent service delivery and unpredictable maintenance schedules during high-volume tenant turnover periods.
              </p>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                <strong style={{ color: '#d4d4d8' }}>The Architecture:</strong> Engineered a scalable, three-tier service framework (Essential, Premium, Elite) to standardize property maintenance operations.
              </p>
            </div>
            
            <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center' }}>
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid var(--primary)', borderRadius: '4px' }}>
                <strong style={{ color: '#22c55e', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>The Impact</strong>
                Transformed a chaotic, reactive maintenance model into a proactive, predictable, and highly marketable service structure that improved tenant retention and simplified contractor dispatch.
              </p>
            </div>
          </div>

          {/* Pricing Tier Style Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
            
            {/* Essential Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              transition={{ duration: 0.4 }}
              style={{ 
                background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)', 
                border: '1px solid #27272a', 
                padding: '3rem 2rem', 
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#a1a1aa' }}>Essential</h3>
              <div style={{ height: '2px', width: '40px', background: '#3f3f46', marginBottom: '1.5rem' }} />
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                Focus on rapid-response turnarounds and core compliance.
              </p>
            </motion.div>

            {/* Premium Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(255,183,3,0.1)' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ 
                background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)', 
                border: '1px solid var(--primary)', 
                padding: '3rem 2rem', 
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#000', padding: '2px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>Most Popular</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Premium</h3>
              <div style={{ height: '2px', width: '40px', background: 'var(--primary)', marginBottom: '1.5rem' }} />
              <p style={{ color: '#d4d4d8', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                Implementation of preventative maintenance schedules and upgraded material sourcing.
              </p>
            </motion.div>

            {/* Elite Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ 
                background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)', 
                border: '1px solid #27272a', 
                padding: '3rem 2rem', 
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#a1a1aa' }}>Elite</h3>
              <div style={{ height: '2px', width: '40px', background: '#3f3f46', marginBottom: '1.5rem' }} />
              <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                Full-stack property oversight, automated tenant communication protocols, and comprehensive asset reporting.
              </p>
            </motion.div>

          </div>
        </section>

      </div>

      {/* SECTION 4: Core Competencies (The Value Add) */}
      <section style={{ margin: '8rem 0', width: '100%', background: 'rgba(15,15,15,1)', position: 'relative' }}>
        {/* Subtle Dark Marble Texture via radial gradients */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,183,3,0.02) 0%, transparent 50%)',
          zIndex: 0
        }} />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}
          >
            The Architecture of Efficiency
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: '#a1a1aa', fontSize: '1.2rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto', lineHeight: '1.6' }}
          >
            Operations is about removing friction. Whether managing HR ledgers or coordinating field crews, my focus is on building systems that allow businesses to scale without breaking.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                <Factory size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Systematizing Chaos</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>Translating messy, real-world workflows into clean, repeatable digital processes.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                <Database size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Data-Driven Logistics</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>Utilizing custom databases and reporting tools to track project velocity, resource allocation, and operational bottlenecks.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                <MessagesSquare size={24} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Cross-Functional Communication</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>Acting as the operational linchpin between technical development, field contractors, and executive management.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5: The Operational Footer */}
      <section style={{ margin: '8rem 0 4rem 0', textAlign: 'center', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>Stop managing the chaos. <span style={{ color: 'var(--primary)' }}>Start scaling the system.</span></h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
            If your team is bogged down by manual reporting, broken communication loops, or inefficient property management structures, let's engineer a better way.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:info@cronantech.com" className="btn-primary" style={{ textDecoration: 'none', background: '#fff', color: '#000', border: 'none' }}>
              Let's Talk Operations
            </a>
            <Link href="/work/support" className="btn-secondary" style={{ borderColor: '#333' }}>
              View Remote Assistance
            </Link>
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        .badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #333;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-family: var(--font-space);
          font-size: 0.8rem;
          color: #d4d4d8;
        }
        @media (max-width: 900px) {
          .hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
