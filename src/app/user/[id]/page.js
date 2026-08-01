'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { MapPin, MessageSquare, ArrowLeft, Phone, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export default function UserProfile({ params }) {
  // Unwrapping params using React.use() to satisfy Next.js 16+ params rules
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // 1. Fetch User Data
        const userRef = doc(db, 'users', id);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          setError("User not found.");
          setLoading(false);
          return;
        }
        
        const userData = userSnap.data();
        setProfileUser({ id: userSnap.id, ...userData });
        
        // 2. Fetch User's Posts
        const q = query(
          collection(db, 'messages'), 
          where('uid', '==', id)
        );
        
        const postsSnap = await getDocs(q);
        const posts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        posts.sort((a, b) => {
           const timeA = a.timestamp?.toMillis() || 0;
           const timeB = b.timestamp?.toMillis() || 0;
           return timeB - timeA;
        });
        
        setUserPosts(posts);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error loading profile: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchUserAndPosts();
  }, [id]);

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
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
        LOADING PROFILE...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontFamily: 'var(--font-space)' }}>
        <h2>{error}</h2>
        <Link href="/romans-chat" style={{ marginTop: '1rem', color: 'var(--primary)', textDecoration: 'underline' }}>Return to Exchange</Link>
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
        <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', letterSpacing: '0.05em' }}>USER DOSSIER</h1>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Profile Header Card */}
        <div style={{ 
          background: '#111', 
          border: '1px solid #333', 
          borderRadius: '16px', 
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background glow */}
          <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(255,183,3,0.05) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }}></div>
          
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#222',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: '#888',
            fontWeight: 'bold',
            zIndex: 1
          }}>
            {profileUser?.displayName?.charAt(0).toUpperCase()}
          </div>
          
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <h2 style={{ fontSize: '2rem', margin: 0, letterSpacing: '0.05em' }}>{profileUser?.displayName}</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', color: '#aaa', fontFamily: 'var(--font-space)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
              
              {/* Location (if visible) */}
              {profileUser?.locationVisible !== false && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="var(--primary)" />
                  {profileUser?.location || 'Location Unknown'}
                </div>
              )}

              {/* Email (if visible) */}
              {profileUser?.emailVisible && profileUser?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} color="var(--primary)" />
                  <a href={`mailto:${profileUser.email}`} style={{ textDecoration: 'underline' }}>{profileUser.email}</a>
                </div>
              )}

              {/* Phone (if visible) */}
              {profileUser?.phoneVisible && profileUser?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="var(--primary)" />
                  <a href={`tel:${profileUser.phone}`} style={{ textDecoration: 'underline' }}>{profileUser.phone}</a>
                </div>
              )}

              {/* Birthday (if visible) */}
              {profileUser?.birthdayVisible && profileUser?.birthday && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} color="var(--primary)" />
                  {new Date(profileUser.birthday).toLocaleDateString()}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} color="var(--primary)" />
                {userPosts.length} Posts
              </div>
            </div>

            {/* Bio */}
            {profileUser?.bio && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid #333', textAlign: 'left', maxWidth: '600px', margin: '1.5rem auto 0 auto' }}>
                <h4 style={{ color: 'var(--primary)', margin: '0 0 0.5rem 0', fontSize: '0.8rem', fontFamily: 'var(--font-space)' }}>ABOUT ME</h4>
                <p style={{ color: '#d4d4d8', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{profileUser.bio}</p>
              </div>
            )}
            
          </div>
        </div>

        {/* User's Feed */}
        <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#888', fontFamily: 'var(--font-space)' }}>
          TRANSMISSION HISTORY
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {userPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666', border: '1px dashed #333', borderRadius: '12px', fontFamily: 'var(--font-space)' }}>
              No transmissions found for this user.
            </div>
          ) : (
            userPosts.map(post => (
              <div key={post.id} style={{
                background: '#1a1a1a',
                padding: '1.25rem',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontFamily: 'var(--font-space)', fontSize: '0.8rem', color: '#888' }}>
                  <span>{post.timestamp ? new Date(post.timestamp.toMillis()).toLocaleString() : 'Just now'}</span>
                  {post.location && <span>• {post.location}</span>}
                </div>
                
                <div style={{ color: '#d4d4d8', fontSize: '1.05rem', lineHeight: '1.5', wordBreak: 'break-word' }}>
                  {renderMessageText(post.text)}
                </div>
                
                {post.imageUrl && (
                  <div style={{ marginTop: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                    <img src={post.imageUrl} alt="Attached to post" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
      </main>
    </div>
  );
}
