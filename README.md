# Prashrijan Shrestha — A Cinematic Portfolio

An interactive, story-driven portfolio that reimagines the developer résumé as a
seven-chapter journey: from a town in Nepal, through curiosity and learning, into
real shipped products, problem-solving, the future, and a final invitation to
build something together.

Not a list of sections — a campaign you scroll through.

## The seven chapters

1. **The Beginning** — "Every developer starts somewhere."
2. **Curiosity** — floating, interactive memories of the firsts.
3. **Learning** — a 3D galaxy of skills, each star backed by real proof (never a percentage).
4. **Building** — shipped products (Charli's Café, Chunaab.com) as explorable launches.
5. **Problem Solver** — how Prash thinks about architecture, data, performance and product.
6. **The Future** — a procedural city, still under construction, of goals and foundations.
7. **Contact** — a rooftop constellation of ways to get in touch.

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**, statically exported
- **Tailwind CSS v4**
- **Three.js** + **React Three Fiber** + **drei** — the cosmic backdrop, skill galaxy and future city
- **GSAP** (ScrollTrigger) + **Lenis** — scroll-driven, buttery smooth
- **Framer Motion** — cinematic transitions and reveals
- **Zustand** — tiny global state (chapter, theme, sound, achievements)

## Bonus / hidden features

- **Interactive terminal** — click the terminal icon or press `` ` `` (backtick). Try `help`, `whoami`, `goto 4`, `sudo`.
- **Achievement toasts** — unlocked by exploring memories and the terminal.
- **Ambient soundtrack** — procedurally generated (no audio file), shifts per chapter. Toggle in the top-right.
- **Day / Night mode** — top-right toggle.
- **Mouse-reactive starfield** and per-chapter colour grading.
- Fully **reduced-motion aware** — the WebGL and smooth-scroll gracefully step aside.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Deploy (GitHub Pages)

This is a user page served from the repo root. The build produces a static
export in `./out`, deployed by `.github/workflows/deploy.yml` on every push to
`main`.

**One-time setup:** in the repo **Settings → Pages**, set **Source** to
**GitHub Actions** (instead of "Deploy from a branch"). After that, merging to
`main` publishes automatically to https://prashrijan.github.io.

## Performance & accessibility

- Heavy WebGL scenes are dynamically imported and only mount when scrolled into
  view, so they never block first paint.
- `prefers-reduced-motion` disables smooth scroll and swaps the 3D backdrop for
  a static gradient.
- Semantic landmarks, labelled controls, SEO metadata, Open Graph and
  `Person` JSON-LD are all in place.
