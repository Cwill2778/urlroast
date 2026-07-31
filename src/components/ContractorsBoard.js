import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

export default function ContractorsBoard({ user }) {
  const [contractors, setContractors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const [availability, setAvailability] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'contractors'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContractors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'contractors'), {
        uid: user.uid,
        displayName: user.displayName || 'Roman',
        photoURL: user.photoURL || null,
        availability,
        specialty,
        phone,
        comments,
        timestamp: serverTimestamp()
      });
      setShowForm(false);
      setAvailability('');
      setSpecialty('');
      setPhone('');
      setComments('');
    } catch (error) {
      console.error("Error adding contractor:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f0f0f', borderLeft: '1px solid #222' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontFamily: 'var(--font-oswald)' }}>Contractors</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-oswald)' }}
        >
          {showForm ? 'Cancel' : 'Add My Info'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem', fontFamily: 'var(--font-oswald)' }}>Offer Services</h3>
            <input placeholder="Specialty (e.g. Plumbing, HVAC)" value={specialty} onChange={e => setSpecialty(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input placeholder="Availability (Days & Times)" value={availability} onChange={e => setAvailability(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <input placeholder="Phone Number (Optional)" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <textarea placeholder="Comments / Description" value={comments} onChange={e => setComments(e.target.value)} style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '60px', fontFamily: 'inherit' }} />
            <button type="submit" style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
          </form>
        )}

        {contractors.length === 0 && !showForm && (
          <div style={{ color: '#666', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-space)' }}>No contractors listed yet.</div>
        )}

        {contractors.map(c => (
          <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#222',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #444',
                backgroundImage: c.photoURL ? `url(${c.photoURL})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                {!c.photoURL && <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'bold' }}>{c.displayName.charAt(0).toUpperCase()}</span>}
              </div>
              <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontFamily: 'var(--font-oswald)' }}>{c.displayName}</div>
            </div>
            
            <div style={{ color: '#aaa', fontSize: '0.8rem', fontFamily: 'var(--font-space)', marginBottom: '0.5rem' }}>{c.specialty}</div>
            
            {c.comments && <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{c.comments}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: '#888', fontFamily: 'var(--font-space)' }}>
              <span>🕒 {c.availability}</span>
              {c.phone && <span>📞 {c.phone}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
