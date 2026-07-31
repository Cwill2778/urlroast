'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RomansChat() {
  const [messages, setMessages] = useState([
    { id: '1', author: 'Cronan Admin', location: 'Downtown', text: 'Welcome to the live community build of The Roman Exchange!', timestamp: new Date(Date.now() - 3600000).toISOString(), isAdmin: true },
    { id: '2', author: 'User123', location: 'West Rome', text: 'Can\'t wait to see what this becomes.', timestamp: new Date(Date.now() - 1800000).toISOString(), isAdmin: false }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Placeholder for sending message to Firebase
    const newMessage = {
      id: Date.now().toString(),
      author: 'You',
      location: 'Unknown',
      text: input,
      timestamp: new Date().toISOString(),
      isAdmin: false,
      isSelf: true
    };

    setMessages([...messages, newMessage]);
    setInput('');
  };

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
          <Link href="/" style={{ color: '#d4d4d8', textDecoration: 'none', fontSize: '0.9rem' }}>Exit</Link>
        </div>
      </header>

      {/* Message List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              alignSelf: msg.isSelf ? 'flex-end' : 'flex-start',
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
              color: msg.isAdmin ? 'var(--primary)' : '#888',
              alignSelf: msg.isSelf ? 'flex-end' : 'flex-start',
              fontFamily: 'var(--font-space)'
            }}>
              {msg.author} • {msg.location}
            </div>

            {/* Message Bubble */}
            <div style={{ 
              background: msg.isSelf ? 'var(--primary)' : msg.isAdmin ? 'rgba(255,183,3,0.1)' : '#1a1a1a', 
              color: msg.isSelf ? '#000' : '#fff',
              border: msg.isAdmin ? '1px solid rgba(255,183,3,0.3)' : '1px solid #333',
              padding: '0.75rem 1rem', 
              borderRadius: msg.isSelf ? '16px 16px 0 16px' : '16px 16px 16px 0',
              fontSize: '1rem',
              lineHeight: '1.4'
            }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1rem', borderTop: '1px solid #222', background: '#111' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..." 
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
