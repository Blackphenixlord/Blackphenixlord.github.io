/* ──────────────────────────────────────────────────────────────────────────
   The work, in one place.

   index.html and projects.html each carried their own hand-written copy of
   this list, and they had already drifted — the home page showed four
   projects, the projects page showed three, with different wording for the
   same work. Both now render from here, as do the case-study pages.

   ── Adding a visual ──────────────────────────────────────────────────────
   Drop the file in src/imgs/ and set `cover` to its base name (no extension,
   no size suffix), e.g. cover: 'progresso-home'. Run `npm run images` to
   generate the AVIF/WebP/JPEG sizes, and the plate below is replaced by the
   real screenshot everywhere it appears. Same for anything in `gallery`.

   Until then each project shows a generated plate: deliberately a graphic,
   not a mock screenshot, so nothing on the site implies a product shot that
   does not exist.

   ── Adding case-study depth ──────────────────────────────────────────────
   `problem`, `approach` and `result` are optional. Empty ones simply do not
   render, so a half-written case study still reads as finished.

   There is deliberately no `metrics` field. An earlier version had one and it
   filled up with things that are not measurements -- "Live", "Lead",
   "Finals" -- set in huge display type as though they were. If a project ever
   has a real figure worth that treatment, put it in `outcome` where it reads
   as a sentence, or add the field back and use it only for actual numbers.
   ────────────────────────────────────────────────────────────────────────── */
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
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: 'recon.html',
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
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: 'nasa-hunch.html',
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
    cover: null,
    gallery: [],
    problem:
      'A crew on the Moon cannot wait on a round trip to Houston every time someone feels wrong. ' +
      'They need a diagnostic aid that runs on board, with no connection to the ground.',
    approach:
      'A local LLM (served through Ollama) is the reasoner, and a medical knowledge base keeps it ' +
      'honest: the model answers, the knowledge base backs the answer. It is built to run on an ' +
      'NVIDIA Jetson. Sensor and camera inputs are left as open slots rather than filled with ' +
      'plausible fake readings, so nothing in a demo pretends to be data it is not.',
    result: '',
    related: 'nasa-hunch.html',
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
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: 'utrgv.html',
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
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: '',
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
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: 'utrgv.html',
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
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: '',
  },
];
