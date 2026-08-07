import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const showcaseRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 320px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(headingRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(showcaseRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, ease: 'power3.out' }, 
        "-=0.2"
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  const SkillItem = ({ skill }) => {
    const Icon = skill.icon;
    return (
      <div 
        className="skill-item"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 40px',
          margin: '0 12px',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
          cursor: 'default',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
          const iconEl = e.currentTarget.querySelector('svg');
          if(iconEl) iconEl.style.filter = 'drop-shadow(0 0 12px var(--glow-cyan))';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          const iconEl = e.currentTarget.querySelector('svg');
          if(iconEl) iconEl.style.filter = 'none';
        }}
      >
        <Icon size={48} color={skill.color || 'var(--accent-primary)'} style={{ transition: 'all 0.3s ease' }} aria-hidden="true" />
        <span style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '1px' }}>
          {skill.name}
        </span>
      </div>
    );
  };

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      className="section"
      style={{ position: 'relative', padding: '100px 0', overflow: 'hidden' }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px' }}>
        <h2 
          ref={headingRef}
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            color: 'var(--text-primary)', 
            fontWeight: '700', 
            opacity: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          My Skills
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Modern Applications | Modern Technologies
          </span>
        </h2>
      </div>

      {/* Marquee Showcase */}
      <div 
        ref={showcaseRef} 
        style={{ 
          opacity: 0, 
          display: 'flex', 
          width: '100%',
          position: 'relative'
        }}
      >
        {/* Fade edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '10%', height: '100%', background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '10%', height: '100%', background: 'linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }}></div>

        <div className="marquee-container" style={{ position: 'relative', display: 'flex', overflow: 'hidden', width: '100%' }}>
          <div className="marquee-track marquee-left">
            {skillsData.map((skill, index) => <SkillItem key={`s1-${index}`} skill={skill} />)}
            {/* Duplicated for seamless loop */}
            {skillsData.map((skill, index) => <SkillItem key={`s2-${index}`} skill={skill} />)}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .marquee-track {
          display: flex;
          width: max-content;
        }

        .marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-left {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
          .marquee-container {
            overflow: visible !important;
          }
          .marquee-track {
            width: 100% !important;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}} />
    </section>
  );
};

export default Skills;
