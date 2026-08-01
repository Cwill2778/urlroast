'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { Briefcase, MessageSquare, Wrench, X, CornerUpLeft, Smile } from 'lucide-react';
import JobsBoard from '@/components/JobsBoard';
import ContractorsBoard from '@/components/ContractorsBoard';

export default function RomansChat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Layout State for Mobile
  const [activeTab, setActiveTab] = useState('chat'); // 'jobs', 'chat', 'contractors'
  
  // Chat Features State
  const [replyingTo, setReplyingTo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null); // stores message ID

  // Emojis for quick reactions
  const EMOJIS = ['👍', '❤️', '😂', '🔥', '👏'];

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
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newMsg = change.doc.data();
          // Trigger notification if it's not the user's own message
          if (newMsg.uid !== user.uid) {
            const isMentioned = newMsg.text && newMsg.text.includes(`@${user.displayName}`);
            const isReplied = newMsg.replyTo && newMsg.replyTo.author === user.displayName;
            
            if (isMentioned || isReplied) {
              if (Notification.permission === 'granted') {
                new Notification('Roman Exchange', {
                  body: `${newMsg.author}: ${newMsg.text}`,
                  icon: '/icon-192x192.png'
                });
              }
            }
          }
        }
      });
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  // Request Notification Permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

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
    const replyData = replyingTo ? { ...replyingTo } : null;
    
    setInput('');
    setReplyingTo(null);
    
    try {
      await addDoc(collection(db, 'messages'), {
        author: user.displayName || 'Roman',
        uid: user.uid,
        photoURL: user.photoURL || null,
        text: text,
        replyTo: replyData,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReaction = async (msgId, emoji, hasReacted) => {
    if (!user) return;
    const msgRef = doc(db, 'messages', msgId);
    try {
      await updateDoc(msgRef, {
        [`reactions.${emoji}`]: hasReacted ? arrayRemove(user.uid) : arrayUnion(user.uid)
      });
    } catch (error) {
      console.error("Error reacting:", error);
    }
    setShowEmojiPicker(null);
  };

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
      <div style={{ position: 'fixed', top: '73px', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'var(--primary)', fontFamily: 'var(--font-space)', zIndex: 10 }}>
        INITIALIZING ROMAN EXCHANGE...
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', top: '73px', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', background: '#0a0a0a', fontFamily: 'var(--font-oswald)', overflow: 'hidden', zIndex: 10 }}>
      {/* Global Header */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', zIndex: 10, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
            Roman Exchange
          </h1>
          <div style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'var(--font-space)' }}>Community Hub</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a 
            href="https://pay.cronantech.com/b/bJeeVeg1udUCgBQaTA2Ry03" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              background: 'rgba(255, 183, 3, 0.1)', 
              color: 'var(--primary)', 
              border: '1px solid rgba(255, 183, 3, 0.3)',
              padding: '0.25rem 0.75rem',
              borderRadius: '16px',
              textDecoration: 'none', 
              fontSize: '0.8rem',
              fontFamily: 'var(--font-space)'
            }}
          >
            ☕ Support Dev
          </a>
          <Link href="/romans-chat/profile" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.9rem' }}>Profile</Link>
          <button onClick={() => auth.signOut()} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Sign Out
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Column: Jobs (Desktop & Active Mobile Tab) */}
        <div style={{ 
          flex: 1, 
          display: (activeTab === 'jobs' || (typeof window !== 'undefined' && window.innerWidth >= 768)) ? 'block' : 'none',
          minWidth: '300px',
          maxWidth: (typeof window !== 'undefined' && window.innerWidth >= 768) ? '350px' : '100%'
        }}>
          <JobsBoard user={user} />
        </div>

        {/* Center Column: Chat (Desktop & Active Mobile Tab) */}
        <div style={{ 
          flex: 2, 
          display: (activeTab === 'chat' || (typeof window !== 'undefined' && window.innerWidth >= 768)) ? 'flex' : 'none',
          flexDirection: 'column',
          background: '#0a0a0a',
          position: 'relative',
          minWidth: '300px'
        }}>
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
                    gap: '0.75rem',
                    flexDirection: isSelf ? 'row-reverse' : 'row',
                    position: 'relative'
                  }}
                  onMouseLeave={() => setShowEmojiPicker(null)}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#222',
                    flexShrink: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isAdmin ? '2px solid var(--primary)' : '1px solid #444',
                    backgroundImage: msg.photoURL ? `url(${msg.photoURL})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginTop: '1.2rem'
                  }}>
                    {!msg.photoURL && <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'bold' }}>{msg.author.charAt(0).toUpperCase()}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxWidth: 'calc(100% - 48px)' }}>
                    {/* Sender Info & Actions */}
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
                      {!isSelf && (
                        <div className="chat-actions" style={{ display: 'flex', gap: '0.5rem', opacity: 0.7 }}>
                          <button onClick={() => setReplyingTo({ id: msg.id, author: msg.author, text: msg.text })} style={{ background:'none', border:'none', color:'#aaa', cursor:'pointer' }}><CornerUpLeft size={12} /></button>
                          <button onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)} style={{ background:'none', border:'none', color:'#aaa', cursor:'pointer' }}><Smile size={12} /></button>
                        </div>
                      )}
                    </div>

                    {/* Quoted Reply */}
                    {msg.replyTo && (
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderLeft: '2px solid var(--primary)',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#aaa',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        <span style={{ color: 'var(--primary)' }}>{msg.replyTo.author}: </span>
                        {msg.replyTo.text}
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div style={{ 
                      background: isSelf ? 'var(--primary)' : isAdmin ? 'rgba(255,183,3,0.1)' : '#1a1a1a', 
                      color: isSelf ? '#000' : '#fff',
                      border: isAdmin ? '1px solid rgba(255,183,3,0.3)' : '1px solid #333',
                      padding: '0.75rem 1rem', 
                      borderRadius: isSelf ? '16px 16px 0 16px' : '16px 16px 16px 0',
                      fontSize: '1rem',
                      lineHeight: '1.4',
                      wordBreak: 'break-word',
                      position: 'relative'
                    }}>
                      {renderMessageText(msg.text)}
                    </div>

                    {/* Reactions Badge */}
                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.25rem', alignSelf: isSelf ? 'flex-end' : 'flex-start' }}>
                        {Object.entries(msg.reactions).map(([emoji, uids]) => {
                          if (!uids || uids.length === 0) return null;
                          const hasReacted = uids.includes(user.uid);
                          return (
                            <button 
                              key={emoji}
                              onClick={() => handleReaction(msg.id, emoji, hasReacted)}
                              style={{ 
                                background: hasReacted ? 'rgba(255,183,3,0.2)' : '#222',
                                border: hasReacted ? '1px solid var(--primary)' : '1px solid #333',
                                borderRadius: '12px',
                                padding: '2px 6px',
                                fontSize: '0.8rem',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <span>{emoji}</span>
                              <span style={{ fontSize: '0.7rem' }}>{uids.length}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Emoji Picker Popup */}
                  {showEmojiPicker === msg.id && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '100%', 
                      right: isSelf ? 0 : 'auto', 
                      left: isSelf ? 'auto' : '44px', 
                      background: '#222', 
                      border: '1px solid #444', 
                      borderRadius: '24px', 
                      padding: '0.5rem', 
                      display: 'flex', 
                      gap: '0.5rem',
                      zIndex: 20,
                      marginBottom: '0.5rem'
                    }}>
                      {EMOJIS.map(emoji => (
                        <button 
                          key={emoji}
                          onClick={() => handleReaction(msg.id, emoji, msg.reactions?.[emoji]?.includes(user.uid))}
                          style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', transition: 'transform 0.1s' }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '1rem', borderTop: '1px solid #222', background: '#111' }}>
            {replyingTo && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '0.5rem 1rem', borderRadius: '8px 8px 0 0', border: '1px solid #333', borderBottom: 'none' }}>
                <span style={{ fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Replying to <strong style={{ color: 'var(--primary)' }}>{replyingTo.author}</strong>: {replyingTo.text}
                </span>
                <button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={14} /></button>
              </div>
            )}
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
                  borderRadius: replyingTo ? '0 0 0 24px' : '24px', 
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
                  borderRadius: replyingTo ? '0 0 24px 0' : '24px', 
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Contractors (Desktop & Active Mobile Tab) */}
        <div style={{ 
          flex: 1, 
          display: (activeTab === 'contractors' || (typeof window !== 'undefined' && window.innerWidth >= 768)) ? 'block' : 'none',
          minWidth: '300px',
          maxWidth: (typeof window !== 'undefined' && window.innerWidth >= 768) ? '350px' : '100%'
        }}>
          <ContractorsBoard user={user} />
        </div>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
        }
      `}} />
      <div className="mobile-nav" style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        background: '#111', 
        borderTop: '1px solid #333',
        padding: '0.75rem',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
        flexShrink: 0
      }}>
        <button 
          onClick={() => setActiveTab('jobs')}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'jobs' ? 'var(--primary)' : '#888', cursor: 'pointer' }}
        >
          <Briefcase size={20} />
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-oswald)' }}>Projects</span>
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'chat' ? 'var(--primary)' : '#888', cursor: 'pointer' }}
        >
          <MessageSquare size={20} />
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-oswald)' }}>Chat</span>
        </button>
        <button 
          onClick={() => setActiveTab('contractors')}
          style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'contractors' ? 'var(--primary)' : '#888', cursor: 'pointer' }}
        >
          <Wrench size={20} />
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-oswald)' }}>Contractors</span>
        </button>
      </div>

    </div>
  );
}
