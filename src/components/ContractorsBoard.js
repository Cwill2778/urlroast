import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

export default function ContractorsBoard({ user }) {
  const [contractors, setContractors] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const [availability, setAvailability] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editAvailability, setEditAvailability] = useState('');
  const [editSpecialty, setEditSpecialty] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editComments, setEditComments] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'contractors'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContractors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Contractors board listener error:", error);
      setErrorMsg(error.message);
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
      setErrorMsg("Failed to add listing: " + error.message);
    }
  };

  const handleDelete = async (contractorId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteDoc(doc(db, 'contractors', contractorId));
    } catch (error) {
      console.error("Error deleting contractor:", error);
      setErrorMsg("Failed to delete listing: " + error.message);
    }
  };

  const startEditing = (contractor) => {
    setEditingId(contractor.id);
    setEditSpecialty(contractor.specialty);
    setEditAvailability(contractor.availability);
    setEditPhone(contractor.phone || '');
    setEditComments(contractor.comments || '');
  };

  const handleUpdate = async (e, contractorId) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'contractors', contractorId), {
        specialty: editSpecialty,
        availability: editAvailability,
        phone: editPhone,
        comments: editComments,
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error updating contractor:", error);
      setErrorMsg("Failed to update listing: " + error.message);
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

        {errorMsg && (
          <div style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {contractors.length === 0 && !showForm && !errorMsg && (
          <div style={{ color: '#666', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-space)' }}>No contractors listed yet.</div>
        )}

        {contractors.map(c => (
          <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
                  {!c.photoURL && <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'bold' }}>{(c.displayName || 'R').charAt(0).toUpperCase()}</span>}
                </div>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontFamily: 'var(--font-oswald)' }}>{c.displayName}</div>
              </div>
              
              {user && user.uid === c.uid && !user.isAnonymous && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => startEditing(c)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>Edit</button>
                  <button onClick={() => handleDelete(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}>Delete</button>
                </div>
              )}
            </div>
            
            {editingId === c.id ? (
              <form onSubmit={(e) => handleUpdate(e, c.id)} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <input placeholder="Specialty (e.g. Plumbing, HVAC)" value={editSpecialty} onChange={e => setEditSpecialty(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
                <input placeholder="Availability (Days & Times)" value={editAvailability} onChange={e => setEditAvailability(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
                <input placeholder="Phone Number (Optional)" value={editPhone} onChange={e => setEditPhone(e.target.value)} style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
                <textarea placeholder="Comments / Description" value={editComments} onChange={e => setEditComments(e.target.value)} style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '60px', fontFamily: 'inherit' }} />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Save</button>
                  <button type="button" onClick={() => setEditingId(null)} style={{ background: 'transparent', color: '#fff', border: '1px solid #444', padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div style={{ color: '#aaa', fontSize: '0.8rem', fontFamily: 'var(--font-space)', marginBottom: '0.5rem' }}>{c.specialty}</div>
                {c.comments && <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{c.comments}</div>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: '#888', fontFamily: 'var(--font-space)' }}>
                  <span>🕒 {c.availability}</span>
                  {c.phone && <span>📞 {c.phone}</span>}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
