'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RomansProfile() {
  const [displayName, setDisplayName] = useState('New Roman');
  const [location, setLocation] = useState('Downtown');
  const [emailVisible, setEmailVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile saved! (This is a mockup)');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-oswald)', padding: '2rem' }}>
      
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>Edit Profile</h1>
        <Link href="/romans-chat" style={{ color: 'var(--primary)', textDecoration: 'none', fontFamily: 'var(--font-space)' }}>← Back to Chat</Link>
      </header>

      <motion.form 
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: '#111', 
          padding: '2rem', 
          borderRadius: '16px', 
          border: '1px solid #333',
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Display Name</label>
          <input 
            type="text" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Location (Side of Town)</label>
          <select 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}
          >
            <option value="West Rome">West Rome</option>
            <option value="East Rome">East Rome</option>
            <option value="North Rome">North Rome</option>
            <option value="South Rome">South Rome</option>
            <option value="Downtown">Downtown</option>
            <option value="Floyd County">Floyd County</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Privacy Settings</h3>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d4d4d8' }}>
            <input 
              type="checkbox" 
              checked={emailVisible}
              onChange={(e) => setEmailVisible(e.target.checked)}
              style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }}
            />
            Show Email to other Romans
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d4d4d8' }}>
            <input 
              type="checkbox" 
              checked={locationVisible}
              onChange={(e) => setLocationVisible(e.target.checked)}
              style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }}
            />
            Show Location to other Romans
          </label>
        </div>

        <button 
          type="submit"
          style={{
            background: 'var(--primary)',
            color: '#000',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Save Profile
        </button>
      </motion.form>
    </div>
  );
}
