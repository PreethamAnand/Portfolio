import React from 'react';

const GlowBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Base black background */}
      <div className="absolute inset-0 bg-[#050505]"></div>
      
      {/* Subtle radial glows */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20"
        style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }}
      ></div>
      
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-10"
        style={{ background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 70%)' }}
      ></div>
      
      <div 
        className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full blur-[90px] opacity-10"
        style={{ background: 'radial-gradient(circle, var(--glow-green) 0%, transparent 70%)' }}
      ></div>

      {/* Lightweight CSS Stars pattern (Optional based on performance) */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>
    </div>
  );
};

export default GlowBackground;
