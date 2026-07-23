'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootLoader() {
  const [isBooting, setIsBooting] = useState(true);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    // Only run once per session
    if (sessionStorage.getItem('cronan-booted')) {
      setIsBooting(false);
      return;
    }

    const bootSequence = [
      { text: "CRONAN OS v2.0.4 [Kernel Version: Maestro-X]", delay: 100 },
      { text: "Initializing boot sequence...", delay: 300 },
      { text: "Loading core modules... [OK]", delay: 600 },
      { text: "Establishing secure connection... [OK]", delay: 900 },
      { text: "Mounting file systems... [OK]", delay: 1100 },
      { text: "Starting UI Server...", delay: 1300 },
      { text: "Welcome to Cronan Technology.", delay: 1500 }
    ];

    bootSequence.forEach((step) => {
      setTimeout(() => {
        setLines(prev => [...prev, step.text]);
      }, step.delay);
    });

    // End boot sequence
    setTimeout(() => {
      sessionStorage.setItem('cronan-booted', 'true');
      setIsBooting(false);
    }, 2000); // 2 seconds total

  }, []);

  if (!isBooting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#050505',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'var(--font-space), monospace',
          color: 'var(--primary)'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: '0.5rem', fontSize: '1rem', opacity: 0.8 }}>
              {line}
            </div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ 
              display: 'inline-block', 
              width: '10px', 
              height: '1rem', 
              backgroundColor: 'var(--primary)',
              marginTop: '0.5rem' 
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
