'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioPlayer({ src = '/audio.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.warn('Audio playback failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--glass-border)',
        borderRadius: '50px',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 50,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
      }}
    >
      <audio ref={audioRef} src={src} loop />
      
      <button 
        onClick={togglePlay}
        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isPlaying ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
      </button>

      <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

      <button 
        onClick={toggleMute}
        style={{ background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.05" 
        value={isMuted ? 0 : volume}
        onChange={(e) => {
          setVolume(parseFloat(e.target.value));
          if (isMuted && parseFloat(e.target.value) > 0) setIsMuted(false);
        }}
        style={{
          width: '60px',
          accentColor: 'var(--primary)',
          cursor: 'pointer'
        }}
      />
    </motion.div>
  );
}
