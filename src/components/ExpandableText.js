'use client';

import { useState } from 'react';

export default function ExpandableText({ text, renderFn, maxLength = 150 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  if (text.length <= maxLength) {
    return <span>{renderFn(text)}</span>;
  }

  const displayText = isExpanded ? text : text.substring(0, maxLength) + '...';

  return (
    <span>
      {renderFn(displayText)}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--primary)', 
          cursor: 'pointer', 
          padding: '0 0 0 0.5rem', 
          fontSize: '0.9rem',
          fontWeight: 'bold',
          fontFamily: 'inherit'
        }}
      >
        {isExpanded ? 'Show less' : 'See more'}
      </button>
    </span>
  );
}
