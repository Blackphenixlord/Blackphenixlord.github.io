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
    metrics: [
      { value: 'Live', label: 'In production' },
      { value: 'Lead', label: 'Code ownership' },
    ],
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
    metrics: [
      { value: '2', label: 'Trips to Houston' },
      { value: 'Finals', label: 'Competition stage' },
    ],
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: 'nasa-hunch.html',
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
    metrics: [
      { value: '1', label: 'Student selected' },
    ],
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
    metrics: [
      { value: '2', label: 'Platforms bridged' },
    ],
    cover: null,
    gallery: [],
    problem: '',
    approach: '',
    result: '',
    related: '',
  },
];
