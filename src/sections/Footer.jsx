import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialLinks from '../components/SocialLinks';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const currentYear = 2025; // Matching image

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 320px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(footerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
        }}
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <footer 
      id="footer" 
      ref={footerRef}
      style={{
        position: 'relative',
        background: '#000000', // Black background to match the image
        padding: '100px 24px 60px',
        borderTop: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Glows */}
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '10%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(16, 191, 195, 0.15) 0%, transparent 60%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        right: '10%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 60%)',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '24px'
      }}>
        {/* Name */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '700',
          color: 'white',
          letterSpacing: '1px',
          margin: 0
        }}>
          Preetham Anand
        </h2>

        {/* Decorative Line */}
        <div style={{
          display: 'flex',
          width: '100px',
          height: '2px',
          marginBottom: '8px'
        }}>
          <div style={{ flex: 1, background: '#3b82f6' }}></div>
          <div style={{ flex: 1, background: '#10bfc3' }}></div>
        </div>

        {/* Social Links */}
        <div style={{ transform: 'scale(1.2)', margin: '8px 0' }}>
          <SocialLinks />
        </div>

        {/* Quote */}
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          margin: '16px 0 8px 0',
          letterSpacing: '0.5px'
        }}>
          "Success is when preparation meets opportunity."
        </p>

        {/* Copyright */}
        <p style={{
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '0.75rem',
          margin: 0,
          fontFamily: 'monospace'
        }}>
          &copy; {currentYear} Preetham Anand. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
