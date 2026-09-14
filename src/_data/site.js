/* Single source of truth for anything that used to be retyped on every page. */
export default {
  url: 'https://jc-portfolio.codes',
  name: 'Joshua Collado',
  email: 'joshuacollado636@gmail.com',
  tagline: 'Building software that ships, systems that matter.',
  ogImage: '/imgs/og-cover.jpg',
  ogImageAlt: 'Joshua Collado — Building software that ships, systems that matter.',
  themeColor: '#0a0e1a',
  assetVersion: '20260913-3',
  buildYear: new Date().getFullYear(),

  /* ── Contact form ────────────────────────────────────────────────────────
     Fill in ONE of these and the form starts sending for real: the visitor
     types, hits send, and sees a confirmation without ever leaving the page.

     Easiest — Web3Forms, no account needed:
       1. https://web3forms.com  ->  enter this email  ->  they send you a key
       2. paste it below as contactAccessKey
       That is the whole setup. The endpoint defaults itself.

     Or any service that accepts a plain form POST (Formspree, Getform, your
     own Cloudflare Worker): put its URL in contactEndpoint and leave the key
     blank.

     With both empty the form composes the message on the page instead and
     lets the visitor send or copy it -- no third party involved, which is
     the only thing a static site can do entirely on its own. */
  contactAccessKey: '',
  contactEndpoint: '',

  /* Display names for project categories. Capitalising the slug gave
     "Nasa", "Vr" and "Ai", which is worse than not labelling them. */
  categoryLabels: {
    web: 'Web',
    security: 'Security',
    fullstack: 'Full-Stack',
    nasa: 'NASA',
    hardware: 'Hardware',
    vr: 'VR / XR',
    research: 'Research',
    ai: 'AI',
    automation: 'Automation',
  },

  /* Primary navigation. `key` matches a page's `navKey` front matter to mark it current. */
  nav: [
    { key: 'home',         label: 'Home',         href: '/index.html' },
    { key: 'about',        label: 'About',        href: '/about.html' },
    { key: 'internships',  label: 'Internships',  href: '/internships.html' },
    { key: 'projects',     label: 'Projects',     href: '/projects.html' },
    { key: 'resume',       label: 'Résumé',       href: '/resume.html' },
    { key: 'testimonials', label: 'Testimonials', href: '/testimonials.html' },
    { key: 'contact',      label: 'Contact',      href: '/contact.html' },
  ],
};
