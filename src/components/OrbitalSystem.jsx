import React, { useEffect, useRef } from 'react';

const orbitalData = [
  // Single Ring (Radius 310px)
  { 
    ring: 1, 
    label: 'AI / ML', 
    text: '🧠', 
    angle: 0, 
    glow: 'rgba(236, 72, 153, 0.6)', // Pink
    skills: 'Machine Learning · Deep Learning · Computer Vision · Predictive Modeling · Explainable AI'
  },
  { 
    ring: 1, 
    label: 'GenAI', 
    text: '🤖', 
    angle: 72, 
    glow: 'rgba(168, 85, 247, 0.6)', // Purple
    skills: 'Generative AI · RAG · AI Agents · Multi-Agent Systems · Semantic Search · Embeddings'
  },
  { 
    ring: 1, 
    label: 'Engineering', 
    text: '⚙️', 
    angle: 144, 
    glow: 'rgba(59, 130, 246, 0.6)', // Blue
    skills: 'Full-Stack Development · Backend Development · API Development · AI System Design · ML Pipelines'
  },
  { 
    ring: 1, 
    label: 'Data', 
    text: '📊', 
    angle: 216, 
    glow: 'rgba(16, 185, 129, 0.6)', // Emerald
    skills: 'Data Analysis · Feature Engineering · Time-Series Analysis · Financial Analysis'
  },
  { 
    ring: 1, 
    label: 'Advanced Web', 
    text: '🌐', 
    angle: 288, 
    glow: 'rgba(6, 182, 212, 0.6)', // Cyan
    skills: '3D Web · WebGL · Interactive UI · Animation Engineering · Scroll-Driven Experiences'
  }
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
        let baseScale = 0.80;
        if (window.innerWidth <= 767) {
          baseScale = 0.38;
        } else if (window.innerWidth <= 1024) {
          baseScale = 0.45;
        } else if (window.innerWidth <= 1366) {
          baseScale = 0.60;
        }
        
        systemRef.current.style.transform = `translate(-50%, -50%) scale(${baseScale}) rotateX(${-currentY}deg) rotateY(${currentX}deg)`;
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
    return 310;
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
              <div 
                className="orbit-node group" 
                style={{ 
                  boxShadow: `0 0 25px ${item.glow}`, 
                  border: `1.5px solid ${item.glow}`,
                  background: 'rgba(5, 5, 10, 0.95)'
                }}
              >
                <span style={{ fontSize: '28px' }}>{item.text}</span>
                
                {/* Hover Tooltip */}
                <div className="orbit-tooltip">
                  <div className="tooltip-title" style={{ color: item.glow }}>{item.label}</div>
                  <div className="tooltip-skills">{item.skills}</div>
                </div>
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

        {/* Single Main Ring */}
        <div className="orbit-ring orbit-ring-1">
          {renderOrbitItems(1)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .orbital-system-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 900px;
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

        /* 310px Radius */
        .orbit-ring-1 {
          width: 620px;
          height: 620px;
          margin-top: -310px;
          margin-left: -310px;
          animation: orbit-cw 70s linear infinite;
        }

        @keyframes orbit-cw {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(360deg); }
        }

        /* Items on the rings */
        .orbit-item {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 72px;
          height: 72px;
          margin-top: -36px;
          margin-left: -36px;
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
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
          z-index: 5;
        }

        .orbit-node:hover {
          transform: scale(1.15);
          z-index: 10;
        }

        /* Always-visible plain text label below the node */
        .orbit-label {
          position: absolute;
          top: 80px; /* Right below the node */
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 5px rgba(0,0,0,0.9);
          pointer-events: none;
          z-index: 6;
          transition: opacity 0.3s ease;
        }

        /* Hide label on hover to make room for tooltip if needed */
        .orbit-node:hover + .orbit-label {
          opacity: 0;
        }

        /* Tooltip */
        .orbit-tooltip {
          position: absolute;
          top: 110%;
          left: 50%;
          transform: translateX(-50%) translateY(15px);
          width: 220px;
          padding: 14px;
          background: rgba(10, 10, 15, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 20;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
          backdrop-filter: blur(12px);
        }

        .orbit-node:hover .orbit-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(5px);
        }

        .tooltip-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 6px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .tooltip-skills {
          color: #a3a3a3;
          font-size: 0.75rem;
          line-height: 1.5;
        }

        /* Counter-rotation to keep icons upright */
        .inner-ring-1 { animation: counter-cw 70s linear infinite; }

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
