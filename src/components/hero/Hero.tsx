"use client";

import React, { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [soundBlocked, setSoundBlocked] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const hasEndedRef = useRef(false);

  // Video autoplay & sound unlocking logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound initially
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setSoundBlocked(false);
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser blocked unmuted autoplay -> play muted
          video.muted = true;
          setIsMuted(true);
          setSoundBlocked(true);
          video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        });
    }

    // Unlock sound on user's first pointerdown, keydown, or touchend
    const unlockSound = () => {
      if (video) {
        video.muted = false;
        setIsMuted(false);
        setSoundBlocked(false);
        if (video.paused && !hasEndedRef.current) {
          video.play();
        }
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    return () => {
      removeListeners();
    };
  }, []);

  // IntersectionObserver pauses video when less than 35% visible, resumes when >35%
  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.35) {
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          } else {
            // Only resume if it hasn't reached the end
            if (video.paused && !hasEndedRef.current) {
              video.play().catch(() => {});
              setIsPlaying(true);
            }
          }
        });
      },
      {
        threshold: [0, 0.35, 0.5, 1.0],
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsPlaying(false);
    setHasEnded(true);
    hasEndedRef.current = true;
  };

  const replayVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    setIsMuted(false);
    setSoundBlocked(false);
    setHasEnded(false);
    hasEndedRef.current = false;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (hasEnded) {
      replayVideo();
      return;
    }

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setSoundBlocked(false);
      if (video.paused && !hasEndedRef.current) {
        video.play();
        setIsPlaying(true);
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 pb-8"
      style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}
    >
      {/* Background Ghost Word: Giant Outlined First Name */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0 text-center w-full"
        aria-hidden="true"
      >
        <span
          className="block font-black uppercase text-[15vw] leading-none tracking-tighter"
          style={{
            WebkitTextStroke: "1.5px rgba(13, 13, 13, 0.16)",
            color: "transparent",
            fontFamily: "var(--font-inter-tight)",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Content Area: Centered Video + Floating Elements */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto flex-1 flex flex-col items-center justify-center">
        {/* Video Wrapper */}
        <div className="relative flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="w-auto h-[60svh] sm:h-[70svh] lg:h-[min(94svh,1000px)] aspect-[768/960] object-contain transition-opacity duration-500"
            style={{
              mixBlendMode: "multiply",
            }}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound & Replay Control: 46px round solid ink button */}
          <div className="absolute bottom-6 right-4 sm:right-8 z-20">
            <div className="relative flex items-center justify-center">
              {soundBlocked && !hasEnded && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0d0d0d] opacity-25" />
              )}
              <button
                onClick={toggleSound}
                className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                aria-label={
                  hasEnded
                    ? "Replay introductory video"
                    : isMuted
                    ? "Unmute introductory video"
                    : "Mute introductory video"
                }
              >
                {hasEnded ? (
                  // Replay icon
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                ) : isMuted ? (
                  // ▶ Triangle (sound off)
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-0.5"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                ) : (
                  // ❚❚ Two bars (sound on)
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hero Info & CTAs */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <div className="font-mono-tag mb-2">00 — Student &amp; Engineer</div>
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#0d0d0d]">
            {PROFILE.headingMain} <span className="font-serif-italic">{PROFILE.headingAccent}</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold text-[#0d0d0d] tracking-tight">
            {PROFILE.secondaryRole}
          </p>
          <p className="mt-2 max-w-xl text-sm sm:text-base text-[#77756f] leading-relaxed">
            {PROFILE.shortAbout}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => scrollToTarget("work")}
            className="btn-pill-primary cursor-pointer flex-1 sm:flex-initial"
          >
            Explore work
          </button>
          <button
            onClick={() => scrollToTarget("contact")}
            className="btn-pill-secondary cursor-pointer flex-1 sm:flex-initial"
          >
            Let's talk
          </button>
          <a
            href={PROFILE.resumePath}
            download="Preetham_Anand_Resume.pdf"
            className="btn-pill-secondary flex-1 sm:flex-initial"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
