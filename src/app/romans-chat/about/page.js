'use client';

import Link from 'next/link';
import { ArrowLeft, Info, Heart, Users, Mail, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a', overflowY: 'auto' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/romans-chat" style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', fontFamily: 'var(--font-oswald)' }}>About The Roman Exchange</h1>
      </header>

      <main style={{ padding: '3rem 1.5rem', maxWidth: '800px', margin: '0 auto', color: '#d4d4d8', fontFamily: 'var(--font-space)', lineHeight: 1.6 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-oswald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info color="var(--primary)" /> 100% Free & Community Built
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            The Roman Exchange is a dedicated platform built by a Roman, for Romans. 
            There are no paywalls, no advertisements, and absolutely no strict algorithms manipulating what you see based on your history.
            When you view the feed, you see live updates from your neighbors in real-time. What you see is exactly what they post.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-oswald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart color="var(--primary)" /> Supporting the Platform
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            I am a solo developer maintaining this platform. As we gain traction and more citizens join, the servers required to host your photos, messages, and check-ins will begin to cost money.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The donation link exists purely to help improve the servers, support website growth, and fund continuous development. Every contribution ensures The Roman Exchange remains fast, free, and independently owned by the community it serves.
          </p>
          <a href="https://pay.cronantech.com/b/bJeeVeg1udUCgBQaTA2Ry03" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'var(--primary)', color: '#000', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontFamily: 'var(--font-oswald)', letterSpacing: '0.05em' }}>
            Donate to Server Costs
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-oswald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users color="var(--primary)" /> Contributors
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            This platform is shaped by the community. A special thanks to those who have contributed brilliant feature suggestions:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong style={{ color: 'var(--primary)', minWidth: '120px' }}>Troy Howe</strong>
              <span style={{ color: '#888' }}>Where I May Rome</span>
            </li>
            <li style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong style={{ color: 'var(--primary)', minWidth: '120px' }}>Charlie Ford</strong>
              <span style={{ color: '#888' }}>Projects & Contractors Boards</span>
            </li>
            <li style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <strong style={{ color: 'var(--primary)', minWidth: '120px' }}>Charles Willis</strong>
              <span style={{ color: '#888' }}>Company of the Month & Polls</span>
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-oswald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code color="var(--primary)" /> Calling Local Tech Talent
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Are you a local developer, designer, or tech enthusiast who wants to help build and scale The Roman Exchange? We are always looking for passionate residents who want to contribute code, UI/UX design, or technical expertise to make this platform even better for Rome.
          </p>
          <a href="mailto:support@cronantech.com?subject=Developer Contribution - Roman Exchange" style={{ display: 'inline-block', background: '#111', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Join the Development Team
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: '3rem', background: 'rgba(255,183,3,0.05)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,183,3,0.2)' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-oswald)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail color="var(--primary)" /> Have a suggestion?
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Have an idea for a new feature? Found a bug? Want to give feedback on how to make The Roman Exchange better? We want to hear it!
          </p>
          <a href="mailto:support@cronantech.com?subject=Roman Exchange Feedback" style={{ display: 'inline-block', background: '#111', color: '#fff', border: '1px solid #333', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Suggest a Feature / Feedback
          </a>
        </motion.div>
      </main>
    </div>
  );
}
