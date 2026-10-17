"use client";

import React, { useState } from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function Certifications() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="bg-white border-y border-[rgba(13,13,13,0.1)] section-pad relative w-full"
    >
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column: Sticky Heading & Count */}
          <div
            className={`w-full lg:w-[380px] lg:sticky lg:top-32 rv ${
              inView ? "is-in" : ""
            }`}
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <div className="font-mono-tag mb-2">04 — Certifications</div>
            <h2 className="heading-display text-4xl sm:text-5xl text-[#0d0d0d]">
              Always <span className="font-serif-italic">learning.</span>
            </h2>
            <p className="mt-4 text-sm text-[#77756f] leading-relaxed">
              Professional industry job simulations and technical workshops validating engineering workflows, enterprise data analysis, and advanced AI tooling.
            </p>
            <div className="mt-6 pt-6 border-t border-[rgba(13,13,13,0.08)] flex items-center gap-3">
              <span className="font-mono text-2xl font-bold text-[#0d0d0d]">
                {CERTIFICATIONS.length.toString().padStart(2, "0")}
              </span>
              <span className="text-xs text-[#77756f] font-mono uppercase tracking-wider">
                Accreditations & Simulations
              </span>
            </div>
          </div>

          {/* Right Column: Numbered Ink-Flood Rows */}
          <div className="flex-1 w-full space-y-3">
            {CERTIFICATIONS.map((cert, idx) => {
              const isExpanded = selectedId === cert.id;

              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedId(isExpanded ? null : cert.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  className={`group relative overflow-hidden rounded-2xl border border-[rgba(13,13,13,0.08)] p-6 sm:p-8 cursor-pointer focus:outline-none transition-all duration-300 rv ${
                    inView ? "is-in" : ""
                  }`}
                  style={{ "--i": idx + 1 } as React.CSSProperties}
                >
                  {/* Ink flood background (scaleX 0 -> 1 on hover/focus) */}
                  <div
                    className={`absolute inset-0 bg-[#0d0d0d] origin-left transition-transform duration-500 ease-[var(--ease)] pointer-events-none ${
                      isExpanded
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    }`}
                  />

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <span className="font-mono text-sm sm:text-base text-[#77756f] group-hover:text-white/60 transition-colors">
                          {cert.index}
                        </span>

                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] group-hover:text-white/70 transition-colors block">
                            {cert.issuer} • {cert.date}
                          </span>
                          <h3 className="heading-display text-xl sm:text-2xl font-bold text-[#0d0d0d] group-hover:text-white transition-colors mt-1">
                            {cert.title}
                          </h3>
                        </div>
                      </div>

                      {/* Sliding ↗ Arrow */}
                      <div className="w-9 h-9 rounded-full border border-[rgba(13,13,13,0.15)] group-hover:border-white/30 flex items-center justify-center text-[#0d0d0d] group-hover:text-white transition-all duration-300 transform -translate-x-2 opacity-50 group-hover:translate-x-0 group-hover:opacity-100 flex-shrink-0">
                        <span className="text-sm">↗</span>
                      </div>
                    </div>

                    {/* Verbatim Description from Resume */}
                    <div
                      className={`mt-4 pt-4 border-t border-[rgba(13,13,13,0.06)] group-hover:border-white/20 transition-all text-xs sm:text-sm text-[#3a3a3a] group-hover:text-[#cfceca] leading-relaxed ${
                        isExpanded ? "block" : "block"
                      }`}
                    >
                      {cert.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
