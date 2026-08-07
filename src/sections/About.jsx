import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../components/Button';
import { profileData } from '../data/profile';
import profilePic from '../assets/p.jpeg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const aboutMeRef = useRef(null);
  const profileImgRef = useRef(null);

  const stats = [
    { title: 'Degree', value: 'B.Tech' },
    { title: 'Specialty', value: 'AI & ML' },
    { title: 'College', value: 'Vignan Institute' },
    { title: 'CGPA', value: profileData.cgpa },
  ];

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
      // Right Column Content (Name, Role, Desc)
      .fromTo(rightColRef.current.children, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15 }, 
        "-=0.4"
      )
      // About Me Section
      .fromTo(aboutMeRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.2"
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
      style={{ position: 'relative', padding: '100px 0' }}
    >
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Main Profile Block */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '40px', 
          alignItems: 'flex-start',
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
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              color: 'var(--accent-primary)', 
              fontWeight: '700', 
              lineHeight: 1.1,
              marginBottom: '8px',
              letterSpacing: '-0.02em',
              opacity: 0
            }}>
              {profileData.name}
            </h2>
            
            <h3 style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)', 
              fontWeight: '500', 
              marginBottom: '24px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              opacity: 0
            }}>
              {profileData.role}
            </h3>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '1.125rem', 
              lineHeight: 1.6, 
              marginBottom: '40px', 
              maxWidth: '600px',
              opacity: 0
            }}>
              {profileData.degree} from {profileData.college}. Experienced in {profileData.topSkills.join(', ')}.
            </p>

            {/* Stat Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '16px',
              marginBottom: '40px',
              opacity: 0
            }}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '16px',
                    padding: '20px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.boxShadow = '0 4px 20px var(--glow-cyan)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {stat.title}
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '600' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: 0 }}>
              <Button href="#projects" variant="primary">View Projects</Button>
              <Button href="#contact" variant="outline">Get In Touch</Button>
            </div>
          </div>
        </div>

        {/* About Me Subsection */}
        <div 
          ref={aboutMeRef} 
          style={{ 
            marginTop: '20px',
            maxWidth: '800px',
            opacity: 0 // initial for gsap
          }}
        >
          <h3 style={{ 
            fontSize: '1.75rem', 
            color: 'var(--text-primary)', 
            fontWeight: '600', 
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            About Me
            <span style={{ flex: 1, height: '1px', background: 'var(--border-strong)', display: 'block' }}></span>
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {profileData.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
