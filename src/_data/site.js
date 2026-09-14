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

  /* Contact form endpoint. Paste a Formspree ("https://formspree.io/f/xxxxxxxx")
     or Web3Forms URL here and the form posts for real, with an inline success
     state and no mail client involved. Left empty, the form degrades to a
     prefilled mailto: and says so honestly rather than claiming it sent. */
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
