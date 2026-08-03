import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Map, Footprints, Clock } from 'lucide-react';

const TRAILS = [
  { id: 'heritage', name: 'Heritage Trail System', desc: 'Riverfront walk covering downtown Rome.', dist: '2.5 mi', type: 'Paved', shade: 'Partial' },
  { id: 'berry', name: 'Berry College Viking Trail', desc: 'Beautiful house-a-day loop.', dist: '3.0 mi', type: 'Paved/Dirt', shade: 'Heavy' },
  { id: 'jackson', name: 'Jackson Hill Historic Trails', desc: 'Winding dirt trails with historic markers.', dist: '1.8 mi', type: 'Dirt', shade: 'Heavy' },
];

export default function TrailsPortal({ user }) {
  const [logs, setLogs] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState('heritage');
  const [comments, setComments] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'trail_logs'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleLogWalk = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const trail = TRAILS.find(t => t.id === selectedTrail);
      await addDoc(collection(db, 'trail_logs'), {
        uid: user.uid,
        displayName: user.displayName || 'Roman',
        photoURL: user.photoURL || null,
        trailId: selectedTrail,
        trailName: trail.name,
        comments,
        timestamp: serverTimestamp()
      });
      setShowLogModal(false);
      setComments('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f0f0f', borderLeft: '1px solid #222' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #222', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Map color="var(--primary)" size={20} />
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontFamily: 'var(--font-oswald)' }}>Where I May Rome</h2>
        </div>
        <button 
          onClick={() => setShowLogModal(!showLogModal)}
          style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'var(--font-oswald)' }}
        >
          {showLogModal ? 'Cancel' : 'Log Walk'}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showLogModal && (
          <form onSubmit={handleLogWalk} style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1rem', fontFamily: 'var(--font-oswald)' }}>Log a Completed Trail</h3>
            <select value={selectedTrail} onChange={e => setSelectedTrail(e.target.value)} style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}>
              {TRAILS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <textarea placeholder="How was the walk? (Optional)" value={comments} onChange={e => setComments(e.target.value)} style={{ padding: '0.5rem', background: '#0a0a0a', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '60px', fontFamily: 'inherit' }} />
            <button type="submit" style={{ background: 'var(--primary)', color: '#000', border: 'none', padding: '0.5rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Submit Check-in</button>
          </form>
        )}

        {/* Static Trail Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {TRAILS.map(t => (
            <div key={t.id} style={{ background: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
              <h4 style={{ margin: '0 0 0.25rem 0', color: '#fff', fontSize: '1rem' }}>{t.name}</h4>
              <p style={{ margin: '0 0 0.75rem 0', color: '#aaa', fontSize: '0.85rem' }}>{t.desc}</p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--primary)', fontFamily: 'var(--font-space)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Footprints size={14}/> {t.dist}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14}/> {t.shade} Shade</span>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ color: '#fff', fontFamily: 'var(--font-oswald)', marginTop: '1rem', marginBottom: '0.5rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Recent Check-ins</h3>
        
        {logs.length === 0 && (
          <div style={{ color: '#666', textAlign: 'center', fontFamily: 'var(--font-space)', padding: '1rem' }}>No walks logged yet today.</div>
        )}

        {logs.map(log => (
          <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '0.75rem', background: '#1a1a1a', padding: '1rem', borderRadius: '8px', border: '1px solid #333' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: log.photoURL ? `url(${log.photoURL})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              {!log.photoURL && <span style={{ color: '#666', fontSize: '0.8rem', fontWeight: 'bold' }}>{log.displayName.charAt(0).toUpperCase()}</span>}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', color: '#fff' }}>
                <strong style={{ color: 'var(--primary)' }}>{log.displayName}</strong> walked the <strong>{log.trailName}</strong>
              </div>
              {log.comments && <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.25rem' }}>"{log.comments}"</div>}
              <div style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'var(--font-space)', marginTop: '0.25rem' }}>
                {log.timestamp ? new Date(log.timestamp.toMillis()).toLocaleString() : 'Just now'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
