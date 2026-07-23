'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, ChevronDown, Phone, Mail } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Navbar() {
  const [workOpen, setWorkOpen] = useState(false);

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(5, 5, 5, 0.8)',
      backdropFilter: 'blur(12px)',
      padding: '1.5rem 2rem',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--foreground)', textDecoration: 'none' }}>
        Cronan<span className="gradient-text">Tech</span>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        
        {/* Work Dropdown */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setWorkOpen(true)}
          onMouseLeave={() => setWorkOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#d4d4d8', textDecoration: 'none', fontSize: '0.95rem', cursor: 'pointer', padding: '0.5rem 0' }}>
            Work <ChevronDown size={14} style={{ transform: workOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </div>
          
          {workOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.5rem 0',
              minWidth: '200px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <Link href="/work/software" style={{ padding: '0.75rem 1rem', color: '#d4d4d8', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s' }} className="nav-dropdown-link">Software & AI</Link>
              <Link href="/work/operations" style={{ padding: '0.75rem 1rem', color: '#d4d4d8', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s' }} className="nav-dropdown-link">Business Operations</Link>
              <Link href="/work/support" style={{ padding: '0.75rem 1rem', color: '#d4d4d8', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s' }} className="nav-dropdown-link">Customer Relations</Link>
            </div>
          )}
        </div>

        <Link href="/about" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.95rem' }}>About</Link>
        <div style={{ position: 'relative' }} className="nav-contact-group">
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="tel:7068448193" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-space)' }}>
              <Phone size={14} /> (706) 844-8193
            </a>
            <a href="mailto:c.brianna@cronantech.com" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-space)' }}>
              <Mail size={14} /> c.brianna@cronantech.com
            </a>
          </div>
        </div>
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>

        {/* Utilities */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={openTerminal}
            title="Open CLI (Ctrl+K)"
            style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex' }}
          >
            <Terminal size={18} />
          </button>
          
          <AudioPlayer />
        </div>
      </div>
    </nav>
  );
}
