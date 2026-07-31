'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function RomanExchangeProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [displayName, setDisplayName] = useState('');
  const [location, setLocation] = useState('Downtown');
  const [emailVisible, setEmailVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(true);
  const [photoURL, setPhotoURL] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  // Auth & Data Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/romans-chat/login');
      } else {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        
        // Fetch extra profile data
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.location) setLocation(data.location);
          if (data.emailVisible !== undefined) setEmailVisible(data.emailVisible);
          if (data.locationVisible !== undefined) setLocationVisible(data.locationVisible);
          if (data.photoURL) setPhotoURL(data.photoURL);
        } else if (currentUser.photoURL) {
          setPhotoURL(currentUser.photoURL);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    
    try {
      let newPhotoURL = photoURL;
      
      // Upload new photo if selected
      if (photoFile) {
        const fileRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(fileRef, photoFile);
        newPhotoURL = await getDownloadURL(fileRef);
      }

      await updateProfile(user, { displayName, photoURL: newPhotoURL });
      
      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        email: user.email,
        location,
        emailVisible,
        locationVisible,
        photoURL: newPhotoURL,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setPhotoURL(newPhotoURL);
      setPhotoFile(null);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert('Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
        LOADING PROFILE...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-oswald)', padding: '2rem' }}>
      
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>Edit Profile</h1>
        <Link href="/romans-chat" style={{ color: 'var(--primary)', textDecoration: 'none', fontFamily: 'var(--font-space)' }}>← Back to Chat</Link>
      </header>

      <motion.form 
        onSubmit={handleSave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          background: '#111', 
          padding: '2rem', 
          borderRadius: '16px', 
          border: '1px solid #333',
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: '#222', 
            border: '2px solid var(--primary)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: photoFile ? `url(${URL.createObjectURL(photoFile)})` : (photoURL ? `url(${photoURL})` : 'none'),
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
            {!photoFile && !photoURL && <span style={{ color: '#666', fontSize: '2rem' }}>?</span>}
          </div>
          
          <label style={{
            background: '#222',
            color: '#d4d4d8',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            border: '1px solid #444',
            fontFamily: 'var(--font-space)'
          }}>
            Change Profile Picture
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files[0]) {
                  setPhotoFile(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Display Name</label>
          <input 
            type="text" 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.9rem' }}>Location (Side of Town)</label>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Privacy Settings</h3>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d4d4d8' }}>
            <input 
              type="checkbox" 
              checked={emailVisible}
              onChange={(e) => setEmailVisible(e.target.checked)}
              style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }}
            />
            Show Email to other Romans
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d4d4d8' }}>
            <input 
              type="checkbox" 
              checked={locationVisible}
              onChange={(e) => setLocationVisible(e.target.checked)}
              style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }}
            />
            Show Location to other Romans
          </label>
        </div>

        <button 
          type="submit"
          disabled={saving}
          style={{
            background: 'var(--primary)',
            color: '#000',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            marginTop: '1rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </motion.form>
    </div>
  );
}
