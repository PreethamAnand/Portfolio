import React, { useState, useEffect } from 'react';

export default function CustomCursor(){
  const cursorRef = React.useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${mouseX - 40}px, ${mouseY - 40}px, 0)`;
          }
          animationFrameId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return(
    <div 
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ transform: 'translate3d(-100px, -100px, 0)', willChange: 'transform' }}
    > 
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-300 opacity-80" />
    </div>
  )
}