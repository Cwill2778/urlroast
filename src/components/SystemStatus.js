'use client';

export default function SystemStatus() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-space)' }}>
      {/* Pulse dot container */}
      <div style={{ position: 'relative', width: '8px', height: '8px' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#00ff41',
          borderRadius: '50%',
          opacity: 0.8
        }}></div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#00ff41',
          borderRadius: '50%',
          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}></div>
      </div>
      <span style={{ fontSize: '0.75rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Systems: Nominal
      </span>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
