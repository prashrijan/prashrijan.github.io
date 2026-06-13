/**
 * Single source of truth for everything the experience says about Prashrijan.
 * All copy is grounded in the real portfolio — no fabricated claims.
 */

export const profile = {
  name: "Prashrijan Shrestha",
  short: "Prash",
  role: "Full-Stack Developer",
  location: "Sydney, Australia",
  origin: "Nepal",
  tagline: "Code is a people business.",
  manifesto:
    "I build things for the web and care a little too much about how they feel to use. React and Next.js up front, Node behind, MongoDB underneath, Python in the back pocket. Allergic to \"that's how we've always done it.\"",
  email: "shresthaprashrijan@gmail.com",
  phone: "+61 450 528 184",
  phoneHref: "tel:+61450528184",
  github: "https://github.com/prashrijan",
  githubHandle: "prashrijan",
  linkedin: "https://www.linkedin.com/in/prashrijanshrestha/",
  status: "Open to work",
} as const;

export const stats = [
  { value: "2", label: "Products shipped & live", suffix: "" },
  { value: "3", label: "Certifications earned", suffix: "" },
  { value: "∞", label: "Cups of chiya consumed", suffix: "" },
] as const;

/** Chapter 2 — Curiosity. Memory fragments revealed on interaction. */
export const memories = [
  {
    id: "village",
    title: "A town in Nepal",
    line: "Every developer starts somewhere. Mine was a place with the only non-rectangular flag on Earth.",
    icon: "flag",
  },
  {
    id: "first-machine",
    title: "The first machine",
    line: "A screen that did exactly what you told it — and nothing you didn't. That was the hook.",
    icon: "monitor",
  },
  {
    id: "first-code",
    title: "The first lines",
    line: "Hello, world. Then a calculator. Then a hundred things that didn't work, until one did.",
    icon: "code",
  },
  {
    id: "move",
    title: "Sydney, 2022",
    line: "Moved across the world to study IT at Kent Institute Australia. New city, same obsession.",
    icon: "compass",
  },
] as const;

/** Chapter 3 — Learning. Skills as stars, each with real proof, never a percentage. */
export const skills = [
  {
    name: "React",
    group: "Frontend",
    proof: "The frontend of every project here — Chunaab's live dashboards, Charli's Café.",
    color: "#61dafb",
  },
  {
    name: "Next.js",
    group: "Frontend",
    proof: "This site. Static-exported, scroll-driven, server-rendered where it counts.",
    color: "#ffffff",
  },
  {
    name: "TypeScript",
    group: "Languages",
    proof: "Type-safe components and API contracts across the stack.",
    color: "#3178c6",
  },
  {
    name: "JavaScript",
    group: "Languages",
    proof: "ES6+ everywhere. freeCodeCamp Algorithms & Data Structures certified.",
    color: "#f7df1e",
  },
  {
    name: "Node.js",
    group: "Backend",
    proof: "The engine behind Chunaab's integrity-first, server-side voting logic.",
    color: "#3c873a",
  },
  {
    name: "Express",
    group: "Backend",
    proof: "RESTful APIs with auth, validation and payments wired in.",
    color: "#cccccc",
  },
  {
    name: "MongoDB",
    group: "Data",
    proof: "Document modelling for elections, candidates and live results.",
    color: "#4db33d",
  },
  {
    name: "SQL",
    group: "Data",
    proof: "HackerRank SQL certified. Relational modelling when the data demands it.",
    color: "#e38c00",
  },
  {
    name: "Python",
    group: "Languages",
    proof: "Scripting, automation and data work — the back-pocket language.",
    color: "#4b8bbe",
  },
  {
    name: "Tailwind CSS",
    group: "Frontend",
    proof: "Design systems that stay consistent without fighting the cascade.",
    color: "#38bdf8",
  },
  {
    name: "Express APIs",
    group: "Backend",
    proof: "REST endpoints designed around real product flows, not CRUD for its own sake.",
    color: "#999999",
  },
  {
    name: "Git",
    group: "Tooling",
    proof: "Version control as a daily habit — github.com/prashrijan.",
    color: "#f05032",
  },
] as const;

/** Chapter 4 — Building. Real, shipped products. */
export const projects = [
  {
    id: "charlis",
    name: "Charli's Café",
    kind: "Café website · Newport, Sydney · real client",
    year: "2025",
    summary:
      "Designed and shipped the complete web presence for a working Northern Beaches café — menu, story, hours, the lot.",
    impact: [
      "Turns local Google searches into counter orders and table bookings — more new faces through the door.",
      "Hand-built, fast-loading frontend tuned for phones, where hungry people actually browse.",
      "Owned the work end to end: design → launch.",
    ],
    tags: ["Design → Launch", "Responsive", "Local SEO", "Real business"],
    stack: ["JavaScript", "Responsive UI", "Local SEO"],
    live: "https://charliscafe.com.au",
    accent: "#e0a96d",
    video: "/charlis.mp4",
  },
  {
    id: "chunaab",
    name: "Chunaab.com",
    kind: "Online voting platform · solo build",
    year: "2024",
    summary:
      "A secure election platform with real-time dashboards, live status updates and candidate management.",
    impact: [
      "Tamper-proof voting backed by integrity-first backend logic and server-side automation.",
      "Real-time dashboards and live status updates for every election.",
      "Built-in payments — two free elections per user, then monetised.",
    ],
    tags: ["Real-time", "Security", "Payments", "Solo build"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "https://chunaab.com",
    accent: "#7c5cff",
    video: null,
  },
] as const;

/** Chapter 5 — Problem Solver. How Prash thinks, shown not told. */
export const thinking = [
  {
    title: "Integrity by design",
    body: "For Chunaab, a vote can never be trusted to the client. Tallying, validation and rate-limits live server-side, so the result is correct even when the browser lies.",
    facet: "Backend architecture",
  },
  {
    title: "Model the real thing",
    body: "Elections, candidates, ballots and receipts map to documents that mirror how an election actually runs — not a generic CRUD table.",
    facet: "Database design",
  },
  {
    title: "Ship for the phone",
    body: "Charli's customers browse on mobile, mid-commute, hungry. So the build is measured in load time and thumb-reach before anything else.",
    facet: "Performance & UX",
  },
  {
    title: "Make money the boundary",
    body: "Two free elections, then payments. The free tier proves value; the paywall sits exactly where the value becomes obvious.",
    facet: "Product thinking",
  },
] as const;

/** Chapter 6 — The Future. Goals as a city under construction. */
export const future = [
  {
    title: "Full-Stack Engineering",
    body: "Go deeper across the stack — distributed systems, observability, the unglamorous reliability work that makes products trustworthy.",
    status: "In progress",
  },
  {
    title: "AI-native products",
    body: "Build with LLMs as a material, not a gimmick — retrieval, agents and interfaces that get out of the way.",
    status: "Breaking ground",
  },
  {
    title: "Product development",
    body: "Own outcomes, not tickets. Sit close to users and ship the thing that actually moves the number.",
    status: "Framing",
  },
  {
    title: "Entrepreneurship",
    body: "Chunaab was the first product I owned end to end. It won't be the last.",
    status: "Foundations",
  },
] as const;

/** Education + certifications. */
export const education = {
  degree: "Bachelor of Information Technology",
  school: "Kent Institute Australia — Sydney",
  period: "2022 → 2025",
} as const;

export const certifications = [
  { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp" },
  { name: "React Certification", issuer: "HackerRank" },
  { name: "SQL Certification", issuer: "HackerRank" },
] as const;

/** Chapter titles for the HUD / progress rail. */
export const chapters = [
  { id: 1, key: "beginning", label: "The Beginning" },
  { id: 2, key: "curiosity", label: "Curiosity" },
  { id: 3, key: "learning", label: "Learning" },
  { id: 4, key: "building", label: "Building" },
  { id: 5, key: "problem", label: "Problem Solver" },
  { id: 6, key: "future", label: "The Future" },
  { id: 7, key: "contact", label: "Contact" },
] as const;
