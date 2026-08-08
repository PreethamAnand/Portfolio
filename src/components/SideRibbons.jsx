import React from 'react';
import { FaPython, FaReact, FaNodeJs, FaChartLine, FaDocker } from 'react-icons/fa';
import { SiFastapi, SiTensorflow, SiLangchain, SiLanggraph, SiMongodb, SiThreedotjs, SiGreensock } from 'react-icons/si';

const skillsData = [
  FaPython,
  FaReact,
  FaNodeJs,
  SiFastapi,
  SiTensorflow,
  FaChartLine, // Representing XGBoost
  SiLangchain,
  SiLanggraph,
  SiMongodb,
  SiThreedotjs,
  SiGreensock,
  FaDocker
];

const SideRibbons = () => {
  const SkillItem = ({ Icon }) => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '25px 0',
        width: '100%',
        opacity: 0.7,
        transition: 'all 0.3s ease',
        cursor: 'default',
        color: 'var(--accent-primary)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.style.transform = 'scale(1.25)';
        e.currentTarget.style.filter = 'drop-shadow(0 0 10px var(--glow-cyan))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = 0.7;
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.filter = 'none';
      }}
      >
        <Icon size={32} />
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
          {skillsData.map((Icon, i) => <SkillItem key={`l1-${i}`} Icon={Icon} />)}
          {skillsData.map((Icon, i) => <SkillItem key={`l2-${i}`} Icon={Icon} />)}
        </div>
      </div>

      {/* Right Ribbon - Scrolls Up */}
      <div className="side-ribbon right-ribbon">
        <div className="ribbon-fade-top"></div>
        <div className="ribbon-fade-bottom"></div>
        <div className="ribbon-track scroll-up">
          {skillsData.map((Icon, i) => <SkillItem key={`r1-${i}`} Icon={Icon} />)}
          {skillsData.map((Icon, i) => <SkillItem key={`r2-${i}`} Icon={Icon} />)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .side-ribbon {
          position: fixed;
          top: 15vh;
          height: 70vh;
          width: 70px;
          z-index: 50;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 35px;
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
          animation: ribbonScrollDown 35s linear infinite;
        }

        .scroll-up {
          animation: ribbonScrollUp 35s linear infinite;
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
