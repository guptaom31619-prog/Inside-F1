# Inside F1

Interactive 3D educational demo that explores Formula 1 — car engineering, aerodynamics, DRS, drivers, teams, and race weekends.

[![CI](https://github.com/guptaom31619-prog/Inside-F1/actions/workflows/ci.yml/badge.svg)](https://github.com/guptaom31619-prog/Inside-F1/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=threedotjs&logoColor=white)](https://docs.pmnd.rs/react-three-fiber)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Demo project** — built to showcase interactive 3D web experiences with Next.js and React Three Fiber. Not a production deployment.

---

## Features

- **Interactive 3D F1 car** — Ferrari F1-75 (Draco-compressed GLB) with orbit controls
- **Parts explorer** — click parts to zoom the camera and open detailed info panels
- **Exploded view** — animated component separation
- **Airflow visualization** — particle streamlines for aero flow
- **DRS animation** — rear wing open / close
- **Guided chapters** — What is F1, The Car, Drivers, Teams, Race Weekend
- **Live standings** — driver & constructor data by season (public F1 APIs)
- **Circuit guide** — track layouts, flags, and race-weekend context

## Quick start

```bash
git clone https://github.com/guptaom31619-prog/Inside-F1.git
cd Inside-F1
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `make ci` | Install + lint + build (local CI parity) |

**Requirements:** Node.js 18+

No environment variables required. The app uses public F1 APIs only.

## Project structure

```
Inside-F1/
├── app/                  # Next.js App Router (layout, page, styles)
├── components/           # UI + 3D scene components
│   └── chapters/         # Lazy-loaded chapter screens
├── config/               # Camera, airflow, DRS, exploded-view settings
├── contexts/             # React context providers
├── data/                 # Static content (parts, chapters, circuits)
├── services/             # F1 API client (caching, retries)
├── utils/                # Camera helpers, mesh mapping, engine sound
├── public/models/        # 3D car model + attribution
└── .github/workflows/    # CI — lint, typecheck, build on every push
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| 3D | React Three Fiber, Drei, Three.js |
| Motion | GSAP, Framer Motion |
| Styling | Tailwind CSS |
| Data | Ergast / Jolpi F1 API, OpenF1 |
| CI | GitHub Actions |

## CI

Every push and pull request runs:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Assets

| Asset | Path | Notes |
|-------|------|-------|
| F1 car model | `public/models/f1car.glb` | Ferrari F1-75, Draco-compressed (~2 MB) |

See [`public/models/MODEL_ATTRIBUTION.md`](public/models/MODEL_ATTRIBUTION.md) for license details (CC-BY-NC-4.0).

## License

MIT for the application code. Third-party 3D assets remain under their original licenses — see attribution files under `public/`.
