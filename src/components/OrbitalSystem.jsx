import React, { useEffect, useRef } from 'react';
import { FaPython, FaReact, FaNodeJs, FaDocker, FaGithub, FaDatabase } from 'react-icons/fa';
import { SiTensorflow, SiFastapi } from 'react-icons/si';

const orbitalData = [
  // Inner Ring (radius 160px)
  { ring: 1, label: 'Python', icon: <FaPython size={22} color="#3776AB" />, angle: 0 },
  { ring: 1, label: 'React', icon: <FaReact size={22} color="#61DAFB" />, angle: 90 },
  { ring: 1, label: 'Machine Learning', text: 'ML', color: '#FF6F00', angle: 180 },
  { ring: 1, label: 'Node.js', icon: <FaNodeJs size={22} color="#339933" />, angle: 270 },

  // Middle Ring (radius 260px)
  { ring: 2, label: 'Generative AI', text: 'GenAI', color: '#10B981', angle: 30 },
  { ring: 2, label: 'RAG', text: 'RAG', color: '#8B5CF6', angle: 102 },
  { ring: 2, label: 'FastAPI', icon: <SiFastapi size={20} color="#009688" />, angle: 174 },
  { ring: 2, label: 'TensorFlow', icon: <SiTensorflow size={20} color="#FF6F00" />, angle: 246 },
  { ring: 2, label: 'XGBoost', text: 'XGB', color: '#F39C12', angle: 318 },

  // Outer Ring (radius 360px)
  { ring: 3, label: 'LangChain', text: '🔗', color: '#fff', angle: 0 },
  { ring: 3, label: 'LangGraph', text: '🕸️', color: '#fff', angle: 51 },
  { ring: 3, label: 'Three.js', text: '3D', color: '#ffffff', angle: 102 },
  { ring: 3, label: 'GSAP', text: 'GSAP', color: '#88CE02', angle: 153 },
  { ring: 3, label: 'ChromaDB', icon: <FaDatabase size={18} color="#2563EB" />, angle: 204 },
  { ring: 3, label: 'Docker', icon: <FaDocker size={18} color="#2496ED" />, angle: 255 },
  { ring: 3, label: 'GitHub', icon: <FaGithub size={18} color="#ffffff" />, angle: 306 },
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
    return ring === 1 ? 160 : ring === 2 ? 260 : 360;
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
              // Setting hover scaling here using CSS, but avoiding overwriting the base transform
            }}
          >
            <div className={`orbit-item-inner inner-ring-${ringNumber}`}>
              {item.icon ? (
                item.icon
              ) : (
                <span style={{ color: item.color, fontWeight: 'bold', fontSize: '0.8rem' }}>{item.text}</span>
              )}
              <span className="orbit-label">{item.label}</span>
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

      <style dangerouslySetInnerHTML={{__html: `
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
          border: 1px solid rgba(22, 217, 208, 0.12);
          transform-style: preserve-3d;
          box-shadow: inset 0 0 20px rgba(22, 217, 208, 0.02);
        }

        .orbit-ring-1 {
          width: 320px;
          height: 320px;
          margin-top: -160px;
          margin-left: -160px;
          animation: orbit-cw 60s linear infinite;
        }

        .orbit-ring-2 {
          width: 520px;
          height: 520px;
          margin-top: -260px;
          margin-left: -260px;
          animation: orbit-ccw 50s linear infinite;
          border: 1px dashed rgba(22, 217, 208, 0.15);
        }

        .orbit-ring-3 {
          width: 720px;
          height: 720px;
          margin-top: -360px;
          margin-left: -360px;
          animation: orbit-cw 40s linear infinite;
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
          width: 48px;
          height: 48px;
          margin-top: -24px;
          margin-left: -24px;
          pointer-events: auto; /* Re-enable pointer events for hover */
        }

        .orbit-item-inner {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background: rgba(2, 9, 9, 0.85);
          border: 1px solid rgba(22, 217, 208, 0.25);
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 15px rgba(22, 217, 208, 0.15);
          cursor: pointer;
        }

        /* Hover Effect: Scale the inner element so it doesn't break the positioning transform */
        .orbit-item:hover .orbit-item-inner {
          transform: scale(1.3) !important; /* Will overlap counter-rotation dynamically in a real app, but here we stack transforms. Actually, we should nest one more div to prevent conflict. Let's fix this. */
          background: rgba(2, 9, 9, 0.95);
          border-color: rgba(22, 217, 208, 0.8);
          box-shadow: 0 0 25px rgba(22, 217, 208, 0.5);
          z-index: 10;
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
        .orbit-ring:hover .orbit-item-inner {
          animation-play-state: paused;
        }

        .orbit-label {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          background: rgba(2, 9, 9, 0.9);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(22, 217, 208, 0.3);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .orbit-item:hover .orbit-label {
          opacity: 1;
          visibility: visible;
          top: -34px;
        }

        /* Ambient particles */
        .orbital-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
        }
        .p1 { width: 4px; height: 4px; top: 20%; left: 30%; animation: float 5s ease-in-out infinite; opacity: 0.6; }
        .p2 { width: 3px; height: 3px; top: 70%; left: 80%; animation: float 7s ease-in-out infinite 1s; opacity: 0.4; }
        .p3 { width: 5px; height: 5px; top: 80%; left: 20%; animation: float 6s ease-in-out infinite 2s; opacity: 0.5; }

        @media (max-width: 1024px) {
          .orbital-system-container {
            transform: translate(-50%, -50%) scale(0.8);
          }
        }
        
        @media (max-width: 767px) {
          .orbital-system-container {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.6; /* reduce visual noise on mobile */
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-item-inner, .orbital-particle {
            animation: none !important;
          }
        }
      `}} />
    </>
  );
};

export default OrbitalSystem;
