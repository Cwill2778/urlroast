'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function RoastContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const audience = searchParams.get('audience');
  const tier = searchParams.get('tier');
  
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url) {
      setError('No URL provided.');
      setLoading(false);
      return;
    }

    const fetchRoast = async () => {
      try {
        const res = await fetch('/api/roast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, audience, tier })
        });
        
        if (!res.ok) {
          throw new Error('Failed to generate roast');
        }
        
        const data = await res.json();
        setRoastData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoast();
  }, [url, audience, tier]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Link href="/" style={{ color: 'var(--primary)', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold' }}>
          &larr; Back to Home
        </Link>
        
        {loading && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Roasting in progress...</h2>
            <p style={{ color: '#a1a1aa' }}>Analyzing {url} {audience ? `for ${audience}` : ''} with brutal honesty. Please hold on.</p>
            <div style={{ marginTop: '2rem' }} className="animate-fade-in delay-200">
               <span style={{ fontSize: '3rem' }}>🔥</span>
            </div>
          </div>
        )}

        {error && (
          <div className="glass-panel" style={{ textAlign: 'center', borderColor: 'var(--primary)' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Error</h2>
            <p>{error}</p>
          </div>
        )}

        {roastData && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
              The Verdict for <span className="gradient-text">{url}</span>
            </h1>
            
            <div className="glass-panel" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#f43f5e' }}>🔥 The Brutal Truth</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{roastData.brutalTruth}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div className="glass-panel">
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>💀 Conversion Killers</h2>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  {roastData.conversionKillers?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel">
                <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#8b5cf6' }}>✨ Actionable Fixes</h2>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  {roastData.actionableFixes?.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {roastData.rewrittenCopy && (
              <div className="glass-panel animate-fade-in delay-200" style={{ borderColor: 'var(--primary)', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#10b981' }}>✍️ Done-For-You Rewrite</h2>
                <p style={{ marginBottom: '1.5rem', color: '#a1a1aa' }}>We rewrote your hero section to actually convert. Copy and paste this directly onto your site.</p>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>NEW HEADLINE</p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{roastData.rewrittenCopy.heroHeadline}</p>
                </div>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>NEW SUBHEADLINE</p>
                  <p style={{ fontSize: '1.1rem' }}>{roastData.rewrittenCopy.subheadline}</p>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px' }}>
                  <p style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>NEW BUTTON (CTA)</p>
                  <button className="btn-primary" style={{ cursor: 'default' }}>{roastData.rewrittenCopy.ctaText}</button>
                </div>
              </div>
            )}
            
            <div className="glass-panel" style={{ textAlign: 'center' }}>
               <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Score</h2>
               <div style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                 {roastData.score}/10
               </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function RoastPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--foreground)' }}>Loading...</div>}>
      <RoastContent />
    </Suspense>
  );
}
