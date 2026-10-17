"use client";

import React, { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Work } from "@/components/sections/Work";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export function App() {
  // Global RevealObserver adds .is-in to .rv and .rv-mask on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(".rv, .rv-mask");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full bg-[#f4f2ee] text-[#0d0d0d] min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
      </main>
      <Contact />
    </div>
  );
}
