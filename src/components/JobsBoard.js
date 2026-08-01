import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';

export default function JobsBoard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'jobs'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Jobs board listener error:", error);
      setErrorMsg(error.message);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'jobs'), {
        uid: user.uid,
        displayName: user.displayName || 'Roman',
        photoURL: user.photoURL || null,
        budget,
        details,
        timeline,
        timestamp: serverTimestamp()
      });
      setShowForm(false);
      setBudget('');
      setDetails('');
      setTimeline('');
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f0f0f', borderRight: '1px solid #222' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontFamily: 'var(--font-oswald)' }}>Projects Available</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-oswald)' }}
        >
          {showForm ? 'Cancel' : 'Post Project'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showForm && (
          <form onSubmit={handleSubmit} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem', fontFamily: 'var(--font-oswald)' }}>Post a Project</h3>
            <input placeholder="Budget (e.g. $500)" value={budget} onChange={e => setBudget(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <textarea placeholder="Project Details" value={details} onChange={e => setDetails(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '80px', fontFamily: 'inherit' }} />
            <input placeholder="Timeline (e.g. Next week)" value={timeline} onChange={e => setTimeline(e.target.value)} required style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            <button type="submit" style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
          </form>
        )}

        {errorMsg && (
          <div style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '0.9rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {jobs.length === 0 && !showForm && !errorMsg && (
          <div style={{ color: '#666', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-space)' }}>No projects posted yet.</div>
        )}

        {jobs.map(job => (
          <motion.div key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
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
                backgroundImage: job.photoURL ? `url(${job.photoURL})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
                {!job.photoURL && <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'bold' }}>{job.displayName.charAt(0).toUpperCase()}</span>}
              </div>
              <div style={{ color: 'var(--primary)', fontWeight: 'bold', fontFamily: 'var(--font-oswald)' }}>{job.displayName}</div>
            </div>
            
            <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>{job.details}</div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#888', fontFamily: 'var(--font-space)' }}>
              <span>💰 {job.budget}</span>
              <span>📅 {job.timeline}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
