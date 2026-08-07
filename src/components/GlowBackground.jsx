import React from 'react';

const GlowBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Base black background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'var(--bg-primary)' }}></div>
      
      {/* Subtle radial glows */}
      <div 
        style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '50vw', 
          height: '50vw', 
          borderRadius: '50%', 
          filter: 'blur(100px)', 
          opacity: 0.6,
          background: 'radial-gradient(circle, var(--bg-emerald) 0%, transparent 70%)' 
        }}
      ></div>
      
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '-10%', 
          left: '-10%', 
          width: '50vw', 
          height: '50vw', 
          borderRadius: '50%', 
          filter: 'blur(120px)', 
          opacity: 0.2,
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' 
        }}
      ></div>

      {/* Lightweight CSS Stars pattern */}
      <div 
        style={{ 
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.15,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>
    </div>
  );
};

export default GlowBackground;
