/* The work. Home, /projects.html, the launcher, the sitemap and every
   /work/<slug>.html case study render from this list.

   problem / approach / result are optional and simply do not render when empty.
   photos: real photos of the work, from src/imgs (base name, no size suffix).
   internship: the internship page behind the project, if there is one. */
const nasaPhotos = [
  { src: 'nasa2', alt: 'NASA HUNCH Houston finals', w: 800, h: 1422 },
  { src: 'nasa4', alt: 'NASA HUNCH presentation', w: 800, h: 1422 },
  { src: 'nasa5', alt: 'NASA HUNCH build', w: 800, h: 1422 },
  { src: 'nasa6', alt: 'NASA HUNCH demo', w: 800, h: 1422 },
];
const lanlPhotos = [
  { src: 'lanl2', alt: 'Los Alamos National Laboratory visit', w: 800, h: 600 },
  { src: 'lanl3', alt: 'Los Alamos National Laboratory visit', w: 800, h: 1067 },
  { src: 'lanl4', alt: 'Los Alamos National Laboratory visit', w: 800, h: 600 },
  { src: 'lanl', alt: 'UTRGV LANL program', w: 800, h: 375 },
];

export default [
  {
    slug: 'progresso-civic-platform',
    title: 'City of Progresso — Civic Platform',
    org: 'RECON Technologies',
    years: '2026 – 2027',
    role: 'Code Lead, Security Developer & Design Assistant',
    tier: 'flagship',
    status: 'Shipped',
    categories: ['web', 'security'],
    stack: ['Web Dev', 'Security', 'Civic Tech'],
    summary:
      'A secure digital platform giving Progresso residents centralized access to city ' +
      'information, public services, and official records.',
    outcome:
      'Brought a small South Texas city into the digital era — modern, secure, and publicly accessible.',
    problem: '',
    approach: '',
    result: '',
    photos: [],
    internship: { href: '/recon.html', label: 'RECON Technologies' },
  },
  {
    slug: 'inventory-chain-system',
    title: 'Inventory Chain System',
    org: 'NASA HUNCH',
    years: '2025 – 2026',
    role: 'Full-stack builder and systems teammate',
    tier: 'flagship',
    status: 'Houston finals',
    categories: ['fullstack', 'nasa', 'hardware'],
    stack: ['Full-Stack', 'Hardware', 'NASA', 'Systems Design'],
    summary:
      "A full-stack inventory tracking workflow built for NASA's Human Exploration & " +
      'Operations division. Covers UI, real-time data flow, and multi-team collaboration.',
    outcome:
      'Advanced to the Houston finals and presented directly to NASA representatives.',
    problem: '',
    approach: '',
    result: '',
    photos: nasaPhotos,
    internship: { href: '/nasa-hunch.html', label: 'NASA HUNCH' },
  },
  {
    slug: 'vitals',
    title: 'VITALS — Medical Diagnostic System',
    org: 'NASA HUNCH',
    years: '2026 – 2027',
    role: 'Team lead and diagnostic engine developer',
    tier: 'flagship',
    status: 'In progress',
    categories: ['ai', 'nasa', 'hardware'],
    stack: ['AI / ML', 'Local LLM', 'Knowledge Base', 'NVIDIA Jetson'],
    summary:
      'An offline medical diagnostic assistant for crews far from Earth. A local language ' +
      'model does the reasoning, and a curated medical knowledge base grounds every answer it gives.',
    outcome:
      'Leading Team TETHER through the 2026–27 NASA HUNCH Software & Technology challenge, ' +
      'with the engine, the public site, and the review boards built.',
    problem:
      'A crew on the Moon cannot wait on a round trip to Houston every time someone feels wrong. ' +
      'They need a diagnostic aid that runs on board, with no connection to the ground.',
    approach:
      'A local LLM (served through Ollama) is the reasoner, and a medical knowledge base keeps it ' +
      'honest: the model answers, the knowledge base backs the answer. It is built to run on an ' +
      'NVIDIA Jetson. Sensor and camera inputs are left as open slots rather than filled with ' +
      'plausible fake readings, so nothing in a demo pretends to be data it is not.',
    result: '',
    photos: [],
    internship: { href: '/nasa-hunch.html', label: 'NASA HUNCH' },
    link: { label: 'The project site', title: 'VITALS · Team TETHER', href: '/vitals/' },
  },
  {
    slug: 'vr-training-experience',
    title: 'VR Training Experience',
    org: 'Los Alamos National Laboratory',
    years: '2025 – 2026',
    role: 'XR developer and simulation collaborator',
    tier: 'standard',
    status: 'Delivered',
    categories: ['vr', 'research'],
    stack: ['VR / XR', 'Hardware', 'Research', 'Simulation'],
    summary:
      'A virtual reality training simulation designed for immersive, hands-on instruction ' +
      "in a research environment, built with scientists at one of the US government's top national labs.",
    outcome:
      'Earned an in-person visit to Los Alamos National Laboratory as the only student selected.',
    problem: '',
    approach: '',
    result: '',
    photos: lanlPhotos,
    internship: { href: '/utrgv.html', label: 'UTRGV' },
  },
  {
    slug: 'project-evie',
    title: 'Project Evie',
    org: 'Capstone / Personal',
    years: '2026 – 2027',
    role: 'Product designer and AI systems developer',
    tier: 'standard',
    status: 'In progress',
    categories: ['ai', 'automation'],
    stack: ['AI', 'Android', 'Automation', 'Cross-Platform'],
    summary:
      'A personal AI assistant that bridges Android and Windows into a single automation ' +
      'layer — controlling apps, routines, and devices from one unified interface.',
    outcome:
      'Establishing the foundation for a fully AI-powered home control and productivity system.',
    problem: '',
    approach: '',
    result: '',
    photos: [],
    internship: null,
  },
  {
    slug: 'vla-3d-printing',
    title: 'VLA-Enabled 3D Printing',
    org: 'UTRGV Externship',
    years: '2026 – 2027',
    role: 'Software lead — vision and control',
    tier: 'standard',
    status: 'In progress',
    categories: ['ai', 'hardware', 'research'],
    stack: ['Machine Vision', 'Vision-Language-Action', 'Voron 2.4', 'G-code'],
    summary:
      'A large-format, Voron-based 3D printer with a camera and an ML supervisor that watches ' +
      'each layer, catches defects as they happen, and steps in to correct them.',
    outcome:
      'Scoped the full software plan — control loop, defect responses, training data, and a ' +
      'phased build that proves itself on a small printer before moving to the Voron.',
    problem: '',
    approach: '',
    result: '',
    photos: [],
    internship: { href: '/utrgv.html', label: 'UTRGV' },
  },
  {
    slug: 'screen-deck',
    title: 'Screen Deck',
    org: 'Personal',
    years: '2026',
    role: 'Designer and developer',
    tier: 'standard',
    status: 'In progress',
    categories: ['automation'],
    stack: ['PowerShell', 'WPF', 'Windows', 'Touch UI'],
    summary:
      'A Stream Deck–style touch launcher for a spare touchscreen: tabbed button grids, ' +
      'per-app volume sliders, a soundboard, calendar, notes, and live home-lab stats.',
    outcome:
      'Runs every day on my desk as the control surface for my PC, games, and home lab.',
    problem: '',
    approach: '',
    result: '',
    photos: [],
    internship: null,
  },
];
