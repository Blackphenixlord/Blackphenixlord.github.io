# jc-portfolio.codes

Personal portfolio for Joshua Collado. Static site, built with
[Eleventy](https://www.11ty.dev/), deployed to GitHub Pages by Actions.

```bash
npm install
npm run serve     # http://localhost:5173, rebuilds on save
npm run build     # writes _site/
```

`_site/` is generated — never edit it, and never commit it.

---

## Where things live

```
src/
  _data/
    site.js            Domain, nav, contact endpoint, accent presets
    projects.js        The work. Both project pages and the case studies read this.
  _includes/
    base.njk           The page shell every page uses
    partials/          head, nav, footer, command palette, tweaks, project visual
  *.html               One file per page — front matter + the content unique to it
  work.njk             Paginates projects.js into /work/<slug>.html
  sitemap.njk          Generated from the page collection + projects
  style.css            One stylesheet, token-driven
  app.js               Shared chrome: nav, cursor, scroll, palette, tweaks, carousel
  motion.js            Page transitions, smooth scroll, magnetic buttons, count-up
  page-*.js            Behaviour that belongs to exactly one page
  sounds.js            Web Audio UI sounds — fetched only when switched on
  imgs/_src/           Full-size originals (never served)
  imgs/                Generated derivatives (served)
tools/build-images.mjs  Makes those derivatives
```

Pages are plain HTML with front matter. The shared chrome is in `_includes`, so
a change to the nav is one edit, not twelve.

---

## Common tasks

### Add a project

Append an entry to `src/_data/projects.js`. That single entry produces a card on
the home page, a row on the projects page, and a case study at
`/work/<slug>.html` — plus its sitemap entry and structured data.

`tier: 'flagship'` gives a project a full-width row with its visual beside the
copy. `tier: 'standard'` puts it in the two-up grid below.

### Add a screenshot

1. Put the full-size file in `src/imgs/_src/`
2. `npm run images`
3. Set `cover: 'file-base-name'` on the project (no extension, no size suffix)

Until a project has a `cover` it renders a generated plate — a terminal window
listing its stack. That is deliberate: a placeholder that is obviously a graphic,
rather than anything that could be mistaken for a screenshot that does not exist.

`npm run images` skips derivatives that already exist. Pass `--force` to rebuild.

### Deepen a case study

`problem`, `approach` and `result` on each project are optional prose fields.
Empty ones do not render, so a page with only a summary still reads as finished.

### Turn the contact form on

Fill in **one** value in `src/_data/site.js`:

```js
contactAccessKey: 'your-key-here',   // Web3Forms — no account needed
// or
contactEndpoint: 'https://...',      // Formspree, Getform, your own Worker
```

For Web3Forms: go to web3forms.com, enter the address you want messages sent
to, and they email you a key. Paste it and you are done — the endpoint fills
itself in.

With both empty the form composes the message on the page instead and lets
the visitor send or copy it. That is deliberate: a static site has no server
to receive a POST, so sending for real always means something external. The
composer is the only version that involves nobody else.

Either way the form validates the same, and a send only reports success if the
response body actually confirms it — a 200 carrying `success:false` (wrong key,
quota spent) falls back to the composer rather than lying about it.

### Change the accent colour

`--accent` and `--accent-rgb` in `src/style.css`. Everything accent-tinted
derives from them, including borders, so the whole theme follows. The tweaks
panel swaps them at runtime the same way.

---

## Conventions worth keeping

- **Paths are root-relative** (`/style.css`, `/about.html`). Pages live in
  subdirectories (`/work/`), so relative paths break.
- **Permalinks are pinned to `.html`** in `src/src.11tydata.js`. Eleventy would
  otherwise emit `/about/index.html` and break every existing link.
- **Animate `transform` and `opacity` only.** No keyframe in this stylesheet
  animates layout or paint, and it should stay that way.
- **`.reveal` rests visible.** It is hidden only once `html.js` confirms JS can
  bring it back, so a link preview is never a page of blank sections.
- **Everything in `motion.js` is optional.** With it blocked the site still
  navigates, scrolls and reads.
- **Images use `<picture>`** with AVIF/WebP/JPEG, explicit `width`/`height`, and
  `loading="lazy"`. The dimensions are what keep CLS at zero.

---

## Deploying

Pushing to `main` builds and deploys via `.github/workflows/deploy.yml`.

One-time setup: in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**. The site is no longer served from the repository root.

`src/CNAME` carries the custom domain and is copied into the build.

---

## Measured state

Lighthouse, mobile, against a gzip-serving copy of `_site`:

| | |
|---|---|
| Performance | 96–100 (avg 98.5) |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| CLS | 0 |

No third-party requests — fonts are self-hosted, and YouTube only loads if
someone turns the music on.
