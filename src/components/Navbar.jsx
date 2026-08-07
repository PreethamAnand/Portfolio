import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-height)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          background: isScrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <a href="#home" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Portfolio<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions / Button */}
          <div style={{ display: 'none' }} className="desktop-actions">
            <Button href="#contact" variant="primary">Reach Out</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            style={{ 
              display: 'block', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              cursor: 'pointer' 
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* CSS for responsive display, typically better handled in a CSS file but placed here for component encapsulation without Tailwind */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            .desktop-nav { display: block !important; }
            .desktop-actions { display: block !important; }
            .mobile-toggle { display: none !important; }
          }
        `}} />
      </header>

      {/* Mobile Menu Dropdown */}
      <div 
        style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          height: mobileMenuOpen ? '100vh' : '0',
          background: 'rgba(5, 5, 5, 0.95)',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          transition: 'height 0.4s ease',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: mobileMenuOpen ? '40px' : '0'
        }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center', width: '100%' }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '24px' }}>
            <Button href="#contact" variant="primary" onClick={() => setMobileMenuOpen(false)}>
              Reach Out
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
