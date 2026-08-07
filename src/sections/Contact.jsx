import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import astraImg from '../assets/Astra.png';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      tl.fromTo(leftColRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(rightColRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="section"
      ref={containerRef}
      style={{ 
        position: 'relative',
        padding: '25px 24px 10px 24px',
        background: 'transparent',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '60px',
        width: '100%',
        maxWidth: '1200px',
        alignItems: 'center'
      }} className="contact-grid">
        
        {/* Left Column: Image */}
        <div ref={leftColRef} style={{ display: 'flex', justifyContent: 'flex-start', opacity: 0, width: '100%' }}>
          <img 
            src={astraImg} 
            alt="Astronaut" 
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              objectFit: 'contain',
              animation: 'float 6s ease-in-out infinite'
            }} 
          />
        </div>

        {/* Right Column: Form */}
        <div ref={rightColRef} style={{ opacity: 0, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <div style={{
            width: '100%',
            maxWidth: '500px',
            background: '#0d0d0d',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              color: 'white',
              fontWeight: '700',
              marginBottom: '24px'
            }}>Let's Work Together</h2>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Your Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="contact-input"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Your Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="contact-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Service Needed <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select className="contact-input" defaultValue="">
                    <option value="" disabled hidden>Something in mind?</option>
                    <option value="web">Web Development</option>
                    <option value="ai">AI / Machine Learning</option>
                    <option value="consulting">Consulting</option>
                  </select>
                  <div style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: 'rgba(255, 255, 255, 0.5)'
                  }}>
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'white', fontSize: '0.75rem', marginBottom: '6px', fontWeight: '500' }}>
                  Explain Your Idea <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea 
                  placeholder="Explain your idea..." 
                  rows="4"
                  className="contact-input"
                  style={{ resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="button"
                style={{
                  width: '100%',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: '10px',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.background = '#2563eb'}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .contact-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px 14px;
          color: white;
          outline: none;
          font-size: 0.85rem;
          transition: border-color 0.3s ease;
          appearance: none;
          font-family: inherit;
        }
        .contact-input:focus {
          border-color: #3b82f6;
        }
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1.2fr !important;
          }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
    </section>
  );
};

export default Contact;
