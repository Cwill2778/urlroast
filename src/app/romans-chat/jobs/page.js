'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import JobsBoard from '@/components/JobsBoard';

export default function JobsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.isAnonymous) {
        router.push('/romans-chat/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div style={{ background: '#0a0a0a', minHeight: '100vh' }}></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/romans-chat" style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', fontFamily: 'var(--font-oswald)' }}>Projects & Jobs</h1>
          <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem', fontFamily: 'var(--font-space)' }}>
            Feature suggestion by: <strong style={{ color: 'var(--primary)' }}>Charlie Ford</strong>
          </div>
        </div>
      </header>
      <main style={{ flex: 1, overflow: 'hidden' }}>
        <JobsBoard user={user} />
      </main>
    </div>
  );
}
