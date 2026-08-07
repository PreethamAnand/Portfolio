import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/experience';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const nodesRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    // Desktop: Horizontal Timeline with Pinning
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Animate heading in
      gsap.fromTo(headingRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }}
      );

      // Pin the section and scrub timeline
      const totalItems = experienceData.length;
      const timelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalItems * 400}`,
          pin: true,
          scrub: 0.3,
        }
      });

      // Animate progress line width
      timelineTl.to(progressLineRef.current, {
        width: '100%',
        ease: 'none'
      }, 0);

      // Animate nodes and cards sequentially
      nodesRef.current.forEach((node, index) => {
        const progressPoint = index / (totalItems - 1);
        const card = cardsRef.current[index];

        // 1st node is active initially
        if (index === 0) {
          gsap.set(node, {
            backgroundColor: 'var(--accent-primary)',
            boxShadow: '0 0 15px var(--glow-cyan)',
            borderColor: 'var(--accent-primary)'
          });
          gsap.set(card, {
            y: 0, opacity: 1, scale: 1,
            boxShadow: '0 10px 30px rgba(16, 191, 195, 0.15)',
            borderColor: 'rgba(16, 191, 195, 0.5)'
          });
        } else {
          timelineTl.to(node, {
            backgroundColor: 'var(--accent-primary)',
            boxShadow: '0 0 15px var(--glow-cyan)',
            borderColor: 'var(--accent-primary)',
            duration: 0.1,
            ease: 'power1.inOut'
          }, progressPoint - 0.05);

          timelineTl.fromTo(card,
            { y: index % 2 === 0 ? 30 : -30, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out',
              boxShadow: '0 10px 30px rgba(16, 191, 195, 0.15)',
              borderColor: 'rgba(16, 191, 195, 0.5)'
            }, progressPoint - 0.05
          );
        }
      });

      // Add a buffer at the end so the last card is readable before unpinning
      timelineTl.to({}, { duration: 0.5 });
    });

    // Mobile/Tablet: Vertical Timeline
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      gsap.fromTo(headingRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }}
      );

      cardsRef.current.forEach((card, index) => {
        const node = nodesRef.current[index];
        gsap.fromTo(card, 
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              onEnter: () => {
                gsap.to(node, {
                  backgroundColor: 'var(--accent-primary)',
                  boxShadow: '0 0 15px var(--glow-cyan)',
                  borderColor: 'var(--accent-primary)',
                  duration: 0.3
                });
              }
            }
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="section"
      style={{ position: 'relative', padding: '100px 0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}>
        <h2 
          ref={headingRef}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            color: 'var(--text-primary)', 
            fontWeight: '700', 
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          Experience
          <span style={{ display: 'block', width: '60px', height: '2px', background: 'var(--accent-primary)' }}></span>
        </h2>
      </div>

      <div 
        ref={timelineRef}
        className="timeline-container"
        style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Desktop Horizontal Line */}
        <div className="desktop-line" style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          right: '10%',
          height: '2px',
          background: 'var(--border-strong)',
          transform: 'translateY(-50%)',
          zIndex: 1
        }}>
          <div 
            ref={progressLineRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '0%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--glow-cyan)'
            }}
          ></div>
        </div>

        {/* Mobile Vertical Line */}
        <div className="mobile-line" style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '24px',
          width: '2px',
          background: 'var(--border-strong)',
          zIndex: 1
        }}></div>

        <div className="timeline-items" style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10%',
          zIndex: 2
        }}>
          {experienceData.map((exp, index) => (
            <div key={exp.id} className="timeline-item" style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              width: '100%'
            }}>
              
              {/* Card */}
              <div 
                ref={el => cardsRef.current[index] = el}
                className={`exp-card ${index % 2 === 0 ? 'top-card' : 'bottom-card'}`}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '24px',
                  width: '320px',
                  backdropFilter: 'blur(12px)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  zIndex: 10,
                  opacity: 0 // handled by GSAP
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = index % 2 === 0 && window.innerWidth >= 1024 ? 'translateY(-5px)' : 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(16, 191, 195, 0.4)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 191, 195, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '4px' }}>
                  {exp.role}
                </h3>
                <h4 style={{ color: 'var(--accent-primary)', fontSize: '1rem', fontWeight: '500', marginBottom: '12px' }}>
                  {exp.company}
                </h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {exp.description}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        border: '1px solid var(--border-subtle)', 
                        padding: '4px 10px', 
                        borderRadius: '100px', 
                        fontSize: '0.75rem', 
                        color: 'var(--text-secondary)',
                        transition: 'all 0.2s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--accent-primary)';
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Node */}
              <div 
                ref={el => nodesRef.current[index] = el}
                className="timeline-node"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  border: '3px solid var(--border-strong)',
                  zIndex: 5,
                  position: 'absolute',
                  transition: 'all 0.3s ease'
                }}
              ></div>

            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* Desktop/Mobile handling */
        @media (max-width: 1023px) {
          .desktop-line { display: none !important; }
          .mobile-line { display: block !important; }
          .timeline-items {
            flex-direction: column !important;
            padding: 0 24px 0 60px !important;
            gap: 40px;
          }
          .timeline-item {
            flex-direction: row !important;
            justify-content: flex-start !important;
          }
          .exp-card {
            width: 100% !important;
            margin: 0 !important;
            position: relative !important;
            transform: none !important;
          }
          .timeline-node {
            top: 32px !important;
            left: -48px !important; 
          }
        }
        @media (min-width: 1024px) {
          .mobile-line { display: none !important; }
          .timeline-node {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
          .top-card {
            margin-bottom: 80px;
          }
          .bottom-card {
            margin-top: 80px;
            flex-direction: column-reverse;
          }
          /* Visually offset bottom cards below the line */
          .bottom-card {
            top: 80px;
          }
          .top-card {
            bottom: 80px;
          }
        }
      `}} />
    </section>
  );
};

export default Experience;
