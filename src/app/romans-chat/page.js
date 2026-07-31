'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RomansChat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/romans-chat/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Firestore Messages Listener
  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    
    const text = input;
    setInput('');
    
    try {
      await addDoc(collection(db, 'messages'), {
        author: user.displayName || 'Roman',
        uid: user.uid,
        text: text,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to render text with colored @mentions
  const renderMessageText = (text) => {
    if (!text) return null;
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        return <span key={i} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{part}</span>;
      }
      return part;
    });
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
        INITIALIZING ROMAN EXCHANGE...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-oswald)' }}>
      {/* Header */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', zIndex: 10 }}>
        <div>
          <h1 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
            Roman Exchange
          </h1>
          <div style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'var(--font-space)' }}>Live Community Build</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/romans-chat/profile" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.9rem' }}>Profile</Link>
          <button 
            onClick={() => auth.signOut()}
            style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Message List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && (
           <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem', fontFamily: 'var(--font-space)' }}>
             No messages yet. Be the first to speak!
           </div>
        )}
        
        {messages.map((msg) => {
          const isSelf = msg.uid === user?.uid;
          const isAdmin = msg.author === 'Cronan Admin';
          
          return (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                alignSelf: isSelf ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}
            >
              {/* Sender Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                fontSize: '0.75rem', 
                color: isAdmin ? 'var(--primary)' : '#888',
                alignSelf: isSelf ? 'flex-end' : 'flex-start',
                fontFamily: 'var(--font-space)'
              }}>
                {msg.author}
              </div>

              {/* Message Bubble */}
              <div style={{ 
                background: isSelf ? 'var(--primary)' : isAdmin ? 'rgba(255,183,3,0.1)' : '#1a1a1a', 
                color: isSelf ? '#000' : '#fff',
                border: isAdmin ? '1px solid rgba(255,183,3,0.3)' : '1px solid #333',
                padding: '0.75rem 1rem', 
                borderRadius: isSelf ? '16px 16px 0 16px' : '16px 16px 16px 0',
                fontSize: '1rem',
                lineHeight: '1.4',
                wordBreak: 'break-word'
              }}>
                {renderMessageText(msg.text)}
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1rem', borderTop: '1px solid #222', background: '#111' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message... use @name to tag" 
            style={{ 
              flex: 1, 
              background: '#0a0a0a', 
              border: '1px solid #333', 
              padding: '0.75rem 1rem', 
              borderRadius: '24px', 
              color: '#fff',
              outline: 'none',
              fontFamily: 'inherit'
            }} 
          />
          <button 
            type="submit" 
            style={{ 
              background: 'var(--primary)', 
              color: '#000', 
              border: 'none', 
              padding: '0 1.5rem', 
              borderRadius: '24px', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
