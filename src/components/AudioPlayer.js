'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ src = '/audio.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeCtrl, setShowVolumeCtrl] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(e => console.warn('Audio playback failed:', e));
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}
      onMouseEnter={() => setShowVolumeCtrl(true)}
      onMouseLeave={() => setShowVolumeCtrl(false)}
    >
      <audio ref={audioRef} src={src} loop />
      
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.2rem' }}>
        <button 
          onClick={handlePlay}
          title="Play Audio"
          style={{ 
            background: 'none', 
            border: 'none', 
            color: isPlaying ? 'var(--primary)' : '#a1a1aa', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '0.25rem',
            transition: 'color 0.2s'
          }}
        >
          <Play size={16} fill={isPlaying ? "currentColor" : "none"} />
        </button>

        <button 
          onClick={handleStop}
          title="Stop Audio"
          style={{ 
            background: 'none', 
            border: 'none', 
            color: !isPlaying ? 'var(--primary)' : '#a1a1aa', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '0.25rem',
            transition: 'color 0.2s'
          }}
        >
          <Square size={14} fill={!isPlaying ? "currentColor" : "none"} />
        </button>

        <button 
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#a1a1aa', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '0.25rem',
            transition: 'color 0.2s'
          }}
        >
          {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Volume Slider Knob */}
        <div style={{
          width: showVolumeCtrl ? '60px' : '0px',
          opacity: showVolumeCtrl ? 1 : 0,
          overflow: 'hidden',
          transition: 'width 0.3s ease, opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          marginLeft: showVolumeCtrl ? '0.25rem' : '0'
        }}>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted && e.target.value > 0) setIsMuted(false);
            }}
            style={{
              width: '100%',
              accentColor: 'var(--primary)',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </div>
  );
}
