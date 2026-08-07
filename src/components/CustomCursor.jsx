import React, { useState, useEffect } from 'react';

export default function CustomCursor(){
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return(
    <div 
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{transform:`translate3d(${position.x-40}px, ${position.y-40}px, 0)`}}
    > 
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-300 opacity-80 blur-[20px]" />
    </div>
  )
}