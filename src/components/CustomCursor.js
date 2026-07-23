'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: mousePosition.x - (isHovering ? 20 : 10),
        y: mousePosition.y - (isHovering ? 20 : 10),
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 183, 3, 0.2)' : 'rgba(255, 183, 3, 0.8)',
        border: isHovering ? '1px solid rgba(255, 183, 3, 0.8)' : '1px solid transparent',
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? 40 : 20,
        height: isHovering ? 40 : 20,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen'
      }}
    />
  );
}
