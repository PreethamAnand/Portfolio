import React, { useEffect, useRef } from 'react';

const orbitalData = [
  // Ring 1 (Inner, Radius 300px)
  { ring: 1, label: 'PostgreSQL', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', angle: 0, glow: 'rgba(51, 103, 145, 0.6)' },
  { ring: 1, label: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', angle: 51.4, glow: 'rgba(97, 218, 251, 0.6)' },
  { ring: 1, label: 'TypeScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', angle: 102.8, glow: 'rgba(49, 120, 198, 0.6)' },
  { ring: 1, label: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', angle: 154.2, glow: 'rgba(83, 158, 67, 0.6)' },
  { ring: 1, label: 'TensorFlow', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', angle: 205.7, glow: 'rgba(255, 111, 0, 0.6)' },
  { ring: 1, label: 'ChromaDB', text: '🔮', angle: 257.1, glow: 'rgba(139, 92, 246, 0.6)' },
  { ring: 1, label: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', angle: 308.5, glow: 'rgba(36, 150, 237, 0.6)' },

  // Ring 2 (Outer, Radius 420px)
  { ring: 2, label: 'FastAPI', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', angle: 0, glow: 'rgba(0, 150, 136, 0.6)' },
  { ring: 2, label: 'Three.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg', angle: 51.4, glow: 'rgba(255, 255, 255, 0.6)' },
  { ring: 2, label: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', angle: 102.8, glow: 'rgba(55, 118, 171, 0.6)' },
  { ring: 2, label: 'LangChain', text: '🦜🔗', angle: 154.2, glow: 'rgba(255, 255, 255, 0.4)' },
  { ring: 2, label: 'LangGraph', text: '🕸️', angle: 205.7, glow: 'rgba(255, 255, 255, 0.4)' },
  { ring: 2, label: 'RAG', text: '🧠', angle: 257.1, glow: 'rgba(236, 72, 153, 0.6)' },
  { ring: 2, label: 'GSAP', text: 'GSAP', isGsap: true, angle: 308.5, glow: 'rgba(136, 206, 2, 0.6)' },
];

const OrbitalSystem = () => {
  const systemRef = useRef(null);

  useEffect(() => {
    // Media query to check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let requestRef;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Calculate rotation degrees (subtle parallax)
      targetX = (clientX - centerX) * 0.03;
      targetY = (clientY - centerY) * 0.03;
    };

    const animate = () => {
      // Lerp for smooth parallax
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (systemRef.current) {
        // Determine base scale based on screen size
        let baseScale = 0.85;
        if (window.innerWidth <= 767) {
          baseScale = 0.38;
        } else if (window.innerWidth <= 1024) {
          baseScale = 0.45;
        } else if (window.innerWidth <= 1366) {
          baseScale = 0.60;
        }
        
        // Add a base tilt of 65 degrees to create the oval perspective
        const tiltX = 65 - currentY;
        
        systemRef.current.style.transform = `translate(-50%, -50%) scale(${baseScale}) rotateX(${tiltX}deg) rotateY(${currentX}deg)`;
      }
      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  const getRadius = (ring) => {
    return ring === 1 ? 400 : 550;
  };

  const renderOrbitItems = (ringNumber) => {
    return orbitalData
      .filter((item) => item.ring === ringNumber)
      .map((item, index) => {
        const radius = getRadius(ringNumber);
        // Calculate standard circle position (X, Y)
        const x = Math.cos((item.angle * Math.PI) / 180) * radius;
        const y = Math.sin((item.angle * Math.PI) / 180) * radius;

        return (
          <div 
            key={`${ringNumber}-${index}`}
            className="orbit-item"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <div className={`orbit-counter-rotate inner-ring-${ringNumber}`}>
              {/* Counter-rotate the 3D tilt so nodes stand upright */}
              <div style={{ transform: 'rotateX(-65deg)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  className="orbit-node" 
                  style={{ 
                    boxShadow: `0 0 25px ${item.glow}`, 
                    border: `1.5px solid ${item.glow}`,
                    background: 'rgba(5, 5, 10, 0.95)'
                  }}
                >
                  {item.img ? (
                    <img src={item.img} alt={item.label} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                  ) : item.isGsap ? (
                    <span style={{ color: '#88CE02', fontWeight: '900', fontStyle: 'italic', fontSize: '14px', textShadow: '0 0 5px #88CE02' }}>{item.text}</span>
                  ) : (
                    <span style={{ fontSize: '24px' }}>{item.text}</span>
                  )}
                </div>
                <span className="orbit-label" style={{ color: '#ffffff', marginTop: '12px' }}>{item.label}</span>
              </div>
            </div>
          </div>
        );
      });
  };

  return (
    <>
      <div className="orbital-system-container" ref={systemRef}>
        
        {/* Decorative particles */}
        <div className="orbital-particle p1"></div>
        <div className="orbital-particle p2"></div>
        <div className="orbital-particle p3"></div>
        <div className="orbital-particle p4"></div>
        <div className="orbital-particle p5"></div>

        {/* Ring 1 (Inner) */}
        <div className="orbit-ring orbit-ring-1">
          {renderOrbitItems(1)}
        </div>

        {/* Ring 2 (Outer) */}
        <div className="orbit-ring orbit-ring-2">
          {renderOrbitItems(2)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .orbital-system-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1200px;
          height: 1200px;
          pointer-events: none; /* Let clicks pass to the main hero content/character */
          transform-style: preserve-3d;
          z-index: 0;
        }

        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1.5px solid rgba(168, 85, 247, 0.35); /* Pink/purple base */
          transform-style: preserve-3d;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.15), inset 0 0 15px rgba(168, 85, 247, 0.15);
        }

        /* 400px Radius */
        .orbit-ring-1 {
          width: 800px;
          height: 800px;
          margin-top: -400px;
          margin-left: -400px;
          animation: orbit-cw 60s linear infinite;
        }

        /* 550px Radius */
        .orbit-ring-2 {
          width: 1100px;
          height: 1100px;
          margin-top: -550px;
          margin-left: -550px;
          animation: orbit-ccw 55s linear infinite;
        }

        @keyframes orbit-cw {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        @keyframes orbit-ccw {
          0% { transform: rotateZ(360deg); }
          100% { transform: rotateZ(0deg); }
        }

        /* Items on the rings */
        .orbit-item {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 64px;
          height: 64px;
          margin-top: -32px;
          margin-left: -32px;
          pointer-events: auto; /* Re-enable pointer events for hover */
        }

        /* The container that counter-rotates to stay upright */
        .orbit-counter-rotate {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* The actual glowing icon node */
        .orbit-node {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          backdrop-filter: blur(8px);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          z-index: 5;
        }

        .orbit-node:hover {
          transform: scale(1.2);
          z-index: 10;
        }

        /* Always-visible plain text label below the node */
        .orbit-label {
          white-space: nowrap;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          pointer-events: none;
          z-index: 6;
        }

        /* Counter-rotation to keep icons upright */
        .inner-ring-1 { animation: counter-cw 60s linear infinite; }
        .inner-ring-2 { animation: counter-ccw 55s linear infinite; }

        @keyframes counter-cw {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(-360deg); }
        }
        @keyframes counter-ccw {
          0% { transform: rotateZ(-360deg); }
          100% { transform: rotateZ(0deg); }
        }
        
        /* Pause animations on hover */
        .orbit-ring:hover {
          animation-play-state: paused;
        }
        .orbit-ring:hover .orbit-counter-rotate {
          animation-play-state: paused;
        }

        /* Ambient particles scattered around */
        .orbital-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
        }
        .p1 { width: 4px; height: 4px; top: 15%; left: 35%; animation: float 5s ease-in-out infinite; opacity: 0.6; }
        .p2 { width: 6px; height: 6px; top: 70%; left: 85%; animation: float 7s ease-in-out infinite 1s; opacity: 0.8; background: #8B5CF6; box-shadow: 0 0 15px #8B5CF6; }
        .p3 { width: 5px; height: 5px; top: 85%; left: 20%; animation: float 6s ease-in-out infinite 2s; opacity: 0.5; }
        .p4 { width: 3px; height: 3px; top: 40%; left: 10%; animation: float 8s ease-in-out infinite 0.5s; opacity: 0.7; }
        .p5 { width: 7px; height: 7px; top: 25%; left: 80%; animation: float 9s ease-in-out infinite 1.5s; opacity: 0.4; background: #FF6F00; box-shadow: 0 0 15px #FF6F00; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-counter-rotate, .orbital-particle {
            animation: none !important;
          }
        }
      `}} />
    </>
  );
};

export default OrbitalSystem;
