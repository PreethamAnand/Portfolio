"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import type Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function scrollToTarget(targetId: string, offset = -70) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const element = document.getElementById(targetId);
  if (!element) return;

  const lenisInstance = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    lenisInstance.scrollTo(element, { offset, duration: 1.2 });
  } else {
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    let lenisInstance: Lenis | null = null;
    let rafId: number;

    import("lenis").then(({ default: LenisClass }) => {
      lenisInstance = new LenisClass({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenisInstance;
      (window as unknown as { __lenis?: Lenis }).__lenis = lenisInstance;

      function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
