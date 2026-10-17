"use client";

import React, { useState, useEffect, useRef } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Scroll listener for 40px threshold
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver with rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = ["hero", ...NAV.map((n) => n.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Update sliding indicator pill under active link
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector(
      `[data-nav-id="${activeSection}"]`
    ) as HTMLElement | null;

    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Mobile menu lock scroll & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    scrollToTarget(id);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] z-50 pointer-events-none transition-all duration-75"
        style={{ width: `${progress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header
        className="fixed top-0 left-0 w-full z-40 transition-all duration-300 py-4"
        style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials mark + full name */}
          <button
            onClick={() => scrollToTarget("hero")}
            aria-label="Back to top"
            className="group flex items-center gap-3 cursor-pointer select-none focus:outline-none"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-tight transition-all duration-500 ease-[var(--ease)] group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[#0d0d0d] text-[#f4f2ee] shadow-sm"
                  : "border border-[#0d0d0d] text-[#0d0d0d] bg-transparent"
              }`}
            >
              {PROFILE.initials}
            </div>

            <span
              className={`font-semibold text-sm tracking-tight text-[#0d0d0d] transition-all duration-300 ${
                scrolled ? "opacity-0 -translate-x-3 pointer-events-none" : "opacity-100 translate-x-0"
              }`}
            >
              {PROFILE.name}
            </span>
          </button>

          {/* Centre/Right: Desktop navigation pill */}
          <nav
            ref={navRef}
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full relative transition-all duration-300 ${
              scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm border border-[rgba(13,13,13,0.08)]"
                : "bg-transparent border border-transparent"
            }`}
            aria-label="Main Navigation"
          >
            {/* Sliding indicator pill */}
            <div
              className="absolute h-[calc(100%-12px)] top-[6px] rounded-full bg-[#0d0d0d] transition-all duration-300 ease-[var(--ease)] pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />

            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden px-4 py-2 rounded-full text-xs font-semibold tracking-tight border transition-all duration-300 cursor-pointer ${
              scrolled
                ? "bg-white/90 backdrop-blur-md border-[rgba(13,13,13,0.1)] text-[#0d0d0d]"
                : "bg-transparent border-[#0d0d0d] text-[#0d0d0d]"
            }`}
            aria-expanded={mobileOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#f4f2ee] md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-500 ease-[var(--ease)] ${
          mobileOpen
            ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] opacity-100 pointer-events-auto"
            : "[clip-path:polygon(0_0,100%_0,100%_0,0_0)] opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col gap-6">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="flex items-baseline gap-4 text-left group cursor-pointer focus:outline-none"
              style={{
                transitionDelay: `${mobileOpen ? idx * 50 : 0}ms`,
              }}
            >
              <span className="font-mono text-xs text-[#77756f]">
                {item.index}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[#0d0d0d] group-hover:text-[#77756f] transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="pt-8 border-t border-[rgba(13,13,13,0.1)] flex flex-col gap-2">
          <p className="text-xs text-[#77756f] uppercase tracking-wider font-mono">
            Direct Reach
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-sm font-semibold text-[#0d0d0d] hover:underline"
          >
            {PROFILE.email}
          </a>
          <p className="text-xs text-[#77756f]">{PROFILE.location}</p>
        </div>
      </div>
    </>
  );
}
