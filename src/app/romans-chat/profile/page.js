'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Settings, User, Lock, Palette, Eye, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function RomanExchangeProfile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('Downtown');
  
  // Preferences State
  const [themeColor, setThemeColor] = useState('#ffb703');
  const [textSize, setTextSize] = useState('default');
  
  // Privacy State
  const [emailVisible, setEmailVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(true);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [birthdayVisible, setBirthdayVisible] = useState(false);
  
  // Photo State
  const [photoURL, setPhotoURL] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  const THEME_COLORS = [
    { name: 'Amber', hex: '#ffb703' },
    { name: 'Matrix', hex: '#00ff41' },
    { name: 'Cyber', hex: '#00e5ff' },
    { name: 'Crimson', hex: '#ef4444' },
    { name: 'Pure', hex: '#ffffff' }
  ];

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
          if (data.firstName) setFirstName(data.firstName);
          if (data.lastName) setLastName(data.lastName);
          if (data.birthday) setBirthday(data.birthday);
          if (data.phone) setPhone(data.phone);
          if (data.bio) setBio(data.bio);
          if (data.location) setLocation(data.location);
          if (data.themeColor) setThemeColor(data.themeColor);
          if (data.textSize) setTextSize(data.textSize);
          
          if (data.emailVisible !== undefined) setEmailVisible(data.emailVisible);
          if (data.locationVisible !== undefined) setLocationVisible(data.locationVisible);
          if (data.phoneVisible !== undefined) setPhoneVisible(data.phoneVisible);
          if (data.birthdayVisible !== undefined) setBirthdayVisible(data.birthdayVisible);
          
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
        firstName,
        lastName,
        displayName,
        email: user.email,
        birthday,
        phone,
        bio,
        location,
        themeColor,
        textSize,
        emailVisible,
        locationVisible,
        phoneVisible,
        birthdayVisible,
        photoURL: newPhotoURL,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      // Dispatch event to ThemeProvider to update UI immediately
      window.dispatchEvent(new CustomEvent('update-theme', { 
        detail: { color: themeColor, size: textSize } 
      }));
      
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

  const handlePasswordReset = async () => {
    if (!user || !user.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setResetSent(true);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Error sending reset email:", error);
      alert("Failed to send reset email.");
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
        LOADING SETTINGS...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-oswald)' }}>
      
      {/* Header */}
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/romans-chat" style={{ color: '#888', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={18} /> ACCOUNT SETTINGS
        </h1>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Top Section: Avatar & Quick Actions */}
          <section style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Avatar Card */}
            <div style={{ flex: '1 1 300px', background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
              <div style={{ 
                width: '120px', height: '120px', borderRadius: '50%', background: '#222', 
                border: '3px solid var(--primary)', overflow: 'hidden', display: 'flex', 
                alignItems: 'center', justifyContent: 'center',
                backgroundImage: photoFile ? `url(${URL.createObjectURL(photoFile)})` : (photoURL ? `url(${photoURL})` : 'none'),
                backgroundSize: 'cover', backgroundPosition: 'center',
                boxShadow: '0 0 20px var(--primary-glow)'
              }}>
                {!photoFile && !photoURL && <User size={48} color="#666" />}
              </div>
              
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{displayName || 'New Roman'}</h2>
                <p style={{ color: '#888', fontFamily: 'var(--font-space)', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>{user.email}</p>
              </div>

              <label style={{
                background: 'rgba(255, 255, 255, 0.05)', color: '#fff', padding: '0.75rem 1.5rem',
                borderRadius: '8px', cursor: 'pointer', border: '1px solid #444', fontFamily: 'var(--font-space)', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
              }}>
                <ImageIcon size={16} /> Change Avatar
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { if (e.target.files[0]) setPhotoFile(e.target.files[0]); }} />
              </label>
            </div>

            {/* Account Security */}
            <div style={{ flex: '2 1 400px', background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid #333' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>
                <Lock size={20} color="var(--primary)" /> Security & Access
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Email Address</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <input type="email" value={user.email} disabled style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #333', background: '#0a0a0a', color: '#666' }} />
                    <button type="button" onClick={() => alert("To update your email securely, please contact support.")} style={{ background: '#222', color: '#fff', border: '1px solid #444', padding: '0 1rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-space)' }}>Update</button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Password</label>
                  <button type="button" onClick={handlePasswordReset} disabled={resetSent} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: resetSent ? 'default' : 'pointer', fontFamily: 'var(--font-space)', fontWeight: 'bold' }}>
                    {resetSent ? 'Reset Link Sent' : 'Send Password Reset Email'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Middle Section: Personal Info */}
          <section style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid #333' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>
              <User size={20} color="var(--primary)" /> Personal Dossier
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>Display Name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>Location (Side of Town)</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}>
                  <option value="West Rome">West Rome</option>
                  <option value="East Rome">East Rome</option>
                  <option value="North Rome">North Rome</option>
                  <option value="South Rome">South Rome</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Floyd County">Floyd County</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>Birthday</label>
                <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
              <label style={{ color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem' }}>Bio / Description</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell Rome about yourself..." rows={4} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff', resize: 'vertical' }} />
            </div>
          </section>

          {/* Bottom Section: Preferences & Privacy */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            
            {/* Preferences */}
            <section style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid #333' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>
                <Palette size={20} color="var(--primary)" /> Accessibility & Theming
              </h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem', marginBottom: '1rem' }}>Accent Color</label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {THEME_COLORS.map(color => (
                    <button 
                      key={color.hex}
                      type="button"
                      onClick={() => setThemeColor(color.hex)}
                      style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', background: color.hex, 
                        border: themeColor === color.hex ? '3px solid #fff' : 'none', cursor: 'pointer',
                        boxShadow: themeColor === color.hex ? `0 0 15px ${color.hex}` : 'none',
                        transition: 'all 0.2s'
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#a1a1aa', fontFamily: 'var(--font-space)', fontSize: '0.85rem', marginBottom: '1rem' }}>Text Size</label>
                <select value={textSize} onChange={(e) => setTextSize(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #444', background: '#0a0a0a', color: '#fff' }}>
                  <option value="small">Small</option>
                  <option value="default">Default</option>
                  <option value="large">Large (+1)</option>
                  <option value="xlarge">Extra Large (+2)</option>
                </select>
              </div>
            </section>

            {/* Privacy Settings */}
            <section style={{ background: '#111', padding: '2rem', borderRadius: '16px', border: '1px solid #333' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>
                <Eye size={20} color="var(--primary)" /> Privacy Settings
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Choose what information is visible on your public dossier.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#d4d4d8', cursor: 'pointer' }}>
                  <input type="checkbox" checked={emailVisible} onChange={(e) => setEmailVisible(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }} />
                  Show Email Address
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#d4d4d8', cursor: 'pointer' }}>
                  <input type="checkbox" checked={locationVisible} onChange={(e) => setLocationVisible(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }} />
                  Show Location (Side of Town)
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#d4d4d8', cursor: 'pointer' }}>
                  <input type="checkbox" checked={phoneVisible} onChange={(e) => setPhoneVisible(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }} />
                  Show Phone Number
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#d4d4d8', cursor: 'pointer' }}>
                  <input type="checkbox" checked={birthdayVisible} onChange={(e) => setBirthdayVisible(e.target.checked)} style={{ accentColor: 'var(--primary)', width: '1.2rem', height: '1.2rem' }} />
                  Show Birthday
                </label>
              </div>
            </section>

          </div>

          {/* Submit Action */}
          <div style={{ position: 'sticky', bottom: '1rem', zIndex: 20, display: 'flex', justifyContent: 'center' }}>
            <button 
              type="submit"
              disabled={saving}
              style={{
                background: 'var(--primary)', color: '#000', border: 'none', padding: '1rem 3rem',
                borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem', cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.7 : 1, boxShadow: '0 10px 25px var(--primary-glow)', letterSpacing: '0.05em'
              }}
            >
              {saving ? 'SAVING CHANGES...' : 'SAVE ALL SETTINGS'}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}
