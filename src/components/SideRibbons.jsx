import React from 'react';
import { skillsData } from '../data/skills';

const SideRibbons = () => {
  const SkillIcon = ({ skill }) => {
    const Icon = skill.icon;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 0',
        width: '100%',
        opacity: 0.6,
        transition: 'all 0.3s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.style.transform = 'scale(1.2)';
        e.currentTarget.style.filter = 'drop-shadow(0 0 10px var(--glow-cyan))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = 0.6;
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.filter = 'none';
      }}
      title={skill.name}
      >
        <Icon size={28} color={skill.color || 'var(--accent-primary)'} />
      </div>
    );
  };

  return (
    <>
      {/* Left Ribbon - Scrolls Down */}
      <div className="side-ribbon left-ribbon">
        <div className="ribbon-fade-top"></div>
        <div className="ribbon-fade-bottom"></div>
        <div className="ribbon-track scroll-down">
          {skillsData.map((skill, i) => <SkillIcon key={`l1-${i}`} skill={skill} />)}
          {skillsData.map((skill, i) => <SkillIcon key={`l2-${i}`} skill={skill} />)}
        </div>
      </div>

      {/* Right Ribbon - Scrolls Up */}
      <div className="side-ribbon right-ribbon">
        <div className="ribbon-fade-top"></div>
        <div className="ribbon-fade-bottom"></div>
        <div className="ribbon-track scroll-up">
          {skillsData.map((skill, i) => <SkillIcon key={`r1-${i}`} skill={skill} />)}
          {skillsData.map((skill, i) => <SkillIcon key={`r2-${i}`} skill={skill} />)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .side-ribbon {
          position: fixed;
          top: 15vh;
          height: 70vh;
          width: 60px;
          z-index: 50;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          backdrop-filter: blur(8px);
        }

        /* Hide on smaller screens to prevent overlapping main content */
        @media (max-width: 1300px) {
          .side-ribbon {
            display: none !important;
          }
        }

        .left-ribbon {
          left: 20px;
        }

        .right-ribbon {
          right: 20px;
        }

        .ribbon-fade-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .ribbon-fade-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60px;
          background: linear-gradient(to top, var(--bg-primary) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }

        .ribbon-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .scroll-down {
          animation: ribbonScrollDown 25s linear infinite;
        }

        .scroll-up {
          animation: ribbonScrollUp 25s linear infinite;
        }

        .side-ribbon:hover .ribbon-track {
          animation-play-state: paused;
        }

        @keyframes ribbonScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }

        @keyframes ribbonScrollUp {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-down, .scroll-up {
            animation: none;
          }
        }
      `}} />
    </>
  );
};

export default SideRibbons;
