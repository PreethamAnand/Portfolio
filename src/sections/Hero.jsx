import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';
import heroImage from '../assets/hero.png';

const Hero = () => {
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const socialRef = useRef(null);
  const charRef = useRef(null);

  useEffect(() => {
    // Responsive matcher for animation variations if needed
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 320px)", () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 })
        .fromTo(greetingRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .fromTo(nameRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .fromTo(buttonsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .fromTo(socialRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .fromTo(charRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5");

      gsap.to(charRef.current, {
        y: -15,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="section" 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: 'var(--nav-height)' 
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap-reverse', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '40px'
        }}
      >
        {/* Left Side */}
        <div style={{ flex: '1 1 320px', maxWidth: '650px', zIndex: 10 }}>
          <span 
            ref={eyebrowRef} 
            style={{ 
              display: 'block', 
              color: 'var(--text-muted)', 
              fontSize: '0.875rem', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              marginBottom: '16px',
              opacity: 0
            }}
          >
            AI/ML ENGINEER • FULL STACK DEVELOPER
          </span>
          <h2 
            ref={greetingRef} 
            style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
              color: 'var(--accent-primary)', 
              fontWeight: '500', 
              marginBottom: '4px',
              opacity: 0
            }}
          >
            Hi, I'm
          </h2>
          <h1 
            ref={nameRef} 
            style={{ 
              fontSize: 'clamp(3rem, 8vw, 5.5rem)', 
              color: 'var(--text-primary)', 
              fontWeight: '800', 
              lineHeight: 1.1, 
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              opacity: 0
            }}
          >
            Preetham Anand
          </h1>
          <p 
            ref={descRef} 
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: 'clamp(1rem, 2vw, 1.125rem)', 
              lineHeight: 1.6, 
              marginBottom: '40px', 
              maxWidth: '540px',
              opacity: 0
            }}
          >
            Builds intelligent systems, data-driven applications, and full-stack products using AI/ML and modern web technologies.
          </p>
          
          <div 
            ref={buttonsRef} 
            style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '40px', 
              flexWrap: 'wrap',
              opacity: 0
            }}
          >
            <Button href="#projects" variant="primary">View My Work</Button>
            <Button href="#contact" variant="secondary">Let's Connect</Button>
          </div>

          <div ref={socialRef} style={{ opacity: 0 }}>
            <SocialLinks />
          </div>
        </div>

        {/* Right Side */}
        <div 
          style={{ 
            flex: '1 1 320px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative' 
          }}
        >
          <div 
            ref={charRef}
            style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '500px', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0
            }}
          >
            {/* Ambient glow behind character */}
            <div style={{
              position: 'absolute',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, var(--glow-cyan) 0%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: -1,
              animation: 'pulseGlow 4s ease-in-out infinite alternate'
            }}></div>
            <img 
              src={heroImage} 
              alt="Futuristic character illustration" 
              style={{ width: '100%', height: 'auto', objectFit: 'contain', zIndex: 1 }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback if image fails to load */}
            <div style={{
              display: 'none',
              width: '300px',
              height: '400px',
              background: 'rgba(25, 211, 209, 0.05)',
              border: '1px solid var(--border-strong)',
              borderRadius: '16px',
              color: 'var(--accent-primary)',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 30px var(--glow-cyan)'
            }}>
              [Character Image Placeholder]
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(0.95); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }
      `}} />
    </section>
  );
};

export default Hero;
