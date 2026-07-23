'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioPlayer({ src = '/audio.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);
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

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <audio ref={audioRef} src={src} loop />
      
      <button 
        onClick={togglePlay}
        title={isPlaying ? "Pause Ambient Audio" : "Play Ambient Audio"}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: isPlaying ? 'var(--primary)' : '#a1a1aa', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transition: 'color 0.2s'
        }}
      >
        {isPlaying ? <Square size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
    </div>
  );
}
