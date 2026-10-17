"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useInView } from "@/lib/hooks";

export function Contact() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="section-pad relative w-full overflow-hidden bg-[#f4f2ee] border-t border-[rgba(13,13,13,0.1)]"
    >
      <div className="section-container flex flex-col justify-between">
        {/* Top Header Tag */}
        <div className={`mb-12 rv ${inView ? "is-in" : ""}`} style={{ "--i": 0 } as React.CSSProperties}>
          <div className="font-mono-tag mb-2">07 — Direct Contact</div>

          {/* Interactive Bouncing Letters Heading */}
          <div className="select-none py-2">
            <h2 className="heading-display text-4xl sm:text-6xl lg:text-8xl text-[#0d0d0d] font-black tracking-tight leading-[0.95]">
              <span className="block">
                {line1.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-200 ease-out hover:-translate-y-3 cursor-default"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="block mt-1">
                {line2.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-200 ease-out hover:-translate-y-3 cursor-default"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
          </div>
        </div>

        {/* Middle Section: Big Email, Copy Chip, Phone, Socials & Circular Badge */}
        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-12 my-12 rv ${
            inView ? "is-in" : ""
          }`}
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {/* Email + Copy button */}
          <div className="flex-1 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-wider text-[#77756f] block mb-2">
              Primary Communication Channel
            </span>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="heading-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0d0d0d] underline decoration-2 underline-offset-8 hover:text-[#77756f] transition-colors break-all"
              >
                {PROFILE.email}
              </a>

              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-full border border-[rgba(13,13,13,0.15)] bg-white text-xs font-mono font-semibold text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Copy email address"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </div>

            {/* Direct Phone & Coding Profiles (strictly from resume) */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <a
                href={PROFILE.phoneHref}
                className="font-mono text-[#0d0d0d] hover:underline flex items-center gap-2"
              >
                <span>Tel:</span>
                <span className="font-bold">{PROFILE.phone}</span>
              </a>

              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[#77756f] hover:text-[#0d0d0d] hover:underline"
                >
                  GitHub ↗
                </a>
              )}

              {PROFILE.hackerrank && (
                <a
                  href={PROFILE.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[#77756f] hover:text-[#0d0d0d] hover:underline"
                >
                  HackerRank ↗
                </a>
              )}

              {PROFILE.codechef && (
                <a
                  href={PROFILE.codechef}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[#77756f] hover:text-[#0d0d0d] hover:underline"
                >
                  CodeChef ↗
                </a>
              )}
            </div>
          </div>

          {/* Circular Spinning "Say Hello" Badge */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-full h-full animate-[spin_16s_linear_infinite]"
              viewBox="0 0 160 160"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                />
              </defs>
              <text
                className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.22em] fill-[#0d0d0d]"
              >
                <textPath href="#circlePath" startOffset="0%">
                  SAY HELLO • GET IN TOUCH • START A PROJECT •
                </textPath>
              </text>
            </svg>

            {/* Center Arrow */}
            <div className="absolute w-12 h-12 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-md">
              <span className="text-lg">↓</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Back to Top, Built with Next.js line */}
        <div className="pt-12 mt-12 border-t border-[rgba(13,13,13,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>

          <button
            onClick={() => scrollToTarget("hero")}
            className="hover:text-[#0d0d0d] hover:underline cursor-pointer focus:outline-none"
          >
            Back to top ↑
          </button>

          <p>Built with Next.js 15, React 19 & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
