"use client";

import React, { useEffect, useRef, useState } from "react";
import { TIMELINE, TimelineItem } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import { scrollToTarget } from "@/lib/scroll";

export function Experience() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [spineProgress, setSpineProgress] = useState(0);

  // Calculate scroll progress through this section to draw the vertical spine
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Start drawing when section enters middle of screen, finish near bottom
      const totalDist = rect.height;
      const currentScroll = viewportHeight * 0.7 - rect.top;
      const progress = Math.min(1, Math.max(0, currentScroll / totalDist));
      setSpineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-pad relative w-full overflow-hidden"
    >
      <div className="section-container" ref={containerRef}>
        {/* Section Header */}
        <div className={`mb-16 rv ${inView ? "is-in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono-tag mb-2">05 — Career Pathway</div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[#0d0d0d]">
            Experience & Education as <span className="font-serif-italic">one path.</span>
          </h2>
          <p className="mt-3 text-sm text-[#77756f] max-w-xl">
            Chronological milestones spanning academic foundations in AI/ML to virtual internships engineering production full-stack systems.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-4 border-l-2 border-[rgba(13,13,13,0.08)]">
          {/* Active Ink Spine that draws on scroll */}
          <div
            className="absolute left-[-2px] top-0 w-[2px] bg-[#0d0d0d] transition-all duration-100 ease-out pointer-events-none"
            style={{ height: `${spineProgress * 100}%` }}
          />

          <div className="space-y-12 sm:space-y-16">
            {TIMELINE.map((item, idx) => {
              // Calculate if spine has reached this stop
              const stopProgress = (idx + 0.3) / TIMELINE.length;
              const isReached = spineProgress >= stopProgress;

              return (
                <div
                  key={item.id}
                  className={`relative group transition-all duration-500 rv ${
                    inView ? "is-in" : ""
                  }`}
                  style={{ "--i": idx + 1 } as React.CSSProperties}
                >
                  {/* Spine Node / Stop Indicator */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      isReached
                        ? "bg-[#0d0d0d] border-[#0d0d0d] scale-110 shadow-[0_0_12px_rgba(13,13,13,0.3)]"
                        : "bg-white border-[#a9a6a0] scale-90"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isReached ? "bg-white" : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Card Stop */}
                  <div
                    className={`card-base p-6 sm:p-8 transition-all duration-300 ${
                      isReached
                        ? "border border-[rgba(13,13,13,0.15)] bg-white shadow-md"
                        : "bg-white/70 border border-transparent"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f4f2ee] text-[#0d0d0d]">
                          {item.year}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f]">
                          {item.type === "education" ? "Education" : "Internship"}
                        </span>
                      </div>

                      {item.score && (
                        <span className="font-mono text-xs font-bold text-[#0d0d0d] bg-[#e9e6e0] px-2.5 py-0.5 rounded-full">
                          {item.score}
                        </span>
                      )}
                    </div>

                    <h3 className="heading-display text-xl sm:text-2xl font-bold text-[#0d0d0d]">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-[#77756f] mt-1">
                      {item.place}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[rgba(13,13,13,0.06)] space-y-2">
                      {item.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#3a3a3a] leading-relaxed"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#77756f] mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Ending Dashed Card: "Next — Your team?" */}
            <div
              className={`relative group rv ${inView ? "is-in" : ""}`}
              style={{ "--i": TIMELINE.length + 1 } as React.CSSProperties}
            >
              {/* Spine Node for Next */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full border-2 border-dashed transition-all duration-500 flex items-center justify-center ${
                  spineProgress >= 0.95
                    ? "bg-[#0d0d0d] border-[#0d0d0d]"
                    : "bg-white border-[#77756f]"
                }`}
              />

              <div className="border-2 border-dashed border-[rgba(13,13,13,0.2)] rounded-[26px] p-6 sm:p-8 bg-[#f4f2ee]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#0d0d0d] transition-colors">
                <div>
                  <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-1">
                    Upcoming Chapter
                  </span>
                  <h3 className="heading-display text-2xl font-bold text-[#0d0d0d]">
                    Next — Your team?
                  </h3>
                  <p className="text-sm text-[#77756f] mt-1 max-w-md">
                    Seeking full-stack development, AI/ML, or software engineering internship opportunities to build scalable systems.
                  </p>
                </div>

                <button
                  onClick={() => scrollToTarget("contact")}
                  className="btn-pill-primary cursor-pointer text-xs sm:text-sm py-2.5 px-6 whitespace-nowrap"
                >
                  Start a conversation →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
