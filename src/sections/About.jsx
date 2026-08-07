import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';
import profilePic from '../assets/p.jpeg';
import { skillsData } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const profileImgRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 320px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out', duration: 0.6 }
      });

      // Left Column (Profile Image)
      tl.fromTo(leftColRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1 }
      )
      // Right Column Content (Text paragraphs and Buttons)
      .fromTo(rightColRef.current.children, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15 }, 
        "-=0.4"
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="section"
      style={{ position: 'relative', paddingTop: '25px', paddingBottom: '0' }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Main Profile Block */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '40px', 
          alignItems: 'stretch',
          justifyContent: 'space-between'
        }}>
          
          {/* Left Column: Profile Image */}
          <div 
            ref={leftColRef} 
            style={{ 
              flex: '1 1 300px', 
              maxWidth: '400px', 
              display: 'flex', 
              justifyContent: 'center',
              position: 'relative',
              opacity: 0 // initial for gsap
            }}
          >
            {/* Ambient Profile Glow */}
            <div style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, var(--glow-cyan) 0%, transparent 70%)',
              filter: 'blur(30px)',
              zIndex: -1,
            }}></div>
            
            {/* Profile Image Placeholder */}
            <div 
              ref={profileImgRef}
              className="profile-container"
              style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'rgba(25, 211, 209, 0.03)',
                border: '1px solid var(--border-strong)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                boxShadow: '0 0 20px rgba(16, 191, 195, 0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 191, 195, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 191, 195, 0.15)';
              }}
            >
              <img 
                src={profilePic} 
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right Column: Info & Stats */}
          <div 
            ref={rightColRef} 
            style={{ 
              flex: '2 1 400px', 
              display: 'flex', 
              flexDirection: 'column'
            }}
          >
            
            <div style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.05rem', 
              lineHeight: 1.7, 
              marginBottom: '40px', 
              maxWidth: '700px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              opacity: 0
            }}>
              <h2 style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                color: 'var(--text-primary)', 
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '8px'
              }}>
                About Me
                <span style={{ display: 'block', width: '40px', height: '2px', background: 'var(--accent-primary)' }}></span>
              </h2>
              <p>
                I'm Preetham Anand, a Computer Science undergraduate specializing in AI & Machine Learning. I build practical systems that combine intelligent models with usable applications — spanning Machine Learning, Generative AI, RAG systems, Computer Vision, and Full-Stack Development, primarily in Python, React, and FastAPI.
              </p>
              <p>
                Projects include NSE Intelligence (ML-driven stock analysis), PulseConnect (AI-powered blood coordination), ResearchHub AI (a document-grounded RAG system), DeepFake Face Detection, Airfare Price Prediction, and Nirvaha, where I worked as a Full Stack Developer. Currently building TruthLens (AI content verification) and PREAK (an AI-native engineering platform).
              </p>
              <p>
                Looking for opportunities to build real products as an AI/ML and Full-Stack Engineer.
              </p>
            </div>

            {/* Core Skills */}
            <div style={{ marginBottom: '40px', opacity: 0 }} className="about-skills-block">
              <h3 style={{ 
                fontSize: '1.25rem', 
                color: 'var(--text-primary)', 
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Core Technologies
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skillsData.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)';
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(16, 191, 195, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Icon style={{ color: skill.color }} />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: 0, marginTop: 'auto' }} className="about-buttons-block">
              <Button href="#projects" variant="primary">View Projects</Button>
              <Button href="#contact" variant="outline">Get In Touch</Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
