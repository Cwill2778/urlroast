'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';

const themes = [
  { name: 'Industrial Amber', color: '#ffb700' },
  { name: 'Matrix Green', color: '#00ff41' },
  { name: 'Cyber Blue', color: '#00e5ff' },
  { name: 'Monochrome White', color: '#ffffff' }
];

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeTheme = (color) => {
    document.documentElement.style.setProperty('--primary', color);
    localStorage.setItem('cronan-theme', color);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }} ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme Accent"
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#a1a1aa', 
          cursor: 'pointer', 
          display: 'flex',
          padding: '0.25rem'
        }}
      >
        <Palette size={18} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '120%',
          right: 0,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '0.5rem',
          display: 'flex',
          gap: '0.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 100
        }}>
          {themes.map((theme) => (
            <button
              key={theme.name}
              title={theme.name}
              onClick={() => changeTheme(theme.color)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: theme.color,
                border: '1px solid #333',
                cursor: 'pointer',
                padding: 0
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
