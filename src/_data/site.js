/* Single source of truth for anything that used to be retyped on every page. */
export default {
  url: 'https://jc-portfolio.codes',
  name: 'Joshua Collado',
  email: 'joshuacollado636@gmail.com',
  tagline: 'Building software that ships, systems that matter.',
  ogImage: '/imgs/og-cover.jpg',
  ogImageAlt: 'Joshua Collado — Building software that ships, systems that matter.',
  themeColor: '#0a0e1a',
  assetVersion: '20260913-2',
  buildYear: new Date().getFullYear(),

  /* Primary navigation. `key` matches a page's `navKey` front matter to mark it current. */
  nav: [
    { key: 'home',         label: 'Home',         href: 'index.html' },
    { key: 'about',        label: 'About',        href: 'about.html' },
    { key: 'internships',  label: 'Internships',  href: 'internships.html' },
    { key: 'projects',     label: 'Projects',     href: 'projects.html' },
    { key: 'resume',       label: 'Résumé',       href: 'resume.html' },
    { key: 'testimonials', label: 'Testimonials', href: 'testimonials.html' },
    { key: 'contact',      label: 'Contact',      href: 'contact.html' },
  ],
};
