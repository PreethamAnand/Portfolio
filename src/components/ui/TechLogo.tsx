"use client";

import React from "react";

export const BRAND_MAP: Record<string, string> = {
  python: "/logos/python.svg",
  java: "/logos/java.svg",
  javascript: "/logos/javascript.svg",
  typescript: "/logos/typescript.svg",
  html5: "/logos/html5.svg",
  css3: "/logos/css3.svg",
  react: "/logos/react.svg",
  flask: "/logos/flask.svg",
  fastapi: "/logos/fastapi.svg",
  streamlit: "/logos/streamlit.svg",
  mysql: "/logos/mysql.svg",
  sql: "/logos/sql.svg",
  git: "/logos/git.svg",
  github: "/logos/github.svg",
  vscode: "/logos/vscode.svg",
  pandas: "/logos/pandas.svg",
  numpy: "/logos/numpy.svg",
  opencv: "/logos/opencv.svg",
  keras: "/logos/keras.svg",
  tensorflow: "/logos/tensorflow.svg",
  graphql: "/logos/graphql.svg",
  langchain: "/logos/langchain.svg",
  xgboost: "/logos/xgboost.svg",
  chromadb: "/logos/chromadb.svg",
  deloitte: "/logos/deloitte.svg",
  codechef: "/logos/codechef.svg",
  hackerrank: "/logos/hackerrank.svg",
  "scikit-learn": "/logos/scikit-learn.svg",
  sklearn: "/logos/scikit-learn.svg",
  pytorch: "/logos/pytorch.svg",
};

export const CONCEPT_COLORS: Record<string, string> = {
  ml: "#6366F1",
  dl: "#8B5CF6",
  nlp: "#0D9488",
  rag: "#A855F7",
  agents: "#F59E0B",
  feature: "#0284C7",
  math: "#0284C7",
  eval: "#E11D48",
  metrics: "#E11D48",
  prompt: "#06B6D4",
  rest: "#10B981",
  cursor: "#7C3AED",
  systems: "#2563EB",
  academic: "#059669",
  vibe: "#EC4899",
  multi: "#8B5CF6",
  experience: "#3B82F6",
  hackathon: "#F59E0B",
};

export function isBrand(name: string): boolean {
  return !!BRAND_MAP[name.toLowerCase()];
}

export function ConceptIcon({
  name,
  size = 24,
  color,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  const s = size;
  const strokeWidth = 1.7;
  const strokeColor = color || CONCEPT_COLORS[name.toLowerCase()] || "#6366F1";
  const fillAlpha = "0.14";

  switch (name.toLowerCase()) {
    case "rest":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="3" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="M6 12h3M12 9l3 3-3 3M18 12h.01" />
        </svg>
      );
    case "ml":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3.5" fill={strokeColor} fillOpacity="0.2" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "dl":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="2.5" fill={strokeColor} fillOpacity="0.2" />
          <circle cx="6" cy="18" r="2.5" fill={strokeColor} fillOpacity="0.2" />
          <circle cx="18" cy="6" r="2.5" fill={strokeColor} fillOpacity="0.2" />
          <circle cx="18" cy="18" r="2.5" fill={strokeColor} fillOpacity="0.2" />
          <circle cx="12" cy="12" r="2.5" fill={strokeColor} fillOpacity="0.3" />
          <path d="M8 7l8 4M8 17l8-4M7 8v8M17 8v8" />
        </svg>
      );
    case "nlp":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case "rag":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" fill={strokeColor} fillOpacity={fillAlpha} />
          <circle cx="13" cy="11" r="3" fill={strokeColor} fillOpacity="0.2" />
          <path d="m15.5 13.5 3 3" />
        </svg>
      );
    case "agents":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="3" fill={strokeColor} fillOpacity={fillAlpha} />
          <circle cx="8.5" cy="16" r="1.5" fill={strokeColor} />
          <circle cx="15.5" cy="16" r="1.5" fill={strokeColor} />
          <path d="M12 2v5M8 7h8" />
        </svg>
      );
    case "cursor":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l7 17 2.5-6.5L20 12z" fill={strokeColor} fillOpacity="0.18" />
        </svg>
      );
    case "feature":
    case "math":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="M6 18h12M6 6l6 9 6-9" />
        </svg>
      );
    case "eval":
    case "metrics":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "prompt":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="m5 8 4 4-4 4M12 16h6" />
        </svg>
      );
    case "vibe":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h3l3-8 4 16 3-8h3l2 4 2-8" />
        </svg>
      );
    case "multi":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="9" height="9" rx="2" fill={strokeColor} fillOpacity={fillAlpha} />
          <rect x="13" y="2" width="9" height="9" rx="2" fill={strokeColor} fillOpacity={fillAlpha} />
          <rect x="2" y="13" width="9" height="9" rx="2" fill={strokeColor} fillOpacity={fillAlpha} />
          <rect x="13" y="13" width="9" height="9" rx="2" fill={strokeColor} fillOpacity={fillAlpha} />
        </svg>
      );
    case "academic":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "systems":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" fill={strokeColor} fillOpacity={fillAlpha} />
          <rect x="9" y="9" width="6" height="6" fill={strokeColor} fillOpacity="0.3" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case "experience":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "hackathon":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill={strokeColor} fillOpacity={fillAlpha} />
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" fill={strokeColor} fillOpacity={fillAlpha} />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

export interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  color?: string;
}

export function TechLogo({
  name,
  size = 40,
  className = "",
  glow = false,
  glowColor,
  color,
}: TechLogoProps) {
  const brandKey = name.toLowerCase();
  const brandSrc = BRAND_MAP[brandKey];
  const effectiveColor = color || CONCEPT_COLORS[brandKey];

  const glowStyle =
    glow && glowColor
      ? { filter: `drop-shadow(0 0 18px ${glowColor})` }
      : glow && effectiveColor
      ? { filter: `drop-shadow(0 0 16px ${effectiveColor}40)` }
      : glow
      ? { filter: "drop-shadow(0 4px 12px rgba(13,13,13,0.12))" }
      : undefined;

  if (brandSrc) {
    return (
      <div
        className={`inline-flex items-center justify-center transition-transform ${className}`}
        style={{ width: size, height: size, ...glowStyle }}
      >
        <img
          src={brandSrc}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        color: effectiveColor || "#0d0d0d",
        ...glowStyle,
      }}
    >
      <ConceptIcon name={name} size={size * 0.82} color={effectiveColor} />
    </div>
  );
}
