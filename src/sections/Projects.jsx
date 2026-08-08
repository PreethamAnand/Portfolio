import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../data/projects';
import Button from '../components/Button';
import { FaGithub } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projectsData[activeIndex];

  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 320px)", () => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }}
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section 
      id="projects" 
      className="section"
      style={{ 
        position: 'relative', 
        paddingTop: '15px',
        paddingBottom: '25px',
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
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div className="projects-header" style={{ marginBottom: '15px' }}>
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

        <div className="projects-grid">
          
          {/* Left Column: Accordion List */}
          <div className="projects-list">
            {projectsData.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={project.id}
                  className={`project-list-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="project-list-header">
                    <span className="project-list-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="project-list-title">
                      {project.shortTitle || project.title}
                    </span>
                    {isActive ? (
                      <FaArrowRight className="project-list-icon active-icon" />
                    ) : (
                      <FaArrowRight className="project-list-icon" />
                    )}
                  </div>
                  
                  <div 
                    className="project-list-content"
                    style={{
                      maxHeight: isActive ? '150px' : '0',
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? '16px' : '0',
                    }}
                  >
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      fontSize: '0.82rem', 
                      lineHeight: 1.5, 
                      paddingLeft: '0px', 
                      paddingRight: '0px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {project.category} focused implementation delivering robust solutions.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Column: Project Info */}
          <div className="project-info-col">
            <div className="project-info-inner">
              <div style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                {activeProject.category} • {activeProject.year}
              </div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: '800', marginBottom: '16px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                {activeProject.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '24px' }}>
                {activeProject.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {activeProject.technologies.map((tech, i) => (
                  <span key={i} style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(25, 211, 209, 0.2)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: 'auto' }}>
                <Button href={activeProject.liveUrl || '#'} variant="primary">View Project</Button>
                
                {activeProject.githubUrl && (
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}
                     onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                     onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <FaGithub size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Project Image */}
          <div className="project-image-col">
            <div className="browser-frame">
              <div style={{ height: '32px', background: '#111', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ flex: 1, position: 'relative', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {activeProject.image ? (
                  <img key={activeProject.id} src={activeProject.image} alt={`${activeProject.title} preview`} style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeIn 0.5s ease-out' }} />
                ) : (
                  <div key={activeProject.id} style={{ color: 'var(--accent-primary)', opacity: 0.5, fontSize: '1rem', letterSpacing: '2px', textAlign: 'center', padding: '20px', animation: 'fadeIn 0.5s ease-out' }}>
                    [ {activeProject.shortTitle} PREVIEW ]
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .projects-grid {
          display: grid;
          gap: 24px;
          align-items: stretch;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 24px;
          border-radius: 20px;
        }

        /* Desktop: 3 Columns */
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: 1fr 2fr 2fr;
          }
        }

        /* Tablet: 2 Columns (Stack image below info) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .projects-grid {
            grid-template-columns: 1fr 2fr;
          }
          .project-image-col {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 767px) {
          .projects-grid {
            grid-template-columns: 1fr;
            padding: 16px !important;
            gap: 16px !important;
          }
          .project-info-col, .project-image-col {
            min-height: auto !important;
            padding: 16px !important;
          }
          .browser-frame {
            aspect-ratio: 16/9;
            height: auto;
          }
          .projects-header h2 {
            font-size: 2rem !important;
          }
        }

        /* Accordion Styles */
        .projects-list {
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(25, 211, 209, 0.02);
        }

        .project-list-item {
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
        }

        .project-list-item:last-child {
          border-bottom: none;
        }

        .project-list-item:hover:not(.active) {
          background: rgba(255, 255, 255, 0.05);
        }

        .project-list-item.active {
          background: var(--bg-tertiary);
          box-shadow: inset 4px 0 0 var(--accent-primary);
        }

        .project-list-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .project-list-number {
          color: var(--text-muted);
          font-family: monospace;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }

        .project-list-item.active .project-list-number {
          color: var(--accent-primary);
        }

        .project-list-title {
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 600;
          flex: 1;
          transition: color 0.3s ease;
        }

        .project-list-item.active .project-list-title {
          color: var(--text-primary);
        }

        .project-list-icon {
          color: var(--text-muted);
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .project-list-icon.active-icon {
          color: var(--accent-primary);
          transform: rotate(90deg);
        }

        .project-list-content {
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Middle Column Styles */
        .project-info-col {
          background: rgba(25, 211, 209, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          min-height: 400px;
        }

        .project-info-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: flex-start;
          animation: fadeIn 0.5s ease-out;
        }

        /* Right Column Styles */
        .project-image-col {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .browser-frame {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
};

export default Projects;
