# Preetham Anand — Personal Portfolio

A clean, light, smooth, and production-ready portfolio website engineered for **Preetham Anand** (Full Stack Developer & AI/ML Engineer). Built strictly following modern front-end design principles inspired by quiet Awwwards "Site of the Day" showcases: white, black, and warm gray surfaces, continuous scroll, self-hosted typography, and zero fabricated data.

---

## 1. Non-Negotiable Rules & Truthfulness

Every piece of information across this portfolio comes directly from `resume.pdf` (and its hyperlinked profiles).
- **Zero Fabrication**: No invented clients, metrics, testimonials, or social links. LinkedIn was not present in the résumé and has therefore been omitted.
- **Palette**: Monochromatic warm paper (`#f4f2ee`), pure white card surfaces (`#ffffff`), and rich ink (`#0d0d0d`). The only colors are official brand logos for tech stack and coding platforms with soft ambient glows.
- **Continuous Scroll**: No loaders, no curtains, no page transitions. Smooth, frictionless navigation via Lenis.
- **Lightweight**: First-load JavaScript footprint is ~133 kB with self-hosted variable fonts and zero external runtime scripts or CDN dependencies.
- **Responsive**: Perfectly responsive from 360 px to 1920 px with zero horizontal overflow (`document.documentElement.scrollWidth === innerWidth`).

---

## 2. Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) with [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with CSS variables design system
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) (the only animation dependency)
- **Self-Hosted Fonts**:
  - `Inter Tight` (variable): display titles and body typography
  - `Instrument Serif` (regular + italic): subtle editorial italic accent words
  - `JetBrains Mono` (variable): indices, tags, counters, and metadata
- **Media Pipeline**: Python 3.12, FFmpeg 7.1, NumPy, and Pillow

---

## 3. Sections Architecture

| Order | Section | Component | Key Interactions & Details |
| :--- | :--- | :--- | :--- |
| **00** | **Navigation** | `src/components/Navigation.tsx` | Frosted glass pill (`backdrop-filter: blur(12px)`), spinning initials monogram, sliding ink indicator tracking active section, 2 px top scroll progress bar, mobile full-screen clip-path overlay. |
| **01** | **Hero** | `src/components/hero/Hero.tsx` | Looping 768×960 video with `mix-blend-mode: multiply`, background whitening (`colorlevels`), giant ghost outlined first name behind person, auto-unmuted on interaction, IntersectionObserver pausing video when <35% visible, round 46 px sound control. |
| **02** | **About** | `src/components/sections/About.tsx` | 3-column layout with verbatim résumé summary, hanging realistic lanyard ID card (30×56 px strap, metal clip, damped pendulum swing reacting to pointer movement, 3D flip on hover/tap/keyboard), and credentials breakdown. |
| **03** | **Skills** | `src/components/sections/Skills.tsx` | "The Periodic Table of my Stack": 8-column responsive grid with atomic numbers and 2-letter symbols, family filter chips (Languages, Frontend, Backend, AI & ML, Tools), diagonal wave entrance, sticky 320 px inspector with official 150 px brand logos. |
| **04** | **Work** | `src/components/sections/Work.tsx` | Expanding accordion gallery with side-by-side tall panels (expanding to flex 8, slim spines with rotated titles), feature lists, tech chips, and pure CSS/JSX grayscale illustrative mini-UIs. |
| **05** | **Certifications** | `src/components/sections/Certifications.tsx` | "Always learning." on white band with hairline borders. Numbered cards with ink-flood hover transition (`scaleX: 0 → 1`), sliding ↗ arrow, and Deloitte / AI tools accreditation details. |
| **06** | **Experience** | `src/components/sections/Experience.tsx` | Unified chronological path combining B.Tech education (CGPA 8.66) and internships (Nirvaha Wellness, Cothon Solutions, Edunet SAP × Microsoft × AICTE). Dynamic vertical spine drawing on scroll, ending in dashed "Next — Your team?" card. |
| **07** | **Achievements** | `src/components/sections/Achievements.tsx` | Pinned horizontal gallery (`position: sticky; height: 100svh`) sliding track on scroll, progress bar, 72 px brand tiles with soft glows, nearest center card elevation (+12 px), and `easeOutQuart` number count-up ending with "and counting →". |
| **08** | **Contact & Footer**| `src/components/sections/Contact.tsx` | "Let's build something together" heading with individual bouncing hover letters, underlined email with copy chip ("Copied ✓" aria-live), telephone link, GitHub, CodeChef, HackerRank links, spinning "Say Hello" badge, and copyright footer. |

---

## 4. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v22)
- npm 10+ (tested on npm 11)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 5. Hero Video Pipeline (`scripts/build-hero-assets.py`)

The hero asset pipeline automates video cropping, background whitening, and seamless audio/video loop synthesis.

### Pipeline Steps:
1. **Centering & Crop**: Crops the 1280×720 intro video tightly around the centered character at 576×720 (ratio 4:5), perfectly avoiding watermarks, and scales to 768×960 with Lanczos interpolation.
2. **Background Whitening**: Applies `colorlevels=rimax=0.98:gimax=0.98:bimax=0.98` to shift the studio off-white backdrop to pure `#ffffff`, allowing `mix-blend-mode: multiply` to seamlessly blend into `--paper` (`#f4f2ee`).
3. **Seamless Video Loop**: Trims first 10.0 s of footage, crossfading the last 0.5 s into the first 0.5 s via FFmpeg `xfade=transition=fade:duration=0.5:offset=9.0` at constant 24 fps.
4. **Sample-Accurate Audio Crossfade**: Extracts raw 48 kHz stereo PCM audio, blends the last 0.5 s (24,000 samples) with the first 0.5 s in NumPy using linear weighting, preventing audio dropouts or audible clicks.
5. **Dual Export**:
   - `public/hero/hero.mp4`: H.264 YUV420p (CRF 24, `-preset slow`, AAC 96 kbps, `+faststart`)
   - `public/hero/hero.webm`: VP9 (CRF 36, Opus 80 kbps)
6. **Portrait & OG Generation**:
   - `public/portrait-bust.webp`: 480×600 head-to-shirt crop of Preetham in suit and event lanyard.
   - `public/og.jpg`: 1200×630 OpenGraph card with warm paper branding.

### Rebuilding Hero Assets:
```bash
python scripts/build-hero-assets.py
```

---

## 6. Credits & Logo Licenses

All third-party brand logos used in this project are official vector graphics under open-source licenses:
- **Devicon** (`public/logos/DEVICON-LICENSE.txt`): MIT License. Python, Java, JavaScript, TypeScript, React, HTML5, CSS3, Flask, FastAPI, Streamlit, MySQL, Git, GitHub, VS Code, Pandas, NumPy, OpenCV, Keras, TensorFlow, GraphQL.
- **Simple Icons** (`public/logos/SIMPLE-ICONS-LICENSE.txt`): CC0 1.0 Universal. CodeChef, HackerRank, LangChain.
- **Custom Vector Graphics**: Deloitte, SQL, XGBoost, ChromaDB, and conceptual SVG line icons created in-house for this portfolio.

---

## 7. Verification & Automated Quality Checks

Run the automated Playwright end-to-end test suite:
```bash
node scripts/test-e2e.mjs
```
The test verifies:
- `Console Errors`: 0 errors or warnings
- `Horizontal Overflow`: Verified `document.documentElement.scrollWidth === innerWidth` on both 1440×900 desktop and 390×844 mobile
- `Interactive Elements`: Hero sound unlock/toggle, ID card 3D flip (hover, click, and keyboard `Enter`), periodic table filter chips, expanding work accordion, and clipboard email copy functionality.
