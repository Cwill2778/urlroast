'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [history, setHistory] = useState([{ type: 'system', content: 'Welcome to CronanTech OS v2.0. Type "help" for a list of commands.' }]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleOpenEvent = () => setIsOpen(true);
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpenEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const cmd = input.trim().toLowerCase();
      setHistory(prev => [...prev, { type: 'user', content: `> ${input}` }]);
      setInput('');

      let response = '';
      switch (cmd) {
        case 'help':
          response = 'Available commands: help, whoami, projects, clear, contact';
          break;
        case 'whoami':
          response = 'Cronan Technology - Next-Generation Digital Agency specializing in React, Next.js, AI, and High-Performance Web Apps.';
          break;
        case 'projects':
          response = '1. Roast My URL (AI Landing Page Auditor)\n2. Coming Soon...';
          break;
        case 'contact':
          response = 'Email: info@cronantech.com';
          break;
        case 'clear':
          setHistory([]);
          return;
        default:
          response = `Command not found: ${cmd}. Type "help" for a list of commands.`;
      }

      setHistory(prev => [...prev, { type: 'system', content: response }]);
    }
  };

  return (
    <>

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: isMaximized ? 0 : '1rem',
              left: isMaximized ? 0 : '50%',
              transform: isMaximized ? 'none' : 'translateX(-50%)',
              width: isMaximized ? '100vw' : '90vw',
              maxWidth: isMaximized ? 'none' : '800px',
              height: isMaximized ? '100vh' : '400px',
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(16px)',
              border: isMaximized ? 'none' : '1px solid var(--primary-glow)',
              borderRadius: isMaximized ? 0 : '12px',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            {/* Terminal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-space)', fontSize: '0.85rem', color: '#d4d4d8' }}>
                <TerminalIcon size={14} color="var(--primary)" />
                CronanTech OS Terminal
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setIsMaximized(!isMaximized)} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}>
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', fontFamily: 'var(--font-space)', fontSize: '0.9rem', color: '#d4d4d8' }}>
              {history.map((msg, i) => (
                <div key={i} style={{ marginBottom: '0.5rem', color: msg.type === 'user' ? 'var(--primary)' : 'inherit', whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--primary)' }}>&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--foreground)',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    outline: 'none'
                  }}
                  autoFocus
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
