'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, ChevronDown, Phone, Mail, Menu, X } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import SystemStatus from './SystemStatus';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'));
  };

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(12px)',
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--foreground)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Cronan<span className="gradient-text">Tech</span></span>
          </Link>
          <div className="desktop-only" style={{ marginTop: '2px' }}>
            <SystemStatus />
          </div>
        </div>
        
        {/* Mobile Hamburger */}
        <button 
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--foreground)', padding: '0.5rem' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="desktop-flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          
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
          <Link href="/contact" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.95rem' }}>Contact</Link>
          
          <div className="desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="tel:7068448193" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-space)' }}>
              <Phone size={14} /> (706) 844-8193
            </a>
            <a href="mailto:c.brianna@cronantech.com" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-space)' }}>
              <Mail size={14} /> c.brianna@cronantech.com
            </a>
          </div>
          <div className="desktop-only" style={{ width: '1px', height: '20px', background: 'var(--border)' }}></div>

          {/* Utilities */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ThemeToggle />
            <button 
              onClick={openTerminal}
              title="Open CLI (Ctrl+K)"
              style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}
            >
              <Terminal size={18} />
            </button>
            <AudioPlayer />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '73px', // approx navbar height
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 5, 5, 0.98)',
          zIndex: 99,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <SystemStatus />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.2rem' }}>
            <Link href="/work/software" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Work: Software & AI</Link>
            <Link href="/work/operations" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Work: Operations</Link>
            <Link href="/work/support" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Work: Support</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none' }}>Contact</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto', borderTop: '1px solid #333', paddingTop: '2rem' }}>
            <a href="tel:7068448193" style={{ color: '#d4d4d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> (706) 844-8193
            </a>
            <a href="mailto:c.brianna@cronantech.com" style={{ color: '#d4d4d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> c.brianna@cronantech.com
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        .mobile-only {
          display: none !important;
        }
        @media (max-width: 900px) {
          .desktop-only {
            display: none !important;
          }
          .desktop-flex {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
