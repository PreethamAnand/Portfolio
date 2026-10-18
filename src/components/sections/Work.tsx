"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Work() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  const activeProject = PROJECTS.find((p) => p.id === activeId) || PROJECTS[0];
  const activeIndex = PROJECTS.findIndex((p) => p.id === activeId);

  const goToPrev = () => {
    const prevIdx = (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setActiveId(PROJECTS[prevIdx].id);
  };

  const goToNext = () => {
    const nextIdx = (activeIndex + 1) % PROJECTS.length;
    setActiveId(PROJECTS[nextIdx].id);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-pad relative w-full overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div
          className={`mb-8 rv ${inView ? "is-in" : ""}`}
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <div className="font-mono-tag mb-2">03 — Selected Work</div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[#0d0d0d]">
            Things I&apos;ve <span className="font-serif-italic">built.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#77756f] max-w-2xl leading-relaxed">
            Real-world systems, AI architectures, and full-stack platforms engineered with production requirements, strict data flows, and modern UX standards.
          </p>
        </div>

        {/* Project Selector Rail: 6 Cards with Index, Title, and Domain Tag */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-6 rv ${
            inView ? "is-in" : ""
          }`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {PROJECTS.map((project) => {
            const isSelected = activeId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setActiveId(project.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(project.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isSelected}
                aria-label={`Project ${project.index}: ${project.title}`}
                className={`card-base relative p-3.5 sm:p-4 text-left transition-all duration-300 cursor-pointer focus:outline-none flex flex-col justify-between min-h-[96px] sm:min-h-[108px] select-none ${
                  isSelected
                    ? "bg-[#0d0d0d] text-white shadow-xl -translate-y-1 ring-2 ring-[#0d0d0d]"
                    : "bg-white hover:bg-[#f9f8f6] text-[#0d0d0d] border border-[rgba(13,13,13,0.08)] hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? "text-white/70" : "text-[#77756f]"
                    }`}
                  >
                    {project.index}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full transition-transform duration-300 ${
                      isSelected
                        ? "bg-white scale-125"
                        : "bg-[rgba(13,13,13,0.15)]"
                    }`}
                  />
                </div>

                <div>
                  <div className="font-bold text-xs sm:text-sm tracking-tight line-clamp-1">
                    {project.title}
                  </div>
                  <div
                    className={`text-[10px] font-mono tracking-wide mt-0.5 line-clamp-1 ${
                      isSelected ? "text-white/60" : "text-[#77756f]"
                    }`}
                  >
                    {project.kicker}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Project Showcase Stage Card */}
        <div
          className={`card-base bg-white border border-[rgba(13,13,13,0.08)] shadow-2xl p-6 sm:p-8 lg:p-10 rounded-[28px] overflow-hidden rv ${
            inView ? "is-in" : ""
          }`}
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between items-stretch">
            {/* Left Column: Full Unobstructed Project Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                {/* Kicker + Index Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-[#0d0d0d] bg-[#f4f2ee] px-2 py-0.5 rounded">
                    PROJECT {activeProject.index}
                  </span>
                  <span className="text-xs text-[#a9a6a0]">/</span>
                  <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
                    {activeProject.kicker}
                  </span>
                </div>

                {/* Title */}
                <h3 className="heading-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d0d0d] tracking-tight">
                  {activeProject.title}
                </h3>

                {/* Date */}
                <span className="text-xs font-mono text-[#77756f] block mt-1.5 mb-5">
                  Timeline: {activeProject.date}
                </span>

                {/* Description verbatim from Resume with generous line height and contrast */}
                <div className="bg-[#f9f8f6] border border-[rgba(13,13,13,0.06)] rounded-xl p-4 sm:p-5 mb-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                    <span>Project Scope &amp; Architecture</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#1a1a1a] leading-relaxed font-normal">
                    {activeProject.description}
                  </p>
                </div>

                {/* 2-Column Key Capabilities & Architecture */}
                <div className="mb-6">
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] mb-3 flex items-center gap-2">
                    <span>Key Capabilities &amp; System Highlights</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#2a2a2a]">
                    {activeProject.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 bg-[#fcfbfa] border border-[rgba(13,13,13,0.06)] rounded-lg p-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1.5 flex-shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Tech Badges & View Project Link */}
              <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#f4f2ee] text-[#2a2a2a] border border-[rgba(13,13,13,0.04)]"
                    >
                      <TechLogo name={t} size={14} />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pill-primary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2"
                    >
                      <span>View Project Repository</span>
                      <span>↗</span>
                    </a>
                  )}
                  {activeProject.liveUrl && activeProject.liveUrl !== activeProject.github && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pill-secondary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-2"
                    >
                      <span>Live Site</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Illustrative UI Preview */}
            <div className="w-full lg:w-[380px] xl:w-[440px] flex-shrink-0 min-h-[320px] lg:min-h-[460px] bg-[#f4f2ee] rounded-2xl border border-[rgba(13,13,13,0.08)] p-6 flex flex-col justify-between shadow-inner relative overflow-hidden">
              {/* Illustrative UI Header */}
              <div className="flex items-center justify-between z-10 pb-4 border-b border-[rgba(13,13,13,0.06)]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase bg-[#0d0d0d] text-white px-2 py-0.5 rounded font-bold">
                    Illustrative UI
                  </span>
                  <span className="font-mono text-[10px] text-[#77756f]">
                    {activeProject.index} / 06
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-mono text-[10px] text-[#0d0d0d] font-semibold">LIVE MOCK</span>
                </div>
              </div>

              {/* Dynamic Mock Interface per project */}
              <div className="my-auto py-6 z-10">
                {renderMiniUI(activeProject.id)}
              </div>

              {/* Mock Footer Status Bar */}
              <div className="z-10 pt-3 border-t border-[rgba(13,13,13,0.08)] flex justify-between items-center text-[10px] font-mono text-[#77756f]">
                <span>SYSTEM: OPERATIONAL</span>
                <span>MATCH PIPELINE: OPTIMAL</span>
              </div>
            </div>
          </div>

          {/* Stage Pagination Footer */}
          <div className="mt-8 pt-5 border-t border-[rgba(13,13,13,0.08)] flex items-center justify-between text-xs font-mono text-[#77756f]">
            <button
              onClick={goToPrev}
              className="inline-flex items-center gap-1.5 hover:text-[#0d0d0d] transition-colors py-2 px-3.5 rounded-lg bg-[#f9f8f6] hover:bg-white border border-[rgba(13,13,13,0.08)] cursor-pointer"
              aria-label="Previous Project"
            >
              <span>←</span>
              <span>Previous</span>
            </button>

            <span className="font-bold text-[#0d0d0d]">
              {activeIndex + 1} of {PROJECTS.length} Selected Projects
            </span>

            <button
              onClick={goToNext}
              className="inline-flex items-center gap-1.5 hover:text-[#0d0d0d] transition-colors py-2 px-3.5 rounded-lg bg-[#f9f8f6] hover:bg-white border border-[rgba(13,13,13,0.08)] cursor-pointer"
              aria-label="Next Project"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
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
