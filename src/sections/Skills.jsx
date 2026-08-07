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

      <div 
        ref={showcaseRef} 
        style={{ 
          opacity: 0, 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {skillsData.map((skill, index) => <SkillItem key={`skill-${index}`} skill={skill} />)}
      </div>
    </section>
  );
};

export default Skills;
