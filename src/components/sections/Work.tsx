"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Work() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-pad relative w-full overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className={`mb-12 rv ${inView ? "is-in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono-tag mb-2">03 — Selected Work</div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[#0d0d0d]">
            Things I've <span className="font-serif-italic">built.</span>
          </h2>
          <p className="mt-3 text-sm text-[#77756f] max-w-xl">
            Real-world systems, AI architectures, and full-stack platforms engineered with production requirements, strict data flows, and modern UX standards.
          </p>
        </div>

        {/* Accordion Gallery (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="flex flex-col lg:flex-row gap-3 min-h-[580px] lg:h-[min(78svh,620px)] w-full">
          {PROJECTS.map((project, idx) => {
            const isOpen = activeId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`Project ${project.index}: ${project.title}`}
                className={`card-base relative overflow-hidden transition-all duration-500 ease-[var(--ease)] cursor-pointer focus:outline-none flex flex-col ${
                  isOpen
                    ? "lg:flex-[8] bg-white shadow-xl ring-1 ring-[rgba(13,13,13,0.08)] p-6 sm:p-8"
                    : "lg:flex-[1] bg-[#f9f8f6] hover:bg-white p-4 sm:p-6 justify-between items-center"
                }`}
              >
                {/* COLLAPSED SPINE (Desktop) */}
                {!isOpen && (
                  <div className="hidden lg:flex flex-col justify-between items-center h-full w-full py-4 select-none group">
                    <span className="font-mono text-xs text-[#77756f]">
                      {project.index}
                    </span>

                    <div className="[writing-mode:vertical-rl] rotate-180 font-bold text-sm tracking-tight text-[#0d0d0d] whitespace-nowrap my-auto group-hover:text-[#77756f] transition-colors">
                      {project.title}
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-[#0d0d0d] group-hover:rotate-90 group-hover:bg-[#0d0d0d] group-hover:text-white transition-all duration-300">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* COLLAPSED BAR (Mobile) */}
                {!isOpen && (
                  <div className="flex lg:hidden items-center justify-between w-full py-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#77756f]">
                        {project.index}
                      </span>
                      <span className="font-bold text-base text-[#0d0d0d]">
                        {project.title}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-[rgba(13,13,13,0.15)] flex items-center justify-center text-xs">
                      +
                    </div>
                  </div>
                )}

                {/* EXPANDED CONTENT */}
                {isOpen && (
                  <div className="w-full h-full flex flex-col lg:flex-row gap-8 justify-between animate-fadeIn">
                    {/* Left Column: Details, Features, Tech, CTAs */}
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-2">
                      <div>
                        {/* Kicker + Index */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-xs text-[#77756f]">
                            {project.index}
                          </span>
                          <span className="text-xs text-[#a9a6a0]">/</span>
                          <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
                            {project.kicker}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="heading-display text-2xl sm:text-3xl font-bold text-[#0d0d0d]">
                          {project.title}
                        </h3>

                        {/* Date */}
                        <span className="text-xs font-mono text-[#a9a6a0] block mt-1">
                          {project.date}
                        </span>

                        {/* Description verbatim from Resume */}
                        <p className="mt-4 text-sm sm:text-base text-[#3a3a3a] leading-relaxed">
                          {project.description}
                        </p>

                        {/* 2-Column Feature List */}
                        <div className="mt-6 pt-5 border-t border-[rgba(13,13,13,0.06)]">
                          <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] mb-3">
                            Key Capabilities & Architecture
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3a3a3a]">
                            {project.features.map((feat, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Tech Chips & Action Buttons */}
                      <div className="mt-6 pt-5 border-t border-[rgba(13,13,13,0.06)] flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#f4f2ee] text-[#3a3a3a]"
                            >
                              <TechLogo name={t} size={14} />
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Project Links (Strictly only if they exist in résumé) */}
                        <div className="flex items-center gap-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-pill-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                            >
                              <span>View Project</span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Illustrative Mini-UI (Pure Grayscale CSS/JSX) */}
                    <div className="w-full lg:w-[360px] xl:w-[420px] h-[260px] lg:h-full bg-[#f4f2ee] rounded-2xl border border-[rgba(13,13,13,0.08)] p-5 flex flex-col justify-between relative overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
                      {/* Illustrative UI Disclaimer Tag */}
                      <div className="flex items-center justify-between z-10">
                        <span className="font-mono text-[10px] tracking-widest uppercase bg-[#0d0d0d] text-white px-2 py-0.5 rounded">
                          Illustrative UI
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#a9a6a0]" />
                          <span className="w-2 h-2 rounded-full bg-[#a9a6a0]" />
                          <span className="w-2 h-2 rounded-full bg-[#a9a6a0]" />
                        </div>
                      </div>

                      {/* Dynamic Mock Interface per project */}
                      <div className="my-auto py-2 z-10">
                        {renderMiniUI(project.id)}
                      </div>

                      {/* Mock Footer Status Bar */}
                      <div className="z-10 pt-2 border-t border-[rgba(13,13,13,0.08)] flex justify-between text-[10px] font-mono text-[#77756f]">
                        <span>SYSTEM: OPERATIONAL</span>
                        <span>LATENCY: 18ms</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function renderMiniUI(projectId: string) {
  switch (projectId) {
    case "pulseconnect":
      return (
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
            <div className="flex justify-between text-[11px] text-[#77756f] mb-1">
              <span>DISPATCH ENGINE</span>
              <span className="text-[#0d0d0d] font-bold">MATCH 98.4%</span>
            </div>
            <div className="h-2 bg-[#f4f2ee] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d0d0d] w-[98%]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-white p-2.5 rounded-lg border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">ACTIVE RECIPIENTS</span>
              <span className="font-bold text-sm text-[#0d0d0d]">14 Units</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">VERIFIED DONORS</span>
              <span className="font-bold text-sm text-[#0d0d0d]">128 Online</span>
            </div>
          </div>
        </div>
      );

    case "enterprise-ats":
      return (
        <div className="space-y-2.5 font-mono text-xs">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#77756f]">ATS MATCH SCORE</span>
              <span className="text-base font-bold text-[#0d0d0d]">94 / 100</span>
            </div>
            <div className="h-2 bg-[#f4f2ee] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d0d0d] w-[94%]" />
            </div>
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-[rgba(13,13,13,0.06)]">
              <span>Resume Parser Agent</span>
              <span className="text-[#77756f]">COMPLETED</span>
            </div>
            <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-[rgba(13,13,13,0.06)]">
              <span>Semantic Matcher</span>
              <span className="text-[#77756f]">OPTIMAL</span>
            </div>
            <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded border border-[rgba(13,13,13,0.06)]">
              <span>Missing Keywords</span>
              <span className="text-[#77756f]">0 DETECTED</span>
            </div>
          </div>
        </div>
      );

    case "nse-intelligence":
      return (
        <div className="space-y-2.5 font-mono text-xs">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
            <div className="flex justify-between text-[11px] text-[#77756f] mb-2">
              <span>NSE INDEX MODEL</span>
              <span className="text-[#0d0d0d] font-bold">RSI: 54.2</span>
            </div>
            {/* Mock Candlestick Chart */}
            <div className="flex items-end justify-between h-14 pt-2">
              {[40, 65, 55, 80, 70, 95, 85, 110, 95, 120].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <div className="w-0.5 bg-[#77756f] h-2" />
                  <div
                    className="w-2.5 bg-[#0d0d0d] rounded-xs"
                    style={{ height: `${h * 0.3}px` }}
                  />
                  <div className="w-0.5 bg-[#77756f] h-1.5" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-[#77756f] bg-white p-2 rounded-lg">
            <span>VOLATILITY: LOW</span>
            <span>SIGNAL: ACCUMULATE</span>
          </div>
        </div>
      );

    case "researchpilot-ai":
      return (
        <div className="space-y-2.5 font-mono text-xs">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
            <div className="text-[11px] text-[#77756f] mb-1">
              CHROMA VECTOR RETRIEVAL
            </div>
            <p className="text-[11px] text-[#0d0d0d] line-clamp-2">
              &quot;Contextual embeddings retrieved across 1,420 research papers via Groq LLM.&quot;
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-white p-2 rounded border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">GROUNDING</span>
              <span className="font-bold text-[#0d0d0d]">RAG Active</span>
            </div>
            <div className="bg-white p-2 rounded border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">HACKATHON</span>
              <span className="font-bold text-[#0d0d0d]">NASSCOM</span>
            </div>
          </div>
        </div>
      );

    case "deepfake-detection":
      return (
        <div className="space-y-2.5 font-mono text-xs">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
            <div className="flex justify-between text-[11px] text-[#77756f] mb-1">
              <span>FACIAL ARTIFACT SCAN</span>
              <span className="font-bold text-[#0d0d0d]">SYNTHETIC 0.2%</span>
            </div>
            <div className="h-2 bg-[#f4f2ee] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d0d0d] w-[2%]" />
            </div>
          </div>
          <div className="bg-white p-2 rounded text-[10px] text-[#3a3a3a] space-y-1">
            <div className="flex justify-between">
              <span className="text-[#77756f]">LANDMARK JITTER</span>
              <span>NOMINAL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77756f]">TEXTURE COHERENCE</span>
              <span>99.8% REAL</span>
            </div>
          </div>
        </div>
      );

    case "airfare-prediction":
      return (
        <div className="space-y-2.5 font-mono text-xs">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.08)] shadow-sm">
            <div className="flex justify-between text-[11px] text-[#77756f] mb-1">
              <span>PREDICTED FARE</span>
              <span className="font-bold text-sm text-[#0d0d0d]">₹ 4,850</span>
            </div>
            <p className="text-[10px] text-[#77756f]">
              Optimized via Scikit-Learn Regression pipeline.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-white p-2 rounded border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">MODEL R²</span>
              <span className="font-bold text-[#0d0d0d]">0.914</span>
            </div>
            <div className="bg-white p-2 rounded border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">HYPERPARAMS</span>
              <span className="font-bold text-[#0d0d0d]">Tuned</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
