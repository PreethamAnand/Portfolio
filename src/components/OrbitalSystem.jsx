import React, { useEffect, useRef } from 'react';
import { FaPython, FaReact, FaNodeJs, FaDocker, FaGithub, FaDatabase } from 'react-icons/fa';
import { SiTensorflow, SiFastapi } from 'react-icons/si';

const orbitalData = [
  // Inner Ring (radius 180px)
  { ring: 1, label: 'Python', icon: <FaPython size={28} color="#3776AB" />, angle: 0, glow: 'rgba(55, 118, 171, 0.6)' },
  { ring: 1, label: 'React', icon: <FaReact size={28} color="#61DAFB" />, angle: 90, glow: 'rgba(97, 218, 251, 0.6)' },
  { ring: 1, label: 'ML', text: 'ML', color: '#FF6F00', angle: 180, glow: 'rgba(255, 111, 0, 0.6)' },
  { ring: 1, label: 'Node.js', icon: <FaNodeJs size={28} color="#339933" />, angle: 270, glow: 'rgba(51, 153, 51, 0.6)' },

  // Middle Ring (radius 280px)
  { ring: 2, label: 'GenAI', text: 'GenAI', color: '#10B981', angle: 30, glow: 'rgba(16, 185, 129, 0.6)' },
  { ring: 2, label: 'RAG', text: 'RAG', color: '#8B5CF6', angle: 102, glow: 'rgba(139, 92, 246, 0.6)' },
  { ring: 2, label: 'FastAPI', icon: <SiFastapi size={26} color="#009688" />, angle: 174, glow: 'rgba(0, 150, 136, 0.6)' },
  { ring: 2, label: 'TensorFlow', icon: <SiTensorflow size={26} color="#FF6F00" />, angle: 246, glow: 'rgba(255, 111, 0, 0.6)' },
  { ring: 2, label: 'XGBoost', text: 'XGB', color: '#F39C12', angle: 318, glow: 'rgba(243, 156, 18, 0.6)' },

  // Outer Ring (radius 380px)
  { ring: 3, label: 'LangChain', text: '🔗', color: '#fff', angle: 0, glow: 'rgba(255, 255, 255, 0.4)' },
  { ring: 3, label: 'LangGraph', text: '🕸️', color: '#fff', angle: 51, glow: 'rgba(255, 255, 255, 0.4)' },
  { ring: 3, label: 'Three.js', text: '3D', color: '#ffffff', angle: 102, glow: 'rgba(255, 255, 255, 0.4)' },
  { ring: 3, label: 'GSAP', text: 'GSAP', color: '#88CE02', angle: 153, glow: 'rgba(136, 206, 2, 0.6)' },
  { ring: 3, label: 'ChromaDB', icon: <FaDatabase size={24} color="#2563EB" />, angle: 204, glow: 'rgba(37, 99, 235, 0.6)' },
  { ring: 3, label: 'Docker', icon: <FaDocker size={24} color="#2496ED" />, angle: 255, glow: 'rgba(36, 150, 237, 0.6)' },
  { ring: 3, label: 'GitHub', icon: <FaGithub size={24} color="#ffffff" />, angle: 306, glow: 'rgba(255, 255, 255, 0.4)' },
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
        systemRef.current.style.transform = `translate(-50%, -50%) rotateX(${-currentY}deg) rotateY(${currentX}deg)`;
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
    return ring === 1 ? 180 : ring === 2 ? 280 : 380;
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
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {/* The wrapper that counter-rotates to keep the icon and label upright */}
            <div className={`orbit-counter-rotate inner-ring-${ringNumber}`}>
              
              <div 
                className="orbit-node" 
                style={{ 
                  boxShadow: \`0 0 25px \${item.glow}\`, 
                  border: \`1.5px solid \${item.glow}\`,
                  background: 'rgba(5, 5, 10, 0.9)'
                }}
              >
                {item.icon ? (
                  item.icon
                ) : (
                  <span style={{ color: item.color, fontWeight: 'bold', fontSize: '1rem' }}>{item.text}</span>
                )}
              </div>
              
              <span className="orbit-label" style={{ color: '#ffffff' }}>{item.label}</span>
              
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

        {/* Ring 2 (Middle) */}
        <div className="orbit-ring orbit-ring-2">
          {renderOrbitItems(2)}
        </div>

        {/* Ring 3 (Outer) */}
        <div className="orbit-ring orbit-ring-3">
          {renderOrbitItems(3)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: \`
        .orbital-system-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          pointer-events: none; /* Let clicks pass to the main hero content/character */
          transform-style: preserve-3d;
          z-index: 0;
        }

        .orbit-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          border: 1px solid rgba(139, 92, 246, 0.25); /* Purple tint like the image */
          transform-style: preserve-3d;
          box-shadow: inset 0 0 30px rgba(139, 92, 246, 0.05), 0 0 15px rgba(22, 217, 208, 0.1);
        }

        .orbit-ring-1 {
          width: 360px;
          height: 360px;
          margin-top: -180px;
          margin-left: -180px;
          animation: orbit-cw 60s linear infinite;
        }

        .orbit-ring-2 {
          width: 560px;
          height: 560px;
          margin-top: -280px;
          margin-left: -280px;
          animation: orbit-ccw 50s linear infinite;
          border: 1px dashed rgba(22, 217, 208, 0.3); /* Cyan dashed */
        }

        .orbit-ring-3 {
          width: 760px;
          height: 760px;
          margin-top: -380px;
          margin-left: -380px;
          animation: orbit-cw 40s linear infinite;
          border: 1px dotted rgba(139, 92, 246, 0.4);
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
          width: 60px;
          height: 60px;
          margin-top: -30px;
          margin-left: -30px;
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
          position: absolute;
          top: 70px; /* Right below the 60px node */
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          pointer-events: none;
          z-index: 6;
        }

        /* Counter-rotation to keep icons upright */
        .inner-ring-1 { animation: counter-cw 60s linear infinite; }
        .inner-ring-2 { animation: counter-ccw 50s linear infinite; }
        .inner-ring-3 { animation: counter-cw 40s linear infinite; }

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

        @media (max-width: 1024px) {
          .orbital-system-container {
            transform: translate(-50%, -50%) scale(0.85);
          }
        }
        
        @media (max-width: 767px) {
          .orbital-system-container {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.6; /* reduce visual noise on mobile */
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-counter-rotate, .orbital-particle {
            animation: none !important;
          }
        }
      \`}} />
    </>
  );
};

export default OrbitalSystem;
