# INSIDE F1

An interactive educational experience exploring Formula 1 — 3D car exploration, aerodynamics, DRS, driver/team standings, race circuits, and more.

![CI](https://github.com/<owner>/inside-f1/actions/workflows/ci.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?logo=tailwindcss)
![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-3D-blue)

## Features

- **Interactive 3D F1 Car** — Ferrari F1-75 model with orbit controls, Draco-compressed (~2 MB)
- **Parts Explorer** — Left sidebar listing 18 car parts (external + internal). Click to zoom camera and view detailed info in a right-side panel.
- **Exploded View** — Animated component separation to visualize car assembly
- **Airflow Visualization** — Particle streamlines showing aerodynamic flow patterns
- **DRS Animation** — Rear wing drag reduction system opening/closing
- **Guided Chapters** — What is F1, The F1 Car, Drivers, Teams, Race Weekend
- **Live Standings** — Driver and constructor standings for any season (2000–present) via Ergast API
- **F1 Circuits** — 24 track layouts with country flags, SVG circuit shapes, and race info
- **Engine Sound** — Spatial audio engine sound tied to interactions
- **Performance Optimized** — Adaptive DPR, baked shadows, lazy-loaded chapters, API caching with retry and deduplication

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Makefile Commands

| Command       | Description                                    |
|---------------|------------------------------------------------|
| `make ci`     | Full pipeline — install, lint, build            |
| `make dev`    | Start development server                       |
| `make build`  | Production build                               |
| `make lint`   | Run ESLint                                     |
| `make start`  | Run production server                          |
| `make clean`  | Remove `.next/` and `node_modules/`            |

## Project Structure

```
inside-f1/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout, fonts, metadata, preload hints
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles, scrollbar, CSS variables
│   └── favicon.ico
├── components/                 # React components
│   ├── Scene.tsx               # 3D canvas, performance monitor, shadows
│   ├── F1Car.tsx               # GLB model loader (Draco), material setup
│   ├── HeroSection.tsx         # Main orchestrator — landing, chapters, toolbar
│   ├── Navigation.tsx          # Top nav bar with home button
│   ├── PartsListSidebar.tsx    # Left sidebar with clickable parts list
│   ├── InfoPanel.tsx           # Right-side sliding info panel for car parts
│   ├── CameraRig.tsx           # GSAP camera animations
│   ├── ChapterOverlay.tsx      # Top chapter tab navigation
│   ├── ToolBar.tsx             # Bottom toolbar (Exploded, Airflow, DRS)
│   ├── IntroSequence.tsx       # Cinematic intro with GSAP timeline
│   └── chapters/               # Lazy-loaded informational chapter pages
├── config/                     # Centralized configuration
│   ├── camera.ts               # Camera positions, transitions
│   ├── airflow.ts              # Particle settings
│   ├── drs.ts                  # DRS animation config
│   ├── explodedView.ts         # Explosion offsets per part
│   └── performance.ts          # WebGL performance settings
├── contexts/                   # React context providers
├── data/                       # Static data (car parts, chapters, circuits)
├── services/
│   └── f1Api.ts                # Ergast + OpenF1 API client with caching
├── utils/                      # Camera controls, intro events, mesh mapping, engine sound
├── public/
│   └── models/
│       ├── f1car.glb           # Draco-compressed Ferrari F1-75 (~2 MB)
│       └── MODEL_ATTRIBUTION.md
├── .github/workflows/ci.yml   # GitHub Actions CI pipeline
├── Dockerfile                  # Multi-stage production Docker image
├── Makefile                    # Local build commands
└── package.json
```

## Environment Variables

**No environment variables are required.** The app uses only public APIs (Ergast F1 / OpenF1) with no authentication keys.

- All `.env*` files are excluded from git via `.gitignore`
- All `.env*` files are excluded from Docker via `.dockerignore`
- No secrets exist in the codebase

## Deployment

### Docker (GCP Cloud Run)

```bash
docker build -t inside-f1 .
docker run -p 3000:3000 inside-f1
```

Deploy to Cloud Run:

```bash
gcloud run deploy inside-f1 \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated
```

### Vercel

```bash
npx vercel
```

### Local Production Build

```bash
make ci        # or: npm ci && npm run lint && npm run build
npm start
```

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Framework | Next.js 14 (App Router)             |
| Language  | TypeScript 5                        |
| 3D        | React Three Fiber, Drei, Three.js   |
| Animation | GSAP (camera/3D), Framer Motion (UI)|
| Styling   | Tailwind CSS 3.4                    |
| Data      | Ergast F1 API, OpenF1 API           |
| CI        | GitHub Actions                      |

## Assets

| Asset        | Path                     | Notes                              |
|--------------|--------------------------|------------------------------------|
| F1 Car Model | `public/models/f1car.glb`| Draco-compressed Ferrari F1-75     |
| Country Flags| CDN                      | Loaded from flagcdn.com            |

See `public/models/MODEL_ATTRIBUTION.md` for 3D model license details.

## License

MIT. See asset attribution files in `public/` for third-party asset licenses.
