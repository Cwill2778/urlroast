'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MessagesInbox() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.isAnonymous) {
        router.push('/romans-chat/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    // We will structure direct chats with a participants array
    const q = query(
      collection(db, 'direct_chats'),
      where('participants', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      try {
        const chatsData = [];
        for (const docSnapshot of snapshot.docs) {
          const chat = { id: docSnapshot.id, ...docSnapshot.data() };
          
          // Determine the other participant
          const otherUserId = chat.participants.find(uid => uid !== user.uid);
          let otherUser = { displayName: 'Unknown Roman' };
          
          if (otherUserId) {
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            if (userDoc.exists()) {
              otherUser = userDoc.data();
            }
          }
          
          chatsData.push({
            ...chat,
            otherUser,
            otherUserId
          });
        }
        
        // Sort by most recent activity
        chatsData.sort((a, b) => {
          const timeA = a.updatedAt?.toMillis() || 0;
          const timeB = b.updatedAt?.toMillis() || 0;
          return timeB - timeA;
        });
        
        setChats(chatsData);
      } catch (error) {
        console.error("Error loading chats:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
        LOADING INBOX...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'var(--font-oswald)' }}>
      {/* Header */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/romans-chat" style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', letterSpacing: '0.05em' }}>MESSAGES</h1>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {chats.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#111', borderRadius: '12px', border: '1px dashed #333' }}>
            <MessageSquare size={48} color="#444" style={{ marginBottom: '1rem' }} />
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>No Active Transmissions</h2>
            <p style={{ color: '#888', fontFamily: 'var(--font-space)', margin: 0, fontSize: '0.9rem' }}>
              Find a neighbor in the feed or on their profile to send them a direct message.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {chats.map((chat) => (
              <Link href={`/romans-chat/messages/${chat.id}`} key={chat.id} style={{ textDecoration: 'none' }}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#111', padding: '1rem', borderRadius: '12px', border: '1px solid #222', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#1a1a1a'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#111'}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: '#222',
                    border: '1px solid #444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                    backgroundImage: chat.otherUser.photoURL ? `url(${chat.otherUser.photoURL})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                    {!chat.otherUser.photoURL && <span style={{ color: '#666', fontSize: '1.2rem', fontWeight: 'bold' }}>{(chat.otherUser.displayName || 'R').charAt(0).toUpperCase()}</span>}
                  </div>
                  
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff' }}>{chat.otherUser.displayName}</span>
                      <span style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'var(--font-space)' }}>
                        {chat.updatedAt ? new Date(chat.updatedAt.toMillis()).toLocaleDateString() : ''}
                      </span>
                    </div>
                    <div style={{ color: '#888', fontSize: '0.9rem', fontFamily: 'var(--font-space)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {chat.lastMessage || 'Start a conversation...'}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
        
      </main>
    </div>
  );
}
