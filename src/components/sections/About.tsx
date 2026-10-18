"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function About() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);

  // Physics-based pendulum swing with spring damping
  const physicsRef = useRef({
    angle: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    isHovered: false,
  });

  useEffect(() => {
    let animId: number;
    let startTime = performance.now();

    const loop = (currentTime: number) => {
      const p = physicsRef.current;
      const dt = Math.min((currentTime - (p.lastTime || currentTime)) / 1000, 0.05);
      p.lastTime = currentTime;

      // Spring constants
      const k = 18; // spring tension
      const damping = 3.5; // air resistance

      // Restoring force towards 0
      const springForce = -k * p.angle;
      const dampingForce = -damping * p.velocity;
      const acceleration = springForce + dampingForce;

      p.velocity += acceleration * dt;
      p.angle += p.velocity * dt;

      // Subtle idle sway when resting
      const elapsed = (currentTime - startTime) / 1000;
      const idleSway = Math.sin(elapsed * 1.5) * 1.2;

      setSwingAngle(p.angle + idleSway);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (p.lastX !== 0) {
      const dx = e.clientX - p.lastX;
      // Add impulse based on horizontal mouse velocity
      p.velocity += dx * 0.45;
      // Clamp velocity
      p.velocity = Math.max(-25, Math.min(25, p.velocity));
    }
    p.lastX = e.clientX;
  };

  const handlePointerLeave = () => {
    physicsRef.current.lastX = 0;
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad relative w-full overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className={`mb-16 rv ${inView ? "is-in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono-tag mb-2">01 — Identity &amp; Engineering Focus</div>
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[#0d0d0d]">
            Academic Profile &amp; Developer <span className="font-serif-italic">ID.</span>
          </h2>
        </div>

        {/* Three Column Grid: minmax(0,1fr) 320px minmax(0,1fr) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          {/* Left Column: Bio & Verbatim Resume Text */}
          <div
            className={`card-base p-8 sm:p-10 flex flex-col justify-between rv ${
              inView ? "is-in" : ""
            }`}
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77756f]">
                About Preetham
              </span>
              <h3 className="heading-display text-2xl sm:text-3xl font-bold mt-2 text-[#0d0d0d]">
                Hi, I'm {PROFILE.name}.
              </h3>
              <p className="mt-1 text-xs font-mono font-medium text-[#77756f]">
                Computer Science &amp; Engineering (AI &amp; ML) Undergraduate
              </p>
              
              <p className="mt-4 text-[#3a3a3a] text-sm sm:text-base leading-relaxed">
                {PROFILE.resumeSummary}
              </p>

              {/* Stated Interests based strictly on Resume evidence */}
              <div className="mt-6 pt-5 border-t border-[rgba(13,13,13,0.08)]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#77756f] block mb-2.5">
                  Core Engineering Focus
                </span>
                <ul className="space-y-2 text-xs text-[#3a3a3a]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1.5 flex-shrink-0" />
                    <span><strong>Artificial Intelligence &amp; Machine Learning:</strong> Predictive modeling, deep neural networks, and computer vision classification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1.5 flex-shrink-0" />
                    <span><strong>Python &amp; Problem Solving:</strong> 315+ verified algorithmic solutions on CodeChef across data structures and core algorithms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1.5 flex-shrink-0" />
                    <span><strong>Full-Stack Web Development:</strong> End-to-end architectures utilizing React, FastAPI, Flask, Streamlit, and modern database systems.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d] mt-1.5 flex-shrink-0" />
                    <span><strong>AI-Powered Applications:</strong> Retrieval-Augmented Generation (RAG) with ChromaDB and multi-agent coordination pipelines.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Resume Links (Only existing links) */}
            <div className="mt-8 pt-6 border-t border-[rgba(13,13,13,0.08)] flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.resumePath}
                download="Preetham_Anand_Resume.pdf"
                className="btn-pill-primary text-xs"
              >
                Download Résumé ↓
              </a>
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill-secondary text-xs"
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card with Interactive Pendulum & Flip */}
          <div
            className={`flex flex-col items-center justify-start relative select-none rv ${
              inView ? "is-in" : ""
            }`}
            style={{ "--i": 2 } as React.CSSProperties}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Lanyard Top Anchor & Strap (30x56 px with scrolling text) */}
            <div className="relative flex flex-col items-center z-10">
              {/* Ceiling mount */}
              <div className="w-12 h-2.5 bg-[#1a1a1a] rounded-b-md shadow-sm" />

              {/* Fabric Lanyard Strap (30 x 56 px) */}
              <div className="w-[30px] h-[56px] bg-[#141414] text-[#f4f2ee] overflow-hidden relative shadow-md flex items-center justify-center border-x border-[#333]">
                <div className="absolute inset-0 flex flex-col items-center animate-[marquee_4s_linear_infinite] whitespace-nowrap text-[8px] font-mono tracking-widest uppercase opacity-85">
                  <span className="py-1">PREETHAM</span>
                  <span className="py-1">AI &amp; DEV</span>
                  <span className="py-1">PREETHAM</span>
                  <span className="py-1">AI &amp; DEV</span>
                </div>
              </div>

              {/* Metallic Clip & Ring */}
              <div className="w-6 h-5 bg-gradient-to-b from-[#b0b0b0] to-[#707070] rounded-sm flex items-center justify-center shadow-inner border border-[#666]">
                <div className="w-2.5 h-1.5 bg-[#222] rounded-full" />
              </div>
              <div className="w-2 h-3 bg-[#888] rounded-b-sm -mt-0.5" />
            </div>

            {/* Pendulum Card Container */}
            <div
              className="relative w-[300px] h-[404px] cursor-pointer mt-1 [perspective:1200px]"
              style={{
                transformOrigin: "top center",
                transform: `rotate(${swingAngle}deg)`,
                transition: "transform 0.05s linear",
              }}
              onClick={toggleFlip}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Developer ID Card. Press Enter to flip."
            >
              <div
                className={`w-full h-full relative rounded-[20px] transition-transform duration-700 [transform-style:preserve-3d] shadow-2xl ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* FRONT OF ID CARD */}
                <div className="absolute inset-0 w-full h-full rounded-[20px] bg-white border border-[rgba(13,13,13,0.12)] p-5 flex flex-col justify-between overflow-hidden [backface-visibility:hidden] shadow-sm">
                  {/* Punch Hole */}
                  <div className="w-10 h-2.5 bg-[#e5e5e5] border border-[#ccc] rounded-full mx-auto -mt-2 shadow-inner" />

                  {/* Top Black Header Band */}
                  <div className="mt-2 bg-[#0d0d0d] text-white py-1.5 px-3 rounded-lg flex items-center justify-between text-[10px] font-mono tracking-widest">
                    <span>AI &amp; ML ENGINEERING ID</span>
                    <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                  </div>

                  {/* Photo Frame (128x156) with gradient ring & hover zoom */}
                  <div className="relative mx-auto mt-2 w-[128px] h-[156px] rounded-xl p-[2px] bg-gradient-to-b from-[#ddd] via-[#bbb] to-[#999] shadow-md group">
                    <div className="w-full h-full rounded-[10px] overflow-hidden bg-[#e0ded8] relative">
                      <Image
                        src="/portrait-bust.webp"
                        alt={PROFILE.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="128px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mt-2">
                    <h4 className="font-bold text-sm tracking-tight text-[#0d0d0d]">
                      {PROFILE.name}
                    </h4>
                    <p className="text-[11px] font-medium text-[#77756f]">
                      AI &amp; ML · Full-Stack Developer
                    </p>
                  </div>

                  {/* Metadata Rows: ID No, Dept, Valid till */}
                  <div className="bg-[#f4f2ee] rounded-lg p-2.5 text-[10px] font-mono text-[#3a3a3a] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#77756f]">ID NO.</span>
                      <span className="font-semibold">{PROFILE.idNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77756f]">DEPT.</span>
                      <span className="font-semibold">{PROFILE.dept}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77756f]">VALID TILL</span>
                      <span className="font-semibold">{PROFILE.validTill}</span>
                    </div>
                  </div>

                  {/* Bottom Barcode & Hologram */}
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    {/* Simulated Barcode */}
                    <div className="flex items-center gap-[1.5px] h-5 opacity-70">
                      {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2].map(
                        (w, i) => (
                          <div
                            key={i}
                            className="bg-[#0d0d0d] h-full"
                            style={{ width: `${w}px` }}
                          />
                        )
                      )}
                    </div>

                    {/* Holographic Sticker */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ccc] via-[#fff] to-[#999] border border-gray-300 flex items-center justify-center text-[7px] font-bold text-gray-700 shadow-inner">
                      VERIFIED
                    </div>
                  </div>
                </div>

                {/* BACK OF ID CARD */}
                <div className="absolute inset-0 w-full h-full rounded-[20px] bg-[#0d0d0d] text-white p-6 flex flex-col justify-between overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-sm">
                  {/* Punch Hole */}
                  <div className="w-10 h-2.5 bg-[#2a2a2a] border border-[#444] rounded-full mx-auto -mt-3 shadow-inner" />

                  {/* Header */}
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#a9a6a0] uppercase block">
                      Engineering Record
                    </span>
                    <h4 className="heading-display text-lg font-bold tracking-tight text-white mt-1">
                      What I Am.
                    </h4>
                  </div>

                  {/* 5 Lines Drawn strictly from Resume */}
                  <div className="space-y-2 text-xs text-[#cfceca]">
                    <div className="flex items-start gap-2">
                      <span className="text-[#888] font-mono">01</span>
                      <p>Computer Science (AI &amp; ML) undergrad &amp; Full-Stack Developer.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#888] font-mono">02</span>
                      <p>B.Tech CSE (AI &amp; ML) • CGPA 8.66 / 10 at Vignan Institute.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#888] font-mono">03</span>
                      <p>315+ Algorithmic Problems Solved on CodeChef.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#888] font-mono">04</span>
                      <p>Engineered PulseConnect 2.0, Multi-Agent ATS &amp; ResearchPilot.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#888] font-mono">05</span>
                      <p>NASSCOM Hackathon Contributor.</p>
                    </div>
                  </div>

                  {/* Signature & Return notice */}
                  <div className="pt-3 border-t border-[rgba(255,255,255,0.15)] text-[10px] font-mono text-[#a9a6a0]">
                    <div className="italic font-serif text-sm text-white mb-1">
                      Preetham Anand
                    </div>
                    <p className="truncate">If found, say hello · {PROFILE.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-[11px] font-mono text-[#77756f]">
              {isFlipped ? "Tap / click to flip back" : "Tap / hover to flip card"}
            </p>
          </div>

          {/* Right Column: Quick Facts & Paraphrased Quote */}
          <div
            className={`card-base p-8 sm:p-10 flex flex-col justify-between rv ${
              inView ? "is-in" : ""
            }`}
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#77756f]">
                Quick Facts
              </span>
              <h3 className="heading-display text-2xl font-bold mt-2 text-[#0d0d0d]">
                Core Credentials.
              </h3>

              <div className="mt-6 space-y-4">
                <div className="border-b border-[rgba(13,13,13,0.06)] pb-3">
                  <span className="text-xs font-mono text-[#77756f] block">SPECIALIZATION</span>
                  <span className="text-sm font-semibold text-[#0d0d0d]">Artificial Intelligence &amp; Machine Learning</span>
                </div>
                <div className="border-b border-[rgba(13,13,13,0.06)] pb-3">
                  <span className="text-xs font-mono text-[#77756f] block">DEGREE &amp; INSTITUTION</span>
                  <span className="text-sm font-medium text-[#0d0d0d]">{PROFILE.college}</span>
                  <span className="text-xs text-[#77756f] block">B.Tech (2023 - 2027) • CGPA: {PROFILE.cgpa}</span>
                </div>
                <div className="border-b border-[rgba(13,13,13,0.06)] pb-3">
                  <span className="text-xs font-mono text-[#77756f] block">INDUSTRY INTERNSHIPS</span>
                  <span className="text-sm font-medium text-[#0d0d0d]">AI/ML Intern &amp; Full Stack Developer</span>
                  <span className="text-xs text-[#77756f] block">Nirvaha Wellness · Cothon Solutions · Edunet</span>
                </div>
                <div>
                  <span className="text-xs font-mono text-[#77756f] block">DIRECT INQUIRIES</span>
                  <a href={`mailto:${PROFILE.email}`} className="text-sm font-medium text-[#0d0d0d] hover:underline">
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote */}
            <div className="mt-8 pt-6 border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]/50 p-4 rounded-xl">
              <p className="text-xs text-[#3a3a3a] leading-relaxed italic">
                "{PROFILE.quote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
