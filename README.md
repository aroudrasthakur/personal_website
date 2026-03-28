# Aroudra Thakur — Portfolio (Astro 6)

Modern, interactive portfolio website built with **Astro 6**, **React 18**, **GSAP**, **Motion**, **Three.js**, and **Tailwind CSS v4**.

## Tech Stack

- **Framework:** Astro 6 (static site generation + React islands)
- **Animations:** GSAP + ScrollTrigger (section reveals, hero timeline) · Motion (hover effects, stagger animations)
- **3D:** Three.js (interactive particle field on hero)
- **Styling:** Tailwind CSS v4 + custom CSS design system
- **Deployment:** Vercel (static adapter)

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:4321
npm run build      # → production build in dist/
npm run preview    # → preview production build
```

## Project Structure

```
src/
├── components/          # React island components
│   ├── ThreeHero.tsx    # Three.js particle field (hero background)
│   ├── SkillTags.tsx    # Motion-animated skill badges
│   ├── ExperienceCarousel.tsx
│   ├── ProjectCarousel.tsx
│   ├── ExperienceGrid.tsx
│   ├── ProjectGrid.tsx
│   └── EmailPopup.tsx
├── layouts/
│   └── Layout.astro     # Global layout (nav, footer, GSAP setup)
├── lib/
│   ├── data.ts          # All experience & project data
│   └── utils.ts         # Tailwind class merge helper
├── pages/
│   ├── index.astro      # Homepage
│   ├── about.astro      # About + skills
│   ├── experiences.astro
│   ├── projects.astro
│   └── contact.astro
└── styles/
    └── globals.css      # Design tokens + glassmorphism + utilities
```

## Deployment

Configured for Vercel. Push to your repository and connect via [vercel.com](https://vercel.com).
