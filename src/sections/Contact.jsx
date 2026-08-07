import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';
import { contactData } from '../data/contact';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const availabilityRef = useRef(null);

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

      tl.fromTo(headingRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(availabilityRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        "-=0.4"
      )
      .fromTo(textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        "-=0.4"
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        "-=0.4"
      )
      .fromTo(socialRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        "-=0.4"
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  const hasEmail = contactData.email && contactData.email !== "YOUR_EMAIL_HERE";

  return (
    <section 
      id="contact" 
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, var(--bg-primary) 0%, #010808 50%, var(--bg-primary) 100%)',
        overflow: 'hidden',
        padding: '100px 24px'
      }}
    >
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        maxWidth: '800px',
        maxHeight: '800px',
        background: 'radial-gradient(circle, rgba(16, 191, 195, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%'
      }}>
        
        {/* Availability Indicator */}
        {contactData.availability && (
          <div ref={availabilityRef} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            padding: '8px 16px',
            borderRadius: '100px',
            marginBottom: '40px',
            opacity: 0
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }}></div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>
              {contactData.availability}
            </span>
          </div>
        )}

        {/* Large Heading */}
        <h2 ref={headingRef} style={{
          fontSize: 'clamp(4rem, 12vw, 8rem)',
          fontWeight: '900',
          lineHeight: 0.95,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: '32px',
          opacity: 0
        }}>
          LET'S<br/>CONNECT
        </h2>

        {/* Supporting Text */}
        <p ref={textRef} style={{
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '600px',
          marginBottom: '48px',
          opacity: 0
        }}>
          Have an idea, project, or opportunity in mind? <br/>
          Let's build something meaningful together.
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ marginBottom: '60px', opacity: 0 }}>
          {hasEmail ? (
            <Button href={`mailto:${contactData.email}`} variant="primary">Get In Touch</Button>
          ) : (
            <Button variant="outline" className="disabled" style={{ opacity: 0.5, pointerEvents: 'none' }}>Email Not Configured</Button>
          )}
        </div>

        {/* Social Links */}
        <div ref={socialRef} style={{ opacity: 0 }}>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default Contact;
