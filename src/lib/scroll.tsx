"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePrefersReducedMotion } from "./hooks";

export { useLenis };

export function scrollToTarget(targetId: string, offset = -70) {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const element = document.getElementById(targetId);
  if (!element) return;

  const lenisInstance = (window as unknown as { __lenis?: { scrollTo: (el: HTMLElement, opts?: any) => void } }).__lenis;
  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    lenisInstance.scrollTo(element, { offset, duration: 1.2 });
  } else {
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

function GlobalLenisBridge() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      (window as unknown as { __lenis?: any }).__lenis = lenis;
    }
  }, [lenis]);
  return null;
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      }}
    >
      <GlobalLenisBridge />
      {children}
    </ReactLenis>
  );
}
