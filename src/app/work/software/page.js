'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, Code2, BrainCircuit } from 'lucide-react';

export default function SoftwareSilo() {
  return (
    <main style={{ minHeight: '100vh', padding: '0 0 4rem 0', background: 'var(--background)' }}>
      
      {/* SECTION 1: The Silo Hero */}
      <section style={{ 
        position: 'relative', 
        padding: '8rem 2rem 6rem 2rem', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Subtle abstract background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(255, 183, 3, 0.05) 0%, rgba(5,5,5,1) 70%)',
          zIndex: 0,
          opacity: 0.8
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-block', 
              color: 'var(--primary)', 
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Engineered For Scale
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff' }}
          >
            Software & AI Architecture
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#a1a1aa', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}
          >
            From robust local desktop applications to reactive web environments and agentic AI workflows. I build clean, scalable systems that solve complex problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a href="https://github.com/Cwill2778" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-block' }}>
              View GitHub Repository
            </a>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* SECTION 2: Case Study 01 - The Desktop Solution */}
        <section style={{ margin: '6rem 0', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span className="badge">[ Python ]</span>
              <span className="badge">[ SQLite3 ]</span>
              <span className="badge">[ Local Architecture ]</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>PropFolio Local</h2>
            
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', marginBottom: '1.5rem', fontFamily: 'var(--font-space)' }}>
              Property managers are burdened by expensive, cloud-based SaaS subscriptions that hold their data hostage and suffer from latency issues.
            </p>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Architecture</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', marginBottom: '1.5rem', fontFamily: 'var(--font-space)' }}>
              A lightweight, highly efficient standalone desktop application engineered in Python. It utilizes a robust local SQLite3 relational database to ensure data privacy, zero latency, and offline accessibility.
            </p>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Impact</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
              Empowers users to independently track tenant data, maintenance schedules, and unit turnovers with a customized, one-time-deployment tool that circumvents recurring enterprise costs.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ 
              background: 'linear-gradient(145deg, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%)', 
              borderRadius: '12px', 
              padding: '1rem', 
              border: '1px solid #333',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Laptop Screen Mockup */}
              <div style={{ 
                background: '#0a0a0a', 
                borderRadius: '8px', 
                height: '350px', 
                border: '1px solid #222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Subtle reflection/glare */}
                <div style={{ position: 'absolute', top: 0, left: '-50%', right: 0, bottom: 0, background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, transparent 55%)', zIndex: 10 }} />
                <Database size={64} color="#333" />
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: 'var(--font-space)', color: '#444', fontSize: '0.8rem' }}>PropFolio_Local_v1.0.exe</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: Case Study 02 - The Reactive Frontend */}
        <section style={{ margin: '8rem 0', display: 'flex', flexWrap: 'wrap-reverse', gap: '4rem', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ 
              width: '280px',
              margin: '0 auto',
              background: 'linear-gradient(145deg, rgba(30,30,30,1) 0%, rgba(10,10,10,1) 100%)', 
              borderRadius: '40px', 
              padding: '0.75rem', 
              border: '2px solid #333',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}>
              {/* Mobile Phone Mockup */}
              <div style={{ 
                background: '#050505', 
                borderRadius: '32px', 
                height: '550px', 
                border: '1px solid #222',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                 {/* Fanned cards abstract representation */}
                 <div style={{ position: 'absolute', bottom: '-20px', display: 'flex', gap: '-20px', transform: 'rotate(-5deg)' }}>
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} style={{ 
                        width: '80px', height: '120px', 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        marginLeft: i > 0 ? '-40px' : '0',
                        transform: `rotate(${i * 10 - 10}deg) translateY(${Math.abs(i - 1) * 10}px)`,
                        boxShadow: '-5px 5px 15px rgba(0,0,0,0.5)'
                      }} />
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span className="badge">[ React ]</span>
              <span className="badge">[ Supabase ]</span>
              <span className="badge">[ UI/UX Design ]</span>
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>Luxury Interactive Mobile UI</h2>
            
            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', marginBottom: '1.5rem', fontFamily: 'var(--font-space)' }}>
              Mobile card games often suffer from clunky, unintuitive interfaces that break user immersion and struggle with real-time backend synchronization.
            </p>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Architecture</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', marginBottom: '1.5rem', fontFamily: 'var(--font-space)' }}>
              A premium frontend built in React, featuring a dynamic, 3D-styled fanned-hand interface for seamless card interaction. The backend is powered by Supabase, enabling real-time database syncing, secure user authentication, and low-latency state management.
            </p>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Impact</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
              Delivers a fluid, app-like luxury experience in a mobile browser, demonstrating advanced frontend state management and secure backend integration.
            </p>
          </motion.div>
          
        </section>

        {/* SECTION 4: The AI & Agentic Workflow Advantage */}
        <section style={{ margin: '8rem 0' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ 
              padding: '4rem 3rem', 
              background: 'linear-gradient(180deg, rgba(20,20,20,0.8) 0%, rgba(5,5,5,1) 100%)',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>The Future of Deployment: Agentic Frameworks</h2>
              <p style={{ color: '#a1a1aa', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', fontFamily: 'var(--font-space)' }}>
                Writing code is only half the equation. The modern developer must be an orchestrator of artificial intelligence.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              
              <div style={{ textAlign: 'left' }}>
                <BrainCircuit size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>AI Model Evaluation</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                  Extensive remote experience rigorously testing, rating, and refining Large Language Models (LLMs). I understand how AI "thinks," allowing me to structure data and prompts for optimal machine learning outputs.
                </p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <Terminal size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>Autonomous Dev Environments</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                  Proficient in utilizing advanced agentic coding tools like Kiro and Cline. By integrating AI assistants directly into the workflow, I dramatically accelerate rapid prototyping, complex refactoring, and bug resolution.
                </p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <Code2 size={32} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#fff' }}>Clean & Scalable Code</h3>
                <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
                  AI tools generate the raw material, but engineering experience refines it. I maintain strict architectural standards, ensuring that AI-assisted code remains modular, secure, and highly scalable.
                </p>
              </div>

            </div>
          </motion.div>
        </section>

        {/* SECTION 5: The Technical Footer */}
        <section style={{ margin: '8rem 0 4rem 0', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#fff' }}>Ready to build something exceptional?</h2>
            <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6', fontFamily: 'var(--font-space)' }}>
              Whether you need a local database architected from the ground up or a responsive React interface, let's discuss your technical requirements.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:info@cronantech.com" className="btn-primary" style={{ textDecoration: 'none' }}>
                Let's Talk Tech
              </a>
              <Link href="/work/operations" className="btn-secondary">
                View Operations Portfolio
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
      <style jsx global>{`
        .badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-family: var(--font-space);
          font-size: 0.8rem;
          color: #d4d4d8;
        }
      `}</style>
    </main>
  );
}

// Add the Terminal icon manually since it wasn't imported from lucide-react in this file initially
import { Terminal } from 'lucide-react';
