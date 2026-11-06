/* JC/OS — everything the pages share. Text here is the site's own copy;
   change it here and every page, the launcher and the meta tags follow. */
export default {
  url: 'https://jc-portfolio.codes',
  name: 'Joshua Collado',
  email: 'joshuacollado636@gmail.com',
  phone: '956-574-2556',
  github: 'https://github.com/Blackphenixlord',
  linkedin: 'https://linkedin.com/in/joshua-collado',
  tagline: 'Building software that ships, systems that matter.',
  ogImage: '/imgs/og-cover.jpg',
  ogImageAlt: 'Joshua Collado — Building software that ships, systems that matter.',
  themeColor: '#0a0e1a',
  buildYear: new Date().getFullYear(),

  /* Contact form. Fill ONE in and the form sends for real:
     - contactAccessKey: a Web3Forms access key (https://web3forms.com, no account).
     - contactEndpoint: any service that accepts a form POST and answers JSON
       (Formspree, Getform, your own Worker).
     Both empty: the form composes the message on the page and lets the
     visitor send it from their own mail app or copy it. */
  contactAccessKey: '',
  contactEndpoint: '',

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

  /* `key` matches a page's navKey; `path` is how the menubar prints it. */
  nav: [
    { key: 'home',         label: 'Home',         href: '/index.html',        path: '~' },
    { key: 'about',        label: 'About',        href: '/about.html',        path: '~/about' },
    { key: 'internships',  label: 'Internships',  href: '/internships.html',  path: '~/internships' },
    { key: 'projects',     label: 'Projects',     href: '/projects.html',     path: '~/projects' },
    { key: 'resume',       label: 'Résumé',       href: '/resume.html',       path: '~/resume' },
    { key: 'testimonials', label: 'Testimonials', href: '/testimonials.html', path: '~/testimonials' },
    { key: 'contact',      label: 'Contact',      href: '/contact.html',      path: '~/contact' },
  ],

  /* The internship pages, in reading order (each links to the next). */
  internships: [
    { href: '/recon.html',      label: 'RECON Technologies' },
    { href: '/nasa-hunch.html', label: 'NASA HUNCH' },
    { href: '/nerdvana.html',   label: 'Nerdvana' },
    { href: '/utrgv.html',      label: 'UTRGV' },
  ],

  /* Hidden things, listed in the footer under `ls -a`. */
  eggs: [
    { how: 'type rick roll in Ctrl+K', what: 'you asked for it' },
    { how: '↑ ↑ ↓ ↓ ← → ← → B A', what: 'overdrive' },
    { how: 'click the JC logo five times', what: 'degauss the screen' },
    { how: 'type sudo in a terminal', what: 'try your luck' },
    { how: 'type matrix in a terminal', what: 'follow the white rabbit' },
  ],
};
