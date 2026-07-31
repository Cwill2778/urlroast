'use client';

import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('Downtown');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/romans-chat');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName });
        
        // Save additional info to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          displayName,
          email,
          location,
          emailVisible: false,
          locationVisible: true,
          createdAt: new Date().toISOString()
        });

        router.push('/romans-chat');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-oswald)', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#111', padding: '2.5rem', borderRadius: '16px', border: '1px solid #333', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
          Roman Exchange
        </h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Display Name</label>
                <input 
                  type="text" 
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Side of Town</label>
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
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}
            />
          </div>

          {error && <div style={{ color: '#ef4444', fontSize: '0.9rem', fontFamily: 'var(--font-space)' }}>{error}</div>}

          <button 
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--primary)',
              color: '#000',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              marginTop: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join the Exchange')}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#a1a1aa' }}>
          {isLogin ? "Don't have an account? " : "Already a Roman? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem', fontFamily: 'var(--font-space)' }}>← Return Home</Link>
        </div>
      </div>
    </div>
  );
}
