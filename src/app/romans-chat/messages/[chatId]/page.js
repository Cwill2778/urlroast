'use client';

import { useState, useEffect, useRef, use } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatView({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const chatId = unwrappedParams.chatId;
  
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

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
    if (!user || !chatId) return;

    const fetchChatDetails = async () => {
      try {
        const chatDoc = await getDoc(doc(db, 'direct_chats', chatId));
        if (chatDoc.exists()) {
          const chatData = chatDoc.data();
          if (!chatData.participants.includes(user.uid)) {
            router.push('/romans-chat/messages');
            return;
          }
          
          const otherUserId = chatData.participants.find(uid => uid !== user.uid);
          if (otherUserId) {
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            if (userDoc.exists()) {
              setOtherUser({ id: otherUserId, ...userDoc.data() });
            }
          }
        }
      } catch (e) {
        console.error("Error fetching chat details:", e);
      }
    };

    fetchChatDetails();

    const q = query(
      collection(db, 'direct_chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [user, chatId, router]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user || !chatId) return;
    
    const text = input.trim();
    setInput('');
    
    try {
      await addDoc(collection(db, 'direct_chats', chatId, 'messages'), {
        senderId: user.uid,
        text,
        timestamp: serverTimestamp()
      });
      
      await updateDoc(doc(db, 'direct_chats', chatId), {
        lastMessage: text,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error sending direct message:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
        ESTABLISHING CONNECTION...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'var(--font-oswald)' }}>
      {/* Header */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, zIndex: 10 }}>
        <Link href="/romans-chat/messages" style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#222',
            border: '1px solid #444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundImage: otherUser?.photoURL ? `url(${otherUser.photoURL})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
            {!otherUser?.photoURL && <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: 'bold' }}>{(otherUser?.displayName || 'R').charAt(0).toUpperCase()}</span>}
          </div>
          <h1 style={{ fontSize: '1.2rem', margin: 0, color: '#fff', letterSpacing: '0.05em' }}>{otherUser?.displayName || 'Unknown Roman'}</h1>
        </div>
      </header>

      {/* Messages Area */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666', fontFamily: 'var(--font-space)', marginTop: '2rem' }}>
            This is the start of your secure transmission.
          </div>
        )}
        
        {messages.map((msg, index) => {
          const isMine = msg.senderId === user?.uid;
          const showTime = index === 0 || (msg.timestamp && messages[index-1].timestamp && (msg.timestamp.toMillis() - messages[index-1].timestamp.toMillis() > 300000)); // Show time every 5 mins
          
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
              {showTime && msg.timestamp && (
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'var(--font-space)', margin: '1rem 0 0.5rem 0' }}>
                  {new Date(msg.timestamp.toMillis()).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
              <motion.div 
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                style={{
                  maxWidth: '75%',
                  padding: '0.75rem 1rem',
                  borderRadius: isMine ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  background: isMine ? 'var(--primary)' : '#1a1a1a',
                  color: isMine ? '#000' : '#fff',
                  border: isMine ? 'none' : '1px solid #333',
                  fontFamily: 'var(--font-space)',
                  fontSize: '0.95rem',
                  lineHeight: '1.4',
                  wordBreak: 'break-word'
                }}
              >
                {msg.text}
              </motion.div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>
      
      {/* Input Area */}
      <div style={{ padding: '1rem', background: '#111', borderTop: '1px solid #222', flexShrink: 0, paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem', maxWidth: '800px', margin: '0 auto' }}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Transmit message..." 
            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '24px', background: '#0a0a0a', border: '1px solid #333', color: '#fff', fontSize: '1rem', outline: 'none', fontFamily: 'var(--font-space)' }}
          />
          <button type="submit" disabled={!input.trim()} style={{ background: input.trim() ? 'var(--primary)' : '#333', color: '#000', border: 'none', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
            <Send size={18} style={{ transform: 'translateX(2px)' }} />
          </button>
        </form>
      </div>
    </div>
  );
}
