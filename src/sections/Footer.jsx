import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialLinks from '../components/SocialLinks';
import { FaArrowUp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

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

  const handleBackToTop = (e) => {
    e.preventDefault();
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="footer" 
      ref={footerRef}
      style={{
        position: 'relative',
        background: '#010808', // very dark teal/black to seamlessly end the site
        padding: '60px 24px 40px',
        borderTop: '1px solid rgba(25, 211, 209, 0.1)'
      }}
    >
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        
        <div className="footer-top" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '32px'
        }}>
          
          {/* Identity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '1px' }}>
              Gaurav Gupta
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Full Stack Developer
            </span>
          </div>

          {/* Navigation Links */}
          <nav style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'center'
          }}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="footer-nav-link"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'color 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <SocialLinks />
            
            <button 
              onClick={handleBackToTop}
              aria-label="Back to Top"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(25, 211, 209, 0.1)';
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.color = 'var(--accent-primary)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="footer-bottom" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          gap: '16px'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            &copy; {currentYear} Gaurav Gupta. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Designed & Developed with precision.
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column !important;
            text-align: center;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center;
          }
        }
      `}} />
    </footer>
  );
};

export default Footer;
