'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Workflow, MessageSquare } from 'lucide-react';

export default function About() {
  return (
    <main style={{ minHeight: '100vh', padding: '0 0 4rem 0', background: '#111111' }}>
      
      {/* SECTION 1: The Introduction */}
      <section style={{ 
        padding: '8rem 2rem 6rem 2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid #222'
      }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 500px' }}
          >
            <div style={{ 
              color: '#d4af37', 
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              The Architect Behind The Code
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: '800', 
              lineHeight: '1.1', 
              marginBottom: '2rem', 
              letterSpacing: '-0.02em', 
              color: '#ffffff' 
            }}>
              Bridging the Gap Between Engineering and Execution.
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: '#d4d4d8', lineHeight: '1.8', marginBottom: '1.5rem', fontFamily: 'var(--font-space)' }}>
              I am an AI Software Engineering professional currently completing my degree at Maestro University. But beyond the IDE and the classroom, I am a builder of systems.
            </p>

            <p style={{ fontSize: '1.1rem', color: '#a1a1aa', lineHeight: '1.8', fontFamily: 'var(--font-space)' }}>
              Through Cronan Technology, I recognized early on that writing clean code is only half the battle. The real challenge—and the real value—lies in making that code work seamlessly within the messy, fast-paced reality of business operations. I don't just build software; I engineer the workflows, data structures, and client experiences that surround it.
            </p>
          </motion.div>

          {/* Abstract Geometric Graphic / Portrait Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '3/4',
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)',
              border: '1px solid #333',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              {/* Geometric elements simulating an editorial abstract portrait */}
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%', border: '2px solid rgba(212, 175, 55, 0.2)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '40px', height: '4px', background: 'rgba(212, 175, 55, 0.5)' }} />
              <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '4px', height: '40px', background: 'rgba(212, 175, 55, 0.5)' }} />
              
              <div style={{ 
                position: 'absolute', 
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)'
              }} />
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: The Triad of Expertise */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}
        >
          
          {/* Pillar 1 */}
          <div style={{ background: '#151515', padding: '3rem 2rem', border: '1px solid #222', borderRadius: '4px' }}>
            <Code2 size={32} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>The Engineer</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
              Building robust, scalable applications. Whether it is an interactive React UI or a local SQLite3 database for property management, my development philosophy centers on zero-latency performance and absolute data integrity.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ background: '#151515', padding: '3rem 2rem', border: '1px solid #222', borderRadius: '4px' }}>
            <Workflow size={32} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>The Operator</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
              Translating chaos into structure. My background in administrative logistics allows me to design tools that actively eliminate back-office drag, field reporting bottlenecks, and HR inefficiencies.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ background: '#151515', padding: '3rem 2rem', border: '1px solid #222', borderRadius: '4px' }}>
            <MessageSquare size={32} color="#d4af37" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>The Proxy</h3>
            <p style={{ color: '#a1a1aa', lineHeight: '1.7', fontFamily: 'var(--font-space)' }}>
              Delivering premium client relations. I understand that a brand's reputation relies on prompt, articulate, and highly organized communication. I bring technical precision to everyday administrative support.
            </p>
          </div>

        </motion.div>
      </section>

      {/* SECTION 3: The Agentic Future */}
      <section style={{ background: '#0a0a0a', padding: '6rem 2rem', borderTop: '1px solid #222' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '2rem' }}
          >
            Embracing the Agentic Workflow
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: '#a1a1aa', fontSize: '1.2rem', lineHeight: '1.8', fontFamily: 'var(--font-space)', marginBottom: '4rem' }}
          >
            The landscape of software development is shifting rapidly. I heavily utilize agentic coding tools (like Kiro and Cline) and possess extensive experience in AI model evaluation. I believe the modern developer must evolve from simply a "writer of code" into an orchestrator of artificial intelligence—directing AI to rapidly prototype, refactor, and scale solutions faster than ever before.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ padding: '3rem', border: '1px solid rgba(212, 175, 55, 0.3)', background: 'rgba(212, 175, 55, 0.02)', borderRadius: '4px' }}
          >
            <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '2rem' }}>
              If you are looking for a professional who understands the code and the company it serves, let's talk.
            </p>
            <a href="mailto:info@cronantech.com" className="btn-primary" style={{ display: 'inline-block', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold' }}>
              Get In Touch
            </a>
          </motion.div>
          
        </div>
      </section>

    </main>
  );
}
