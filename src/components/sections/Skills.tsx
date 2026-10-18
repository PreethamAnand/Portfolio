"use client";

import React, { useState } from "react";
import { SKILL_GROUPS, SkillItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

const FAMILIES = [
  "All",
  "Languages",
  "AI & ML",
  "Data Science",
  "Generative AI",
  "Frontend",
  "Backend & APIs",
  "Databases",
  "Tools",
  "CS Fundamentals",
] as const;

const FAMILY_COLORS: Record<string, string> = {
  All: "#0d0d0d",
  Languages: "#3776AB",
  "AI & ML": "#6366F1",
  "Data Science": "#0284C7",
  "Generative AI": "#A855F7",
  Frontend: "#06B6D4",
  "Backend & APIs": "#10B981",
  Databases: "#F59E0B",
  Tools: "#F43F5E",
  "CS Fundamentals": "#2563EB",
};

export function Skills() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [activeFamily, setActiveFamily] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILL_GROUPS[0]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-pad relative w-full"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className={`mb-12 rv ${inView ? "is-in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono-tag mb-2">02 — Periodic Stack</div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[#0d0d0d]">
            The Periodic Table of my <span className="font-serif-italic">Stack.</span>
          </h2>
          <p className="mt-3 text-sm text-[#77756f] max-w-xl">
            Core technologies, machine learning frameworks, data science libraries, and system architectures verified from production deployments, internships, and algorithmic practice.
          </p>
        </div>

        {/* Filter Chips */}
        <div
          className={`flex flex-wrap items-center gap-2 mb-8 rv ${
            inView ? "is-in" : ""
          }`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {FAMILIES.map((family) => {
            const isActive = activeFamily === family;
            const famColor = FAMILY_COLORS[family] || "#0d0d0d";
            return (
              <button
                key={family}
                onClick={() => setActiveFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#0d0d0d] text-white shadow-sm"
                    : "bg-white border border-[rgba(13,13,13,0.1)] text-[#3a3a3a] hover:border-[#0d0d0d]"
                }`}
              >
                {family !== "All" && (
                  <span
                    className="w-2 h-2 rounded-full transition-transform"
                    style={{ backgroundColor: famColor }}
                  />
                )}
                {family}
              </button>
            );
          })}
        </div>

        {/* Main Area: Periodic Grid + Sticky Inspector */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Periodic Grid (8 columns desktop, 4 mobile) */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
              {SKILL_GROUPS.map((skill, idx) => {
                const cols = 8;
                const row = Math.floor(idx / cols);
                const col = idx % cols;
                const delayMs = (row + col) * 40;

                const isDimmed =
                  activeFamily !== "All" && skill.family !== activeFamily;
                const isSelected = selectedSkill.name === skill.name;
                const skillColor = skill.color || "#0d0d0d";

                return (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    onFocus={() => setSelectedSkill(skill)}
                    style={{
                      transitionDelay: `${inView ? delayMs : 0}ms`,
                      borderColor: isSelected ? skillColor : undefined,
                      boxShadow: isSelected
                        ? `0 10px 28px -4px ${skill.glow || "rgba(13,13,13,0.15)"}`
                        : undefined,
                    }}
                    className={`aspect-square p-2.5 sm:p-2 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 relative card-base cursor-pointer focus:outline-none group overflow-hidden ${
                      isDimmed ? "opacity-20 scale-95" : "opacity-100"
                    } ${
                      isSelected
                        ? "ring-2 translate-y-[-2px] bg-white"
                        : "hover:translate-y-[-2px] hover:shadow-md"
                    }`}
                  >
                    {/* Top colored accent indicator line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2.5px] transition-opacity duration-300"
                      style={{
                        backgroundColor: skillColor,
                        opacity: isSelected ? 1 : 0.6,
                      }}
                    />

                    {/* Top: Atomic Number & 2-Letter Symbol */}
                    <div className="flex items-center justify-between w-full pt-0.5">
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#77756f]">
                        {skill.atomic.toString().padStart(2, "0")}
                      </span>
                      <span
                        className="font-mono text-[10px] sm:text-[11px] font-bold tracking-tight transition-transform duration-200 group-hover:scale-105"
                        style={{ color: skillColor }}
                      >
                        {skill.symbol}
                      </span>
                    </div>

                    {/* Middle: The Colorful Tech Icon! */}
                    <div className="my-auto flex items-center justify-center relative py-1">
                      {/* Ambient soft glow on hover or when selected */}
                      <div
                        className={`absolute inset-0 rounded-full blur-md pointer-events-none transition-opacity duration-300 ${
                          isSelected ? "opacity-75" : "opacity-0 group-hover:opacity-45"
                        }`}
                        style={{ backgroundColor: skill.glow || "transparent" }}
                      />
                      <TechLogo
                        name={skill.logo}
                        size={28}
                        color={skillColor}
                        className="transition-transform duration-300 group-hover:scale-110 relative z-10"
                      />
                    </div>

                    {/* Bottom: Skill Name */}
                    <div className="w-full truncate text-[9px] sm:text-[10px] font-medium text-[#222222] text-center">
                      {skill.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Inspector Panel (320px wide) */}
          <div className="w-full lg:w-[320px] lg:sticky lg:top-24">
            <div className="card-base p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden bg-white">
              {/* Subtle Brand Glow behind Logo */}
              <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none transition-all duration-500 opacity-60 blur-3xl"
                style={{
                  backgroundColor: selectedSkill.glow || "rgba(13,13,13,0.06)",
                }}
              />

              {/* 150px Logo with pop animation */}
              <div className="relative z-10 w-[150px] h-[150px] flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105">
                <TechLogo
                  name={selectedSkill.logo}
                  size={120}
                  color={selectedSkill.color}
                  glow={true}
                  glowColor={selectedSkill.glow}
                />
              </div>

              {/* Info */}
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[#77756f]">
                    #{selectedSkill.atomic.toString().padStart(2, "0")}
                  </span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition-colors duration-300"
                    style={{
                      backgroundColor: `${selectedSkill.color || "#0d0d0d"}18`,
                      color: selectedSkill.color || "#0d0d0d",
                    }}
                  >
                    {selectedSkill.family}
                  </span>
                </div>

                <h3 className="heading-display text-2xl font-bold text-[#0d0d0d]">
                  {selectedSkill.name}
                </h3>

                {/* Projects using this skill */}
                <div className="mt-6 pt-6 border-t border-[rgba(13,13,13,0.08)] text-left w-full">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] block mb-2">
                    Used In Projects &amp; Domains
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.projects.map((proj) => (
                      <span
                        key={proj}
                        className="px-2 py-1 rounded-md text-[11px] font-medium bg-[#f4f2ee] text-[#3a3a3a]"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
