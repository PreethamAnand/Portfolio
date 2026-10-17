"use client";

import React, { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCenterIndex, setActiveCenterIndex] = useState(0);
  const [hasStartedCounting, setHasStartedCounting] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });

  // Handle pinned horizontal scroll
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerH = containerRef.current.offsetHeight;
      const windowH = window.innerHeight;

      // Distance from top of container hitting top of viewport
      const totalScrollable = containerH - windowH;
      if (totalScrollable <= 0) return;

      const current = -rect.top;
      const progress = Math.min(1, Math.max(0, current / totalScrollable));
      setScrollProgress(progress);

      if (progress > 0.05 && !hasStartedCounting) {
        setHasStartedCounting(true);
      }

      // Find card nearest to center of viewport
      const track = trackRef.current;
      const cards = track.querySelectorAll("[data-achievement-card]");
      const centerX = window.innerWidth / 2;
      let minDistance = Infinity;
      let nearestIdx = 0;

      cards.forEach((card, idx) => {
        const cRect = card.getBoundingClientRect();
        const cardCenter = cRect.left + cRect.width / 2;
        const dist = Math.abs(centerX - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = idx;
        }
      });

      setActiveCenterIndex(nearestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [hasStartedCounting]);

  // Calculate track width translation
  const [maxTranslate, setMaxTranslate] = useState(1200);
  useEffect(() => {
    const calcWidth = () => {
      if (!trackRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const viewW = window.innerWidth;
      setMaxTranslate(Math.max(0, trackW - viewW + 120));
    };
    calcWidth();
    window.addEventListener("resize", calcWidth);
    return () => window.removeEventListener("resize", calcWidth);
  }, []);

  return (
    <div
      id="achievements"
      ref={containerRef}
      className="relative w-full h-[280vh] sm:h-[320vh]"
    >
      {/* Sticky Full-Viewport Container */}
      <div
        ref={inViewRef}
        className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden py-10"
      >
        {/* Header with Title and Thin Progress Bar */}
        <div
          className="w-full section-container z-10"
          style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="font-mono-tag mb-1">06 — Verified Milestones</div>
              <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-[#0d0d0d]">
                Numbers & <span className="font-serif-italic">Impact.</span>
              </h2>
            </div>

            <span className="font-mono text-xs text-[#77756f]">
              Scroll to explore honors · {activeCenterIndex + 1} of {ACHIEVEMENTS.length}
            </span>
          </div>

          {/* Thin Progress Bar */}
          <div className="w-full h-1 bg-[rgba(13,13,13,0.06)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d0d0d] transition-all duration-75 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Card Track */}
        <div className="w-full flex-1 flex items-center overflow-visible pl-[var(--gutter)]">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 will-change-transform transition-transform duration-100 ease-out py-10"
            style={{
              transform: `translateX(-${scrollProgress * maxTranslate}px)`,
            }}
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const isCenter = idx === activeCenterIndex;

              return (
                <div
                  key={item.index}
                  data-achievement-card
                  className={`flex-shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,320px)] bg-white rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-[var(--ease)] ${
                    isCenter
                      ? "-translate-y-3 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.12)]"
                      : "translate-y-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                  }`}
                  style={{
                    boxShadow: isCenter && item.glowColor
                      ? `0 24px 50px -15px ${item.glowColor}, inset 0 0 0 1px rgba(13,13,13,0.05)`
                      : "inset 0 0 0 1px rgba(13,13,13,0.08)",
                  }}
                >
                  {/* Top: 72px Logo Tile + Index */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] p-3.5 flex items-center justify-center transition-all duration-500"
                      style={{
                        boxShadow: isCenter && item.glowColor
                          ? `0 0 24px ${item.glowColor}`
                          : "none",
                      }}
                    >
                      <TechLogo name={item.logo} size={44} />
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#77756f]">
                        {item.index}
                      </span>
                      <span className="block text-[11px] font-mono text-[#a9a6a0] uppercase">
                        {item.platform}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Left Info + Huge Count Number */}
                  <div className="flex items-end justify-between gap-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
                    <div className="max-w-[55%]">
                      <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block">
                        {item.caption}
                      </span>
                      <h3 className="heading-display text-lg sm:text-xl font-bold text-[#0d0d0d] mt-0.5">
                        {item.label}
                      </h3>
                      <p className="text-xs text-[#77756f] mt-1 line-clamp-2 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>

                    {/* Huge Number with easeOutQuart Count-Up */}
                    <div className="text-right flex-shrink-0">
                      <NumberCounter
                        target={item.count}
                        decimals={item.decimals || 0}
                        suffix={item.suffix}
                        start={hasStartedCounting || inView}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Ending Milestone Badge: "and counting →" */}
            <div className="flex-shrink-0 pr-[var(--gutter)] flex items-center">
              <div className="h-[clamp(260px,36vh,320px)] w-[240px] rounded-[28px] border-2 border-dashed border-[rgba(13,13,13,0.15)] flex flex-col items-center justify-center text-center p-6 text-[#77756f]">
                <span className="font-serif-italic text-2xl text-[#0d0d0d]">
                  and counting
                </span>
                <span className="font-mono text-sm mt-1">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div
          className="w-full section-container flex items-center justify-between text-[11px] font-mono text-[#77756f]"
          style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
        >
          <span>DRIVEN BY CONTINUOUS ALGORITHMIC PRACTICE</span>
          <span>EST. 2023</span>
        </div>
      </div>
    </div>
  );
}

function NumberCounter({
  target,
  decimals = 0,
  suffix = "",
  start = false,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  start: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1400; // easeOutQuart over 1.4s
    let startTime: number | null = null;
    let animId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutQuart(progress);
      setVal(eased * target);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [start, target]);

  return (
    <span className="heading-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0d0d0d] tracking-tighter">
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      <span className="text-2xl sm:text-3xl font-normal ml-0.5 text-[#77756f]">
        {suffix}
      </span>
    </span>
  );
}
