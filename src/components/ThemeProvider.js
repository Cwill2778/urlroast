'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ThemeProvider({ children }) {
  const [themeColor, setThemeColor] = useState('#ffb703'); // Default Amber
  const [textSize, setTextSize] = useState('16px'); // Default

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.themeColor) setThemeColor(data.themeColor);
            
            if (data.textSize) {
              if (data.textSize === 'small') setTextSize('14px');
              else if (data.textSize === 'large') setTextSize('18px');
              else if (data.textSize === 'xlarge') setTextSize('20px');
              else setTextSize('16px');
            }
          }
        } catch (error) {
          console.error("Error fetching user theme:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Update CSS Variables on mount and state change
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', themeColor);
    
    // Add alpha for glow effect (hex shorthand)
    let glowColor = themeColor;
    if (themeColor.length === 7) glowColor = themeColor + '66'; // 40% opacity
    document.documentElement.style.setProperty('--primary-glow', glowColor); 
    
    // Scale font size at root to cascade rems
    document.documentElement.style.fontSize = textSize;
  }, [themeColor, textSize]);

  // Expose an event listener to immediately update theme on profile save without refreshing
  useEffect(() => {
    const handleThemeUpdate = (e) => {
      if (e.detail?.color) setThemeColor(e.detail.color);
      if (e.detail?.size) {
        if (e.detail.size === 'small') setTextSize('14px');
        else if (e.detail.size === 'large') setTextSize('18px');
        else if (e.detail.size === 'xlarge') setTextSize('20px');
        else setTextSize('16px');
      }
    };
    window.addEventListener('update-theme', handleThemeUpdate);
    return () => window.removeEventListener('update-theme', handleThemeUpdate);
  }, []);

  return <>{children}</>;
}
