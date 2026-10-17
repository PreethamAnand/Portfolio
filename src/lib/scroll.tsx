"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function scrollToTarget(targetId: string, offset = -70) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const lenisInstance = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenisInstance) {
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
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
