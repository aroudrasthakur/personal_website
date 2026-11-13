# Aroudra Thakur — Portfolio

Interactive personal portfolio built with **Astro 5**, **React 18**, **GSAP**, **Motion**, **Three.js**, and **Tailwind CSS v4**.

Live site: [aroudrathakur.vercel.app](https://aroudrathakur.vercel.app/)

## Tech Stack

- **Framework:** Astro 5 (static output, with React islands for interactive components)
- **UI:** React 18, Tailwind CSS v4 plus a custom CSS design system (`src/styles/globals.css`)
- **Animation:** GSAP with ScrollTrigger (section reveals, hero timeline) and Motion (hover effects, staggered badges)
- **3D:** Three.js interactive particle field in the hero
- **Language:** TypeScript
- **Deployment:** Vercel via `@astrojs/vercel` (`output: 'static'`)

## Getting Started

Requires Node.js and npm.

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Updating Content

Almost all site content lives in **`src/lib/data.ts`**. Edit this file instead of the components:

| Export | What it controls |
| ------ | ---------------- |
| `experiences` and `experienceLongDescriptions` | Experience cards and their expanded descriptions (industry, research, on-campus) |
| `projects` | Project cards and spotlight text |
| `publications` | Publications and presentations |
| `newsUpdates` and `newsLastUpdated` | The "Aroudra Times" news panel and its masthead date |

Notes:

- Dates use `YYYY-MM`. Use `endDate: null` for roles that are still ongoing; the UI shows "Present".
- Logos go in `public/logo/` and are referenced from `logoPath`.
- Projects and publications are sorted by priority or date, so new entries only need a unique `id`.
- The homepage stats and skill ticker are defined at the top of `src/pages/index.astro`.

## Project Structure

```
src/
├── components/
│   ├── ThreeHero.tsx              # Three.js particle field (hero background)
│   ├── ExperienceCarousel.tsx     # Experience section (tabs, cards, details)
│   ├── ExperienceGrid.tsx
│   ├── ProjectShowcase.tsx        # Project spotlight and listing
│   ├── ProjectCarousel.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectDescription.tsx
│   ├── PublicationShowcase.tsx    # Publications section
│   ├── SkillTags.tsx              # Motion-animated skill badges
│   ├── SkillTicker.astro          # Scrolling skills ticker
│   ├── ShootingStars.astro
│   ├── YouTubeAmbientPlayer.tsx
│   └── EmailPopup.tsx
├── layouts/
│   └── Layout.astro               # Global layout (nav, footer, GSAP setup)
├── lib/
│   ├── data.ts                    # Experiences, projects, publications, news
│   ├── youtube.ts                 # YouTube helpers
│   └── utils.ts                   # Tailwind class-merge helper
├── pages/
│   ├── index.astro                # Homepage (hero, about, experience, projects, publications)
│   ├── about.astro
│   ├── experiences.astro
│   ├── projects.astro
│   ├── publications.astro
│   └── contact.astro
└── styles/
    └── globals.css                # Design tokens, glassmorphism, utilities
public/
├── fonts/
└── logo/                          # Company, school, and social logos
```

## Deployment

Configured for Vercel (`vercel.json`, framework `astro`). Push to the repository and connect it at [vercel.com](https://vercel.com); each push builds with `npm run build`.
