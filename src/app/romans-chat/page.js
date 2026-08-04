'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Briefcase, MessageSquare, Wrench, X, CornerUpLeft, Smile, Image as ImageIcon, User, Home, LogOut, Search, Bell, UserPlus, Map, Building, Plus, Edit, Trash2, Info, Award, BarChart2, ShoppingCart } from 'lucide-react';

import TrailsPortal from '@/components/TrailsPortal';
import RenovationsBoard from '@/components/RenovationsBoard';
import ExpandableText from '@/components/ExpandableText';

export default function RomansChat() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showGuestPopup, setShowGuestPopup] = useState(true);
  const fileInputRef = useRef(null);

  // Layout State
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'trails', 'renovations'
  
  // Chat Features State
  const [replyingTo, setReplyingTo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'company' || tab === 'marketplace') {
        setActiveTab(tab);
      }
    }
  }, []);

  // Emojis for quick reactions
  const EMOJIS = ['👍', '❤️', '😂', '🔥', '👏'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        router.push('/romans-chat/login');
      } else {
        setUser(currentUser);
        try {
          if (!currentUser.isAnonymous) {
            const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
            if (docSnap.exists() && docSnap.data().location) {
              setUserLocation(docSnap.data().location);
            }
          }
        } catch(e) {
          console.error(e);
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    
    // Create a local variable within the effect to track initial load
    let initialLoad = true;
    
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!initialLoad) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const newMsg = change.doc.data();
            if (newMsg.uid !== user.uid) {
              const isMentioned = newMsg.text && newMsg.text.includes(`@${user.displayName}`);
              const isReplied = newMsg.replyTo && newMsg.replyTo.author === user.displayName;
              
              if (isMentioned || isReplied) {
                if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
                  new Notification('The Roman Exchange', {
                    body: `${newMsg.author}: ${newMsg.text}`
                  });
                }
              }
            }
          }
        });
      } else {
        initialLoad = false;
      }
      
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Firestore listener error:", error);
      setErrorMsg(error.message);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile(); // Check on initial load
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !imageFile) || !user || uploading || user.isAnonymous) return;
    
    setUploading(true);
    const text = input;
    const replyData = replyingTo ? { ...replyingTo } : null;
    let imageUrl = null;
    
    try {
      if (imageFile) {
        const fileRef = ref(storage, `exchange_images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(fileRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'messages'), {
        author: user.displayName || 'Roman',
        uid: user.uid,
        photoURL: user.photoURL || null,
        location: userLocation || null,
        text: text,
        imageUrl: imageUrl,
        replyTo: replyData,
        timestamp: serverTimestamp(),
      });
      
      setInput('');
      setImageFile(null);
      setReplyingTo(null);
      setShowPostModal(false);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMsg("Failed to post: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (msgId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'messages', msgId));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const handleEditSubmit = async (msgId) => {
    if (!editInput.trim()) return;
    try {
      await updateDoc(doc(db, 'messages', msgId), {
        text: editInput
      });
      setEditingPostId(null);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleReaction = async (msgId, emoji, hasReacted) => {
    if (!user || user.isAnonymous) return;
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
        INITIALIZING THE ROMAN EXCHANGE...
      </div>
    );
  }

  const isGuest = !user || user.isAnonymous;

  return (
    <div style={{ position: 'fixed', top: '73px', bottom: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column', background: '#0a0a0a', fontFamily: 'var(--font-oswald)', overflow: 'hidden', zIndex: 10 }}>

      <AnimatePresence>
        {isGuest && showGuestPopup && (
          <motion.div 
            key="guest-popup"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', textAlign: 'center' }}
            >
              <h2 style={{ color: 'var(--primary)', margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Welcome, Guest!</h2>
              <p style={{ color: '#d4d4d8', fontFamily: 'var(--font-space)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Logging in anonymously you wont be able to post in the feed because you must be signed in. However, you can take a look around and hopefully you decide to join us here at The Roman Exchange.
              </p>
              <button 
                onClick={() => setShowGuestPopup(false)}
                style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
              >
                Start Exploring
              </button>
            </motion.div>
          </motion.div>
        )}
        
        {showInviteModal && (
          <motion.div 
            key="invite-modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }}
            >
              <button onClick={() => setShowInviteModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={20}/></button>
              <h2 style={{ color: 'var(--primary)', margin: '0 0 1rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><UserPlus size={24}/> Add Neighbor</h2>
              <p style={{ color: '#d4d4d8', fontFamily: 'var(--font-space)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Share this link with your neighbors to invite them to The Roman Exchange!
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" readOnly value="https://romanexchange.cronantech.com" style={{ flex: 1, background: '#000', border: '1px solid #333', color: '#fff', padding: '0.75rem', borderRadius: '8px', fontFamily: 'var(--font-space)' }} />
                <button onClick={() => { navigator.clipboard.writeText('https://romanexchange.cronantech.com'); alert('Link copied!'); setShowInviteModal(false); }} style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0 1rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Copy</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showNotificationsModal && (
          <motion.div 
            key="notif-modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              style={{ background: '#111', border: '1px solid #333', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }}
            >
              <button onClick={() => setShowNotificationsModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={20}/></button>
              <h2 style={{ color: 'var(--primary)', margin: '0 0 1rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bell size={24}/> Notifications</h2>
              <div style={{ background: '#1a1a1a', border: '1px solid #222', borderRadius: '8px', padding: '2rem', textAlign: 'center', color: '#666', fontFamily: 'var(--font-space)' }}>
                You're all caught up! No new notifications right now.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Professional 3-Column Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* LEFT SIDEBAR: Navigation Hub (Desktop Only) */}
        <div className="desktop-sidebar-left" style={{ 
          width: '280px', 
          flexShrink: 0, 
          borderRight: '1px solid #222', 
          background: '#0a0a0a',
          flexDirection: 'column',
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          {/* User Snapshot Card */}
          {!isGuest ? (
            <div style={{ background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#222', border: '2px solid var(--primary)', marginBottom: '1rem', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: user.photoURL ? `url(${user.photoURL})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {!user.photoURL && <User size={32} color="#666" />}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{user.displayName || 'Roman Citizen'}</h3>
              <p style={{ margin: '0.25rem 0 0 0', color: 'var(--primary)', fontFamily: 'var(--font-space)', fontSize: '0.8rem' }}>{userLocation || 'Citizen'}</p>
            </div>
          ) : (
            <div style={{ background: '#111', border: '1px dashed #333', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <User size={48} color="#666" style={{ marginBottom: '1rem' }} />
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Guest Visitor</h3>
              <p style={{ margin: '0.25rem 0 1rem 0', color: '#888', fontFamily: 'var(--font-space)', fontSize: '0.8rem', lineHeight: 1.5 }}>Sign in to join the conversation and connect with others.</p>
              <Link href="/romans-chat/login" style={{ background: 'var(--primary)', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', width: '100%' }}>Sign In</Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
            <button onClick={() => setActiveTab('feed')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: activeTab === 'feed' ? 'rgba(255,183,3,0.1)' : 'transparent', color: activeTab === 'feed' ? 'var(--primary)' : '#d4d4d8', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: activeTab === 'feed' ? 'bold' : 'normal', transition: 'background 0.2s', textAlign: 'left' }}>
              <Home size={20} /> Community Feed
            </button>
            <button onClick={() => setActiveTab('trails')} className="desktop-only-btn" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: activeTab === 'trails' ? 'rgba(255,183,3,0.1)' : 'transparent', color: activeTab === 'trails' ? 'var(--primary)' : '#d4d4d8', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: activeTab === 'trails' ? 'bold' : 'normal', transition: 'background 0.2s', textAlign: 'left' }}>
              <Map size={20} /> Where I May Rome
            </button>
            <button onClick={() => setActiveTab('renovations')} className="desktop-only-btn" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: activeTab === 'renovations' ? 'rgba(255,183,3,0.1)' : 'transparent', color: activeTab === 'renovations' ? 'var(--primary)' : '#d4d4d8', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: activeTab === 'renovations' ? 'bold' : 'normal', transition: 'background 0.2s', textAlign: 'left' }}>
              <Building size={20} /> Civic Projects
            </button>
            <button onClick={() => setActiveTab('company')} className="desktop-only-btn" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: activeTab === 'company' ? 'rgba(255,183,3,0.1)' : 'transparent', color: activeTab === 'company' ? 'var(--primary)' : '#d4d4d8', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: activeTab === 'company' ? 'bold' : 'normal', transition: 'background 0.2s', textAlign: 'left' }}>
              <Award size={20} /> Company of the Month
            </button>
            <button onClick={() => setActiveTab('marketplace')} className="desktop-only-btn" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: activeTab === 'marketplace' ? 'rgba(255,183,3,0.1)' : 'transparent', color: activeTab === 'marketplace' ? 'var(--primary)' : '#d4d4d8', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: activeTab === 'marketplace' ? 'bold' : 'normal', transition: 'background 0.2s', textAlign: 'left' }}>
              <ShoppingCart size={20} /> Marketplace
            </button>
            
            <div style={{ height: '1px', background: '#222', margin: '0.5rem 0' }}></div>
            
            <Link href="/romans-chat/messages" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#d4d4d8', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#111'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <MessageSquare size={20} /> Messages
            </Link>
            <Link href="/romans-chat/jobs" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#d4d4d8', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#111'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <Briefcase size={20} /> Projects & Jobs
            </Link>
            <Link href="/romans-chat/contractors" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#d4d4d8', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#111'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <Wrench size={20} /> Contractors
            </Link>
            <Link href="/romans-chat/profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#d4d4d8', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#111'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <User size={20} /> Profile
            </Link>
            <Link href="/romans-chat/about" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#d4d4d8', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#111'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <Info size={20} /> About Platform
            </Link>
            <button onClick={() => auth.signOut()} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', color: '#ef4444', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
              <LogOut size={20} /> Leave Exchange
            </button>
          </nav>
        </div>

        {/* CENTER COLUMN: Feed & Active Mobile Tab */}
        <div className={activeTab === 'feed' ? 'mobile-visible-flex' : 'mobile-hidden'} style={{ 
          flex: 1, 
          flexDirection: 'column',
          background: '#0a0a0a',
          position: 'relative',
          maxWidth: '800px', // slightly wider now that there's only 2 columns typically
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Mobile Top Bar */}
          <div className="mobile-only-header" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={20}/> THE ROMAN EXCHANGE
              </h1>
              <div style={{ display: 'flex', gap: '1rem', color: '#888', alignItems: 'center' }}>
                <button style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}><Search size={20} /></button>
                <button onClick={() => setShowNotificationsModal(true)} style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}><Bell size={20} /></button>
                <Link href="/romans-chat/about" style={{ color: 'inherit' }}><Info size={20} /></Link>
                <Link href="/romans-chat/profile" style={{ color: 'inherit' }}><User size={20} /></Link>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => setShowInviteModal(true)} style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <UserPlus size={16}/> Add Neighbor
              </button>
              <button onClick={() => setActiveTab('trails')} style={{ flex: 1, background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Map size={16}/> Where I May Rome
              </button>
            </div>
          </div>

          {/* Desktop Top Bar (Hidden on Mobile) */}
          <div className="desktop-only" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h1 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={24}/> THE ROMAN EXCHANGE
              </h1>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href="/romans-chat/about" style={{ color: '#888', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} onMouseOver={(e)=>e.currentTarget.style.color='#fff'} onMouseOut={(e)=>e.currentTarget.style.color='#888'}><Info size={20} /></Link>
                <button onClick={() => setShowNotificationsModal(true)} style={{ background: 'none', border: 'none', color: '#888', padding: '0 0.5rem', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.color='#fff'} onMouseOut={(e)=>e.currentTarget.style.color='#888'}><Bell size={20} /></button>
                <button onClick={() => setShowInviteModal(true)} style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <UserPlus size={16}/> Add Neighbor
                </button>
                <button onClick={() => setActiveTab('trails')} style={{ background: '#1a1a1a', border: '1px solid #333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <Map size={16}/> Where I May Rome
                </button>
              </div>
          </div>

          {/* Create Post Modal / Inline Form */}
          <AnimatePresence>
            {(showPostModal || !isMobile) && (
              <motion.div 
                key="post-modal"
                initial={isMobile ? { opacity: 0, y: 100 } : {}}
                animate={isMobile ? { opacity: 1, y: 0 } : {}}
                exit={isMobile ? { opacity: 0, y: 100 } : {}}
                className="post-modal-container"
                style={{ padding: '1.5rem', borderBottom: '1px solid #222', background: '#0a0a0a', zIndex: 30 }}
              >
                <div style={{ background: '#111', borderRadius: '12px', padding: '1rem', border: '1px solid #333', opacity: isGuest ? 0.6 : 1, position: 'relative' }}>
                  
                  {/* Close button on mobile modal */}
                  <button className="mobile-only-header" onClick={() => setShowPostModal(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#888' }}><X size={20}/></button>
                  
                  {replyingTo && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '0.5rem 1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #444', marginTop: isMobile ? '1.5rem' : '0' }}>
                      <span style={{ fontSize: '0.8rem', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Replying to <strong style={{ color: 'var(--primary)' }}>{replyingTo.author}</strong>: {replyingTo.text}
                      </span>
                      <button onClick={() => setReplyingTo(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><X size={14} /></button>
                    </div>
                  )}
                  <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: (isMobile && !replyingTo) ? '1.5rem' : '0' }}>
                    <input 
                      type="text" value={input} onChange={(e) => setInput(e.target.value)}
                      placeholder={isGuest ? "Sign in to join the conversation" : "What's happening in Rome? Use @name to tag."} 
                      disabled={isGuest}
                      style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.1rem', outline: 'none', fontFamily: 'inherit', cursor: isGuest ? 'not-allowed' : 'text' }} 
                    />
                    
                    {imageFile && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1a1a1a', padding: '0.5rem 1rem', borderRadius: '8px', width: 'fit-content', border: '1px solid #333' }}>
                        <ImageIcon size={14} color="var(--primary)" />
                        <span style={{ fontSize: '0.8rem', color: '#d4d4d8' }}>{imageFile.name}</span>
                        <button type="button" onClick={() => setImageFile(null)} disabled={isGuest} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', marginLeft: '0.5rem' }}><X size={14} /></button>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: '1rem' }}>
                      <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} disabled={isGuest} onChange={(e) => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]); }} />
                      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isGuest} style={{ background: 'none', border: 'none', color: isGuest ? '#555' : 'var(--primary)', cursor: isGuest ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>
                        <ImageIcon size={18} /> Add Photo
                      </button>
                      
                      <button type="submit" disabled={isGuest || uploading || (!input.trim() && !imageFile)} style={{ background: (isGuest || uploading || (!input.trim() && !imageFile)) ? '#333' : 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '24px', fontWeight: 'bold', cursor: (isGuest || uploading || (!input.trim() && !imageFile)) ? 'not-allowed' : 'pointer' }}>
                        {uploading ? 'Posting...' : 'Post'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0 1.5rem 1rem 1.5rem', overflowX: 'auto', whiteSpace: 'nowrap', borderBottom: '1px solid #222', scrollbarWidth: 'none' }}>
            <button style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.25rem 1rem', borderRadius: '16px', fontWeight: 'bold', fontSize: '0.85rem' }}>All</button>
            <button style={{ background: '#1a1a1a', border: '1px solid #333', color: '#d4d4d8', padding: '0.25rem 1rem', borderRadius: '16px', fontSize: '0.85rem' }}>Neighbor Posts</button>
            <button style={{ background: '#1a1a1a', border: '1px solid #333', color: '#d4d4d8', padding: '0.25rem 1rem', borderRadius: '16px', fontSize: '0.85rem' }}>Walks</button>
            <button style={{ background: '#1a1a1a', border: '1px solid #333', color: '#d4d4d8', padding: '0.25rem 1rem', borderRadius: '16px', fontSize: '0.85rem' }}>Renovations</button>
            <button style={{ background: '#1a1a1a', border: '1px solid #333', color: '#d4d4d8', padding: '0.25rem 1rem', borderRadius: '16px', fontSize: '0.85rem' }}>Local Alerts</button>
          </div>

          {/* Message List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {errorMsg && (
               <div style={{ textAlign: 'center', color: '#ef4444', fontFamily: 'var(--font-space)', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                 ⚠️ <strong>Database Error:</strong> {errorMsg}
               </div>
            )}
            {messages.length === 0 && !errorMsg && (
               <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem', fontFamily: 'var(--font-space)' }}>
                 No posts yet. Be the first to speak!
               </div>
            )}
            
            {(() => {
              const sortedMessages = [...messages];
              if (userLocation) {
                sortedMessages.sort((a, b) => {
                  const aSame = a.location === userLocation;
                  const bSame = b.location === userLocation;
                  if (aSame && !bSame) return -1;
                  if (!aSame && bSame) return 1;
                  
                  const aTime = (typeof a.timestamp?.toMillis === 'function') ? a.timestamp.toMillis() : 0;
                  const bTime = (typeof b.timestamp?.toMillis === 'function') ? b.timestamp.toMillis() : 0;
                  return bTime - aTime;
                });
              }
              
              return sortedMessages.map((msg) => {
              const isAdmin = msg.author === 'Cronan Admin' || msg.author === 'Mayor / City Admin';
              
              return (
                <motion.div 
                  key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: '1rem', position: 'relative', background: '#111', padding: '1.5rem', borderRadius: '12px', border: isAdmin ? '1px solid rgba(255,183,3,0.4)' : '1px solid #222' }}
                  onMouseLeave={() => setShowEmojiPicker(null)}
                >
                  {/* Avatar */}
                  <Link href={`/user/${msg.uid}`} style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#222', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: isAdmin ? '2px solid var(--primary)' : '1px solid #444', backgroundImage: msg.photoURL ? `url(${msg.photoURL})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', textDecoration: 'none' }}>
                    {!msg.photoURL && <span style={{ color: '#666', fontSize: '1.2rem', fontWeight: 'bold' }}>{(msg.author || 'R').charAt(0).toUpperCase()}</span>}
                  </Link>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Link href={`/user/${msg.uid}`} style={{ color: isAdmin ? 'var(--primary)' : '#fff', fontFamily: 'var(--font-oswald)', fontSize: '1.1rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {msg.author || 'Roman'}
                          {msg.location && <span style={{ color: msg.location === userLocation ? 'var(--primary)' : '#666', fontSize: '0.75rem', fontFamily: 'var(--font-space)', fontWeight: 'normal' }}>• {msg.location}</span>}
                          {isAdmin && <span style={{ background: 'var(--primary)', color: '#000', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>OFFICIAL</span>}
                        </Link>
                        <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'var(--font-space)', marginTop: '0.2rem' }}>
                           {(typeof msg.timestamp?.toMillis === 'function') ? new Date(msg.timestamp.toMillis()).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                        </div>
                      </div>
                      
                      {!isGuest && (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button onClick={() => setReplyingTo({ id: msg.id, author: msg.author, text: msg.text })} style={{ background:'none', border:'none', color:'#888', cursor:'pointer', transition: 'color 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseOut={(e)=>e.currentTarget.style.color='#888'} title="Reply"><CornerUpLeft size={18} /></button>
                          <button onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)} style={{ background:'none', border:'none', color:'#888', cursor:'pointer', transition: 'color 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.color='var(--primary)'} onMouseOut={(e)=>e.currentTarget.style.color='#888'} title="React"><Smile size={18} /></button>
                        </div>
                      )}
                    </div>

                    {msg.replyTo && (
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', borderLeft: '3px solid var(--primary)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem', color: '#aaa', marginTop: '0.5rem' }}>
                        <strong style={{ color: 'var(--primary)' }}>@{msg.replyTo.author}: </strong>{msg.replyTo.text}
                      </div>
                    )}

                    {editingPostId === msg.id ? (
                      <div style={{ marginTop: '0.5rem' }}>
                        <textarea 
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                          style={{ width: '100%', background: '#000', border: '1px solid #333', color: '#fff', padding: '0.5rem', borderRadius: '8px', minHeight: '60px', fontFamily: 'inherit', fontSize: '1rem' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button onClick={() => handleEditSubmit(msg.id)} style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.25rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                          <button onClick={() => setEditingPostId(null)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', padding: '0.25rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: '#d4d4d8', fontSize: '1.1rem', lineHeight: '1.5', wordBreak: 'break-word', marginTop: '0.5rem', fontFamily: 'var(--font-space)' }}>
                        <ExpandableText text={msg.text} renderFn={renderMessageText} maxLength={150} />
                      </div>
                    )}
                    
                    {msg.imageUrl && (
                      <div style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
                        <img src={msg.imageUrl} alt="Attached" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
                      </div>
                    )}

                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                        {Object.entries(msg.reactions).map(([emoji, uids]) => {
                          if (!uids || uids.length === 0) return null;
                          const hasReacted = user?.uid ? uids.includes(user.uid) : false;
                          return (
                            <button 
                              key={emoji} 
                              onClick={() => handleReaction(msg.id, emoji, hasReacted)} 
                              disabled={isGuest}
                              style={{ background: hasReacted ? 'rgba(255,183,3,0.15)' : '#222', border: hasReacted ? '1px solid var(--primary)' : '1px solid #333', borderRadius: '16px', padding: '4px 10px', fontSize: '0.9rem', color: hasReacted ? 'var(--primary)' : '#fff', cursor: isGuest ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', opacity: isGuest ? 0.8 : 1 }}
                            >
                              <span>{emoji}</span><span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{uids.length}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    
                    {user && user.uid === msg.uid && !isGuest && (
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', borderTop: '1px solid #222', paddingTop: '0.5rem' }}>
                        <button onClick={() => { setEditingPostId(msg.id); setEditInput(msg.text); }} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', padding: 0 }}><Edit size={14} /> Edit</button>
                        <button onClick={() => handleDelete(msg.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', padding: 0 }}><Trash2 size={14} /> Delete</button>
                      </div>
                    )}
                  </div>

                  {/* Emoji Picker Popup */}
                  {showEmojiPicker === msg.id && (
                    <div style={{ position: 'absolute', top: '50px', right: '20px', background: '#222', border: '1px solid #444', borderRadius: '24px', padding: '0.5rem', display: 'flex', gap: '0.5rem', zIndex: 20, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                      {EMOJIS.map(emoji => (
                        <button key={emoji} onClick={() => handleReaction(msg.id, emoji, msg.reactions?.[emoji]?.includes(user?.uid))} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', transition: 'transform 0.1s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            });
            })()}
          </div>
        </div>

        {/* RIGHT/ACTIVE TAB COLUMN (Desktop replaces third col, Mobile renders entirely replacing Feed) */}
        <div className={activeTab === 'trails' || activeTab === 'renovations' || activeTab === 'company' || activeTab === 'marketplace' ? 'mobile-visible-flex desktop-sidebar-right' : 'mobile-hidden desktop-sidebar-right'} style={{ 
          width: '350px', 
          flexShrink: 0, 
          borderLeft: '1px solid #222', 
          background: '#0a0a0a',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ display: activeTab === 'feed' || activeTab === 'company' ? 'block' : 'none', height: '100%', padding: '1.5rem' }}>
              <div style={{ background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award color="var(--primary)" size={20} /> Company of the Month
                </h3>
                <p style={{ color: '#d4d4d8', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                  Highlighting local businesses for their contributions to the city of Rome.
                </p>
                <div style={{ background: '#222', borderRadius: '8px', padding: '1rem', border: '1px solid var(--primary)', textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)', fontSize: '1.1rem' }}>Nailed It Property Solutions</h4>
                  <p style={{ margin: '0 0 1rem 0', color: '#888', fontSize: '0.8rem', lineHeight: '1.4' }}>Selected for exceptional community service and local dedication.</p>
                  
                  <div style={{ fontSize: '0.75rem', color: '#666', borderTop: '1px solid #333', paddingTop: '0.75rem' }}>
                    Feature suggestion by:<br/>
                    <strong style={{ color: '#888' }}>Charles Willis</strong>
                  </div>
                </div>
              </div>

              <div style={{ background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BarChart2 color="var(--primary)" size={20} /> Upcoming Poll
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                  Voting for next month's featured company will open during the final week of this month.
                </p>
              </div>
            </div>
            
            <div style={{ display: activeTab === 'trails' ? 'block' : 'none', height: '100%' }}>
              <TrailsPortal user={user} />
            </div>
            <div style={{ display: activeTab === 'renovations' ? 'block' : 'none', height: '100%' }}>
              <RenovationsBoard user={user} />
            </div>
            <div style={{ display: activeTab === 'marketplace' ? 'flex' : 'none', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <ShoppingCart size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-oswald)', marginBottom: '0.5rem' }}>Rome Marketplace</h2>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.5' }}>Coming soon! Buy, sell, and trade goods with your local Roman neighbors.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Global CSS Overrides for Responsive Behavior */}
      <style dangerouslySetInnerHTML={{__html: `
        .desktop-sidebar-left { display: flex; }
        .desktop-sidebar-right { display: flex; }
        .mobile-visible-flex { display: none !important; }
        .mobile-hidden { display: flex; }
        
        @media (max-width: 1023px) {
          .desktop-sidebar-left { display: none !important; }
          .desktop-only { display: none !important; }
          .desktop-sidebar-right {
            width: 100% !important;
            border-left: none !important;
          }
          .mobile-visible-flex { display: flex !important; }
          .mobile-hidden { display: none !important; }
          .desktop-only-btn { display: none !important; }
          
          .post-modal-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            background: rgba(0,0,0,0.9) !important;
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 0 !important;
          }
          .post-modal-container > div {
            border-radius: 24px 24px 0 0 !important;
            border-bottom: none !important;
            padding-bottom: 3rem !important;
          }
        }
        @media (min-width: 1024px) {
          .mobile-nav { display: none !important; }
          .mobile-only-header { display: none !important; }
          .mobile-visible-flex { display: flex !important; }
          .mobile-hidden { display: flex !important; }
        }
      `}} />

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-nav" style={{ 
        display: 'flex', justifyContent: 'space-around', alignItems: 'center', 
        background: '#111', borderTop: '1px solid #333', padding: '0.75rem', 
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))', flexShrink: 0,
        zIndex: 40
      }}>
        <button onClick={() => { setActiveTab('feed'); setShowPostModal(false); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'feed' ? 'var(--primary)' : '#888', cursor: 'pointer' }}>
          <Home size={22} />
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-oswald)' }}>Feed</span>
        </button>
        <button onClick={() => { setActiveTab('trails'); setShowPostModal(false); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'trails' ? 'var(--primary)' : '#888', cursor: 'pointer' }}>
          <Map size={22} />
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-oswald)' }}>Trails</span>
        </button>
        
        {/* Floating Create Action Button */}
        <button onClick={() => setShowPostModal(true)} style={{ background: 'var(--primary)', border: 'none', width: '50px', height: '50px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', cursor: 'pointer', transform: 'translateY(-10px)', boxShadow: '0 4px 15px rgba(255, 183, 3, 0.4)' }}>
          <Plus size={28} />
        </button>

        <button onClick={() => { setActiveTab('renovations'); setShowPostModal(false); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'renovations' ? 'var(--primary)' : '#888', cursor: 'pointer' }}>
          <Building size={22} />
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-oswald)' }}>Projects</span>
        </button>
        <button onClick={() => { setActiveTab('marketplace'); setShowPostModal(false); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeTab === 'marketplace' ? 'var(--primary)' : '#888', cursor: 'pointer' }}>
          <ShoppingCart size={22} />
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-oswald)' }}>Market</span>
        </button>
        <Link href="/romans-chat/messages" style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#888', textDecoration: 'none', cursor: 'pointer' }}>
          <MessageSquare size={22} />
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-oswald)' }}>Messages</span>
        </Link>
      </div>

    </div>
  );
}
