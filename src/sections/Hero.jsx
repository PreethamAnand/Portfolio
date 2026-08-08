import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';
import heroImage from '../assets/hero.png';
import heroresume from '../assets/Preetham Anand Machine Learning Role.pdf';
import OrbitalSystem from '../components/OrbitalSystem';

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
        paddingTop: '0' 
      }}
    >
      <div 
        className="container hero-container" 
        style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '40px',
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {/* Left Side */}
        <div className="hero-text-col" style={{ flex: '1 1 540px', maxWidth: '540px', zIndex: 20, position: 'relative' }}>
          <span 
            ref={eyebrowRef} 
            className="hero-eyebrow"
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
          {/* Removed "Hi, I'm" to make it more premium */}
          <h1 
            ref={nameRef} 
            className="hero-name"
            style={{ 
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
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
            className="hero-desc"
            style={{ 
              color: 'var(--text-secondary)', 
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)', 
              lineHeight: 1.6, 
              marginBottom: '40px', 
              maxWidth: '540px',
              opacity: 0
            }}
          >
            Building AI-powered, machine learning and full-stack systems that solve real-world problems.
          </p>
          
          <div 
            ref={buttonsRef} 
            className="hero-buttons"
            style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '40px', 
              flexWrap: 'wrap',
              opacity: 0
            }}
          >
            <Button href="#projects" variant="primary">View My Work</Button>
            <Button href={heroresume} variant="secondary" download>
              My Resume
            </Button>
          </div>

          <div ref={socialRef} className="hero-socials" style={{ opacity: 0 }}>
            <SocialLinks />
          </div>
        </div>

        {/* Right Side */}
        <div 
          className="hero-image-col"
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
            className="hero-image-container"
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
            {/* The new Orbital System */}
            <OrbitalSystem />
            
            {/* Ambient glow behind character */}
            <div style={{
              position: 'absolute',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, var(--glow-cyan) 0%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: 1,
              animation: 'pulseGlow 4s ease-in-out infinite alternate'
            }}></div>
            <img 
              src={heroImage} 
              alt="Futuristic character illustration" 
              style={{ width: '70%', maxWidth: '320px', height: 'auto', maxHeight: '50vh', objectFit: 'contain', zIndex: 10, position: 'relative', transform: 'translateY(-20px)' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Glowing Base Pedestal */}
            <div style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              marginLeft: '-125px', /* Half of 250px */
              width: '250px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(22, 217, 208, 0.3) 0%, rgba(22, 217, 208, 0) 60%)',
              border: '2px solid rgba(22, 217, 208, 0.6)',
              boxShadow: '0 0 25px rgba(22, 217, 208, 0.5), inset 0 0 15px rgba(22, 217, 208, 0.4)',
              zIndex: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{
                width: '180px',
                height: '40px',
                borderRadius: '50%',
                border: '1.5px solid rgba(22, 217, 208, 0.8)',
                boxShadow: '0 0 20px rgba(22, 217, 208, 0.6), inset 0 0 10px rgba(22, 217, 208, 0.3)'
              }}></div>
            </div>
            {/* Fallback if image fails to load */}
            <div style={{
              display: 'none',
              width: '100%',
              maxWidth: '300px',
              aspectRatio: '3/4',
              background: 'rgba(25, 211, 209, 0.05)',
              border: '1px solid var(--border-strong)',
              borderRadius: '16px',
              color: 'var(--accent-primary)',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 30px var(--glow-cyan)'
            }}>
              [Character Placeholder]
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGlow {
          0% { opacity: 0.4; transform: scale(0.95); }
          100% { opacity: 0.8; transform: scale(1.1); }
        }

        @media (max-width: 767px) {
          .hero-container {
            gap: 20px !important;
            padding-top: 40px;
          }
          .hero-text-col {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-buttons {
            justify-content: center;
            margin-bottom: 30px !important;
          }
          .hero-desc {
            margin-bottom: 24px !important;
          }
          .hero-image-col {
            order: -1; /* Image on top of text on mobile */
          }
          .hero-image-container img {
            max-height: 40vh !important;
          }
        }
      `}} />
    </section>
  );
};

export default Hero;
