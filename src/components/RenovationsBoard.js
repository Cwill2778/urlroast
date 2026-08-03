import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Building, Camera, X } from 'lucide-react';

export default function RenovationsBoard({ user }) {
  const [updates, setUpdates] = useState([]);
  const [projectFilter, setProjectFilter] = useState('clocktower'); // 'clocktower' or 'courthouse'
  const [showForm, setShowForm] = useState(false);
  
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'renovations'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUpdates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || (!text.trim() && !imageFile)) return;
    
    setUploading(true);
    let imageUrl = null;
    try {
      if (imageFile) {
        const fileRef = ref(storage, `renovations/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(fileRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'renovations'), {
        uid: user.uid,
        displayName: user.displayName || 'Roman',
        photoURL: user.photoURL || null,
        project: projectFilter,
        text,
        imageUrl,
        timestamp: serverTimestamp()
      });
      
      setShowForm(false);
      setText('');
      setImageFile(null);
    } catch (error) {
      console.error("Error adding update:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f0f0f', borderLeft: '1px solid #222' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Building color="var(--primary)" size={20} />
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontFamily: 'var(--font-oswald)' }}>Civic Projects</h2>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-oswald)' }}
        >
          {showForm ? 'Cancel' : '+ Update'}
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #222', background: '#111' }}>
        <button 
          onClick={() => setProjectFilter('clocktower')}
          style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: projectFilter === 'clocktower' ? '2px solid var(--primary)' : '2px solid transparent', color: projectFilter === 'clocktower' ? 'var(--primary)' : '#888', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-oswald)' }}
        >
          Clocktower
        </button>
        <button 
          onClick={() => setProjectFilter('courthouse')}
          style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: projectFilter === 'courthouse' ? '2px solid var(--primary)' : '2px solid transparent', color: projectFilter === 'courthouse' ? 'var(--primary)' : '#888', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-oswald)' }}
        >
          Old Courthouse
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem', fontFamily: 'var(--font-oswald)' }}>Post {projectFilter === 'clocktower' ? 'Clocktower' : 'Courthouse'} Update</h3>
            <textarea placeholder="What's the status?" value={text} onChange={e => setText(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '60px', fontFamily: 'inherit' }} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) setImageFile(e.target.files[0]); }} />
              <button type="button" onClick={() => fileInputRef.current?.click()} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={18} /> Add Photo
              </button>
              {imageFile && <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{imageFile.name} <X size={12} onClick={()=>{setImageFile(null); if(fileInputRef.current) fileInputRef.current.value = '';}} style={{cursor:'pointer'}} color="#ef4444"/></span>}
            </div>
            
            <button type="submit" disabled={uploading} style={{ background: uploading ? '#333' : 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: uploading ? 'not-allowed' : 'pointer' }}>
              {uploading ? 'Uploading...' : 'Post Update'}
            </button>
          </form>
        )}

        {updates.filter(u => u.project === projectFilter).length === 0 && !showForm && (
          <div style={{ color: '#666', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-space)' }}>No updates posted yet.</div>
        )}

        {updates.filter(u => u.project === projectFilter).map(update => (
          <motion.div key={update.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: update.photoURL ? `url(${update.photoURL})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {!update.photoURL && <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'bold' }}>{update.displayName.charAt(0).toUpperCase()}</span>}
              </div>
              <div>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontFamily: 'var(--font-oswald)' }}>{update.displayName}</div>
                <div style={{ fontSize: '0.7rem', color: '#666', fontFamily: 'var(--font-space)' }}>
                  {update.timestamp ? new Date(update.timestamp.toMillis()).toLocaleString() : 'Just now'}
                </div>
              </div>
            </div>
            
            <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: '1.4', fontFamily: 'var(--font-space)' }}>{update.text}</div>
            
            {update.imageUrl && (
              <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                <img src={update.imageUrl} alt="Update" style={{ width: '100%', display: 'block', maxHeight: '250px', objectFit: 'cover' }} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
