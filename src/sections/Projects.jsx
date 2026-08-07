import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';
import Button from '../components/Button';
import { FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const projectsRef = useRef([]);

  const dotsRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const totalProjects = projectsData.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalProjects * 80}vh`,
          pin: true,
          scrub: 1,
        }
      });

      // Initially set up projects and dots
      gsap.set(projectsRef.current[0], { xPercent: 0, opacity: 1 });
      gsap.set(dotsRef.current[0], { background: 'var(--accent-primary)', opacity: 1 });
      
      for (let i = 1; i < totalProjects; i++) {
        gsap.set(projectsRef.current[i], { xPercent: 50, opacity: 0 });
        gsap.set(dotsRef.current[i], { background: 'var(--text-muted)', opacity: 0.3 });
      }

      for (let i = 0; i < totalProjects - 1; i++) {
        const current = projectsRef.current[i];
        const next = projectsRef.current[i + 1];
        const nextDot = dotsRef.current[i + 1];

        tl.to(current, {
          xPercent: -50,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut'
        })
        .to(next, {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, "-=0.8")
        .to(nextDot, {
          background: 'var(--accent-primary)',
          opacity: 1,
          duration: 0.2
        }, "-=0.8");
      }
    });

    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      gsap.set(projectsRef.current, { clearProps: "all" });
      gsap.set(dotsRef.current, { display: 'none' });
      
      projectsRef.current.forEach(proj => {
        gsap.fromTo(proj, 
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: {
            trigger: proj,
            start: 'top 85%'
          }}
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="section"
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, var(--bg-primary) 0%, var(--bg-emerald) 20%, var(--bg-emerald) 80%, var(--bg-primary) 100%)',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={containerRef}
        className="container" 
        style={{ 
          position: 'relative', 
          height: '100%', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="projects-header" style={{ paddingTop: '10vh', paddingBottom: '4vh' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            color: 'var(--text-primary)', 
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            My Work
            <span style={{ display: 'block', width: '60px', height: '2px', background: 'var(--accent-primary)' }}></span>
          </h2>
        </div>

        <div className="projects-wrapper" style={{ position: 'relative', width: '100%', flex: 1 }}>
          {projectsData.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectsRef.current[index] = el}
              className="project-panel"
            >
              {/* Giant Background Text */}
              <div className="project-bg-text">
                {project.shortTitle}
              </div>

              {/* Project Content */}
              <div className="project-content">
                
                {/* Left: Info */}
                <div className="project-info">
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    {project.category} • {project.year}
                  </div>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '32px' }}>
                    {project.description}
                  </p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(25, 211, 209, 0.2)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Button href={project.liveUrl || '#'} variant="primary">View Project</Button>
                    
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}
                         onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                         onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Preview Window */}
                <div className="project-preview-container">
                  <div className="browser-frame">
                    {/* Browser Chrome */}
                    <div style={{ height: '32px', background: '#111', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                    </div>
                    {/* Image Placeholder */}
                    <div style={{ flex: 1, position: 'relative', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {project.image ? (
                        <img src={project.image} alt={`${project.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ color: 'var(--accent-primary)', opacity: 0.5, fontSize: '1.25rem', letterSpacing: '2px', textAlign: 'center', padding: '20px' }}>
                          [ {project.shortTitle} PREVIEW ]
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div style={{
          position: 'absolute',
          bottom: '5vh',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 20
        }}>
          {projectsData.map((_, index) => (
            <div 
              key={`dot-${index}`}
              ref={el => dotsRef.current[index] = el}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--text-muted)',
                opacity: 0.3,
                transition: 'all 0.3s ease'
              }}
            ></div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .project-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          fontSize: clamp(5rem, 20vw, 15rem);
          font-weight: 900;
          color: rgba(25, 211, 209, 0.02);
          white-space: nowrap;
          z-index: 0;
          pointer-events: none;
          letter-spacing: -0.02em;
          user-select: none;
        }

        .browser-frame {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 16/10;
          background: #0a0a0a;
          border-radius: 12px;
          border: 1px solid rgba(25, 211, 209, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(25, 211, 209, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
        }

        @media (min-width: 1024px) {
          .projects-wrapper {
            position: absolute !important;
            top: 20vh;
            left: 0;
            height: 80vh;
          }
          .project-panel {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-start;
          }
          .project-content {
            position: relative;
            z-index: 10;
            display: flex;
            gap: 60px;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          }
          .project-info {
            flex: 1 1 400px;
            max-width: 500px;
          }
          .project-preview-container {
            flex: 1 1 500px;
            display: flex;
            justify-content: center;
          }
          .browser-frame {
            transform: perspective(1000px) rotateY(-5deg);
          }
          .browser-frame:hover {
            transform: perspective(1000px) rotateY(0deg) translateY(-10px);
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.6), 0 0 50px rgba(25, 211, 209, 0.15);
          }
        }

        @media (max-width: 1023px) {
          .project-panel {
            position: relative;
            margin-bottom: 120px;
          }
          .project-content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            gap: 40px;
            width: 100%;
          }
          .project-info {
            width: 100%;
            order: 2;
          }
          .project-preview-container {
            width: 100%;
            order: 1;
          }
          .project-bg-text {
            font-size: clamp(3rem, 15vw, 6rem);
            top: 10%;
          }
          .browser-frame {
            transform: none !important;
          }
        }
      `}} />
    </section>
  );
};

export default Projects;
