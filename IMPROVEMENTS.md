# Portfolio UI Improvements — Claude in VS Code Instructions

> Open this file in VS Code alongside your portfolio files and paste each section
> into Claude as a prompt. Work through them in order — each one builds on the last.

---

## CONTEXT (give this to Claude first)

```
I have a 3-page personal portfolio website:
  - index.html      (home page)
  - resume.html     (résumé)
  - contact.html    (contact form)
  - style.css       (shared styles)
  - icons.css       (SVG icon helpers)

Theme: dark hacker/terminal aesthetic, bg #0a0e1a, accent #00ff41 (green),
fonts: Orbitron (headings), Share Tech Mono (mono), Inter (body).

The site already has: cursor trail, scroll reveal, 3D card tilt on word-cards,
logo matrix-rain easter egg, scanline animation, logo float.
```

---

## PROMPT 1 — Accessibility fixes (WCAG 2.1 AA)

```
Apply these specific accessibility fixes across all three HTML files.

### contact.html
1. Add <label> elements to the contact form inputs — they're missing entirely.
   Replace the three <input>/<textarea> elements with labeled versions:
   <div class="form-field">
     <label for="contact-name">Your Name</label>
     <input id="contact-name" type="text" placeholder="Your Name" required />
   </div>
   (same pattern for email and message textarea)

2. Add aria-label="Send message" to the submit button (it already has text but
   needs it for screen reader context).

3. Add role="alert" aria-live="polite" to the #form-msg paragraph so screen
   readers announce the success message.

### All three HTML files
4. Add a skip-to-content link as the very first element inside <body>:
   <a href="#main-content" class="skip-link">Skip to main content</a>
   Then add id="main-content" to the first <section> or <div class="page-hero">
   on each page.

5. Add aria-label="Main navigation" to every <nav class="navbar">.

6. Every SVG icon inside .skill-tag, .resume-block-header, and .contact-links
   that is purely decorative should get aria-hidden="true".
   The contact-links <a> tags already have text labels so their SVGs are decorative.

7. Add a visible focus style in style.css — current focus is browser default
   and barely visible on dark bg. Add this to style.css:

   :focus-visible {
     outline: 2px solid #00ff41;
     outline-offset: 3px;
     border-radius: 4px;
   }
   /* suppress for mouse users */
   :focus:not(:focus-visible) { outline: none; }

   Also add this .skip-link style:
   .skip-link {
     position: absolute; top: -100%; left: 16px;
     background: #00ff41; color: #0a0e1a;
     font-family: 'Share Tech Mono', monospace;
     font-size: 0.85rem; font-weight: 700;
     padding: 8px 16px; border-radius: 6px;
     z-index: 9999; transition: top 0.15s;
   }
   .skip-link:focus { top: 16px; }

### Color contrast fix
8. The muted text color #8b949e on background #0a0e1a only achieves ~3.8:1
   contrast — below the 4.5:1 WCAG AA requirement for normal text.
   In style.css, find every instance of `color: #8b949e` and change it to
   `color: #a0aab4` which achieves 4.6:1 on #0a0e1a.
   (hero-sub, section-desc, nav-links a, resume-item p, page-hero p,
    word-card p, terminal-title, video-note, footer)

9. The footer text #3a4a3a on #0a0e1a is only ~1.8:1 — nearly invisible.
   Change `.footer { color: #3a4a3a }` to `color: #5a7a5a`.
```

---

## PROMPT 2 — Motion & performance

```
Add prefers-reduced-motion support and performance improvements to style.css
and all three HTML files.

### style.css
1. Add this block at the very end of style.css:

   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
     .hero-bg-grid { animation: none; }
     .hero-logo { animation: none; }
     .logo-scanline { animation: none; display: none; }
   }

### index.html — script block
2. In the cursor trail mousemove handler, wrap the entire thing in a check:
   if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

3. In the scroll reveal setup, add the same check at the top — if
   prefers-reduced-motion, just set opacity:1 and transform:none immediately
   instead of the animated versions:
   const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   revealEls.forEach((el, i) => {
     if (noMotion) { el.style.opacity = '1'; return; }
     // ... existing animation setup ...
   });

4. Same prefers-reduced-motion guard in resume.html and contact.html scripts.

### Scroll reveal performance
5. In all three files, add `will-change: opacity, transform` to elements
   BEFORE they are observed (inside the forEach that sets opacity:0).
   Then inside the IntersectionObserver callback, after the element reveals,
   set `el.style.willChange = 'auto'` to free the compositing layer.
```

---

## PROMPT 3 — UX copy improvements

```
Improve the microcopy across all three pages. Make exact find-and-replace edits:

### index.html
1. Hero tag: KEEP as-is — "< Hello, World! />" is on-brand and memorable.

2. Hero sub: change
   "Engineer · Developer · Innovator | UTRGV & Science Academy"
   to
   "Engineer · Developer · Builder | UTRGV & Science Academy"
   (Builder is more concrete and humble than "Innovator" for a student portfolio)

3. Video section label: change
   "// my future"
   to
   "// where I'm headed"
   (more conversational, less vague)

4. Section label on highlights: KEEP "// highlights" — clear and correct.

5. Word-card descriptions — make them punchier:
   Innovative card: keep as-is (NASA / Los Alamos names do the work)
   Driven card: change "I'm still just getting started" to "I'm just getting started."
   (drop "still" — sounds uncertain)

### contact.html
6. Page hero subtitle: change
   "joshuacollado636@gmail.com · UTRGV, South Texas"
   to
   "joshuacollado636@gmail.com · South Texas"
   (remove the redundant institution name — it's all over the site already)

7. Submit button text: change
   "Send Message >>"
   to
   "Send it >>"
   (shorter, personality, matches the hacker vibe)

8. Success message: change
   "✓ Message sent! I'll get back to you soon."
   to
   "✓ Sent. I'll get back to you."
   (shorter, confident, no filler "soon")

9. Form placeholder for message textarea: change
   "Your message..."
   to
   "What's on your mind?"
   (warmer, more inviting)

### resume.html
10. Page hero label: KEEP "// résumé" — clean.

11. Section header: "PRACTICUM OF ENGINEERING INTERNSHIPS — 2025–2026"
    This is very long. Change to: "ENGINEERING INTERNSHIPS — 2025–2026"

12. In the skills block body: rewrite the flat dot-separated list as a
    slightly more readable format — wrap each skill in its own <span> with
    a `·` separator:
    "Full-Stack Dev · Project Lead · Security · Hardware · Web Design"
    (consolidate the 6 verbose labels into 5 cleaner ones)
```

---

## PROMPT 4 — Visual design upgrades

```
Make these targeted visual improvements in style.css and the HTML files.

### Active nav indicator
1. The current .nav-links a.active only gets a green border-bottom.
   Make it more obvious. In style.css change the active/hover rule to:
   .nav-links a:hover, .nav-links a.active {
     color: #00ff41;
     border-bottom-color: #00ff41;
     text-shadow: 0 0 12px rgba(0,255,65,0.4);
   }

### Word cards — icon upgrade
2. The .icon-svg elements in the three word cards have no size or stroke set
   in CSS. Add to style.css:
   .icon-svg {
     width: 40px; height: 40px;
     stroke: #00ff41; fill: none;
     stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
     margin-bottom: 16px;
   }

### Terminal cursor — blinking fix
3. The cursor blink in index.html uses setInterval toggling opacity via JS.
   Replace it with a CSS animation instead. In style.css add:
   @keyframes cursorBlink {
     0%, 49% { opacity: 1; }
     50%, 100% { opacity: 0; }
   }
   .cursor { animation: cursorBlink 1s step-start infinite; }

   Then remove the JS cursor blink setInterval from index.html entirely
   (the 3 lines: const cursorEl... setInterval...).

### Contact page — form spacing
4. The contact links below the form feel disconnected.
   In style.css, change the margin on .contact-links from margin-top: 36px
   to margin-top: 48px and add a subtle separator:
   .contact-links {
     ...existing rules...
     margin-top: 48px;
     padding-top: 36px;
     border-top: 1px solid #1a3a1a;
   }

### Resume blocks — left accent line
5. Add a visual indicator to each resume block header. In style.css, add
   to .resume-block-header:
   border-left: 3px solid #00ff41;
   padding-left: 25px; /* was 28px, reduce by 3px to compensate */

### Footer — add current year dynamically
6. In all three HTML files, change the hardcoded year in the footer:
   Replace: © 2026 Joshua Collado
   With:    © <span id="footer-year">2026</span> Joshua Collado
   Then add at the bottom of each <script> block (or inline before </body>):
   const y = document.getElementById('footer-year');
   if (y) y.textContent = new Date().getFullYear();

### Section title margin
7. In style.css, .section-title currently has margin-bottom: 10px which is
   very tight before the section-desc. Change to margin-bottom: 14px.
```

---

## PROMPT 5 — Mobile nav & touch targets

```
Fix mobile usability issues.

### style.css — touch targets
1. WCAG 2.5.5 requires 44×44px touch targets. The hamburger button is only
   styled with font-size, no padding. Fix:
   .hamburger {
     display: none; font-size: 1.5rem; cursor: pointer; color: #00ff41;
     padding: 10px;          /* ADD THIS — makes tap target ~44px */
     margin: -10px;          /* ADD THIS — compensate so layout doesn't shift */
     border-radius: 6px;
   }

2. Nav links in mobile menu need more height. In the mobile ≤700px block,
   add to .nav-links a:
   padding: 10px 0;          /* was 4px 0 */
   display: block;
   (This makes each link a comfortable 44px+ tap target)

3. Contact links need bigger tap areas on mobile. In ≤700px block add:
   .contact-links a { padding: 14px 24px; }   /* was 10px 24px */

### index.html — hamburger button semantic
4. The hamburger <div onclick="toggleMenu()"> is not keyboard accessible.
   Change it to a <button>:
   <button class="hamburger" onclick="toggleMenu()"
           aria-label="Toggle navigation menu"
           aria-expanded="false"
           aria-controls="nav-links-list">&#9776;</button>

   Add id="nav-links-list" to the <ul class="nav-links"> on all three pages.

   Then update the toggleMenu() function in index.html to also toggle
   aria-expanded:
   function toggleMenu() {
     const links = document.querySelector('.nav-links');
     const btn = document.querySelector('.hamburger');
     const open = links.classList.toggle('open');
     btn.setAttribute('aria-expanded', open);
   }

   Apply the same updated toggleMenu() to resume.html and contact.html.
```

---

## PROMPT 6 — New feature: project cards section (optional)

```
Add a new "Projects" section to index.html between the intro section and the
video section. This should showcase 2-3 key projects as interactive cards.

Add this HTML after the closing </section> of .intro-section:

  <!-- PROJECTS -->
  <section class="projects-section">
    <div class="container">
      <p class="section-label">// selected work</p>
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">

        <div class="project-card">
          <div class="project-card-top">
            <span class="project-year">2025–2026</span>
            <span class="project-org">NASA HUNCH</span>
          </div>
          <h3 class="project-title">Inventory Chain System</h3>
          <p class="project-desc">A full-stack inventory tracking system built with two teammates. Selected to present to NASA representatives in Houston for finals.</p>
          <div class="project-tags">
            <span>Full-Stack</span><span>Hardware</span><span>NASA</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-card-top">
            <span class="project-year">2025–2026</span>
            <span class="project-org">Los Alamos Lab</span>
          </div>
          <h3 class="project-title">VR Training Experience</h3>
          <p class="project-desc">A Virtual Reality training simulation built with a partner. Only student chosen to visit Los Alamos National Laboratory in New Mexico.</p>
          <div class="project-tags">
            <span>VR</span><span>Hardware</span><span>Research</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-card-top">
            <span class="project-year">2026–2027</span>
            <span class="project-org">Capstone</span>
          </div>
          <h3 class="project-title">Project Evie</h3>
          <p class="project-desc">A personal AI assistant that connects Android and Windows into a unified home automation network. Currently in development.</p>
          <div class="project-tags">
            <span>AI</span><span>Android</span><span>Automation</span>
          </div>
        </div>

      </div>
    </div>
  </section>

Add this CSS to style.css (before the TABLET media query):

  /* ===== PROJECTS ===== */
  .projects-section { padding: 60px 40px; background: #0d1117; }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px; margin-top: 24px;
  }
  .project-card {
    background: #0a0e1a;
    border: 1px solid #1a3a1a; border-radius: 14px;
    padding: 28px 28px 24px;
    display: flex; flex-direction: column; gap: 12px;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    cursor: default;
  }
  .project-card:hover {
    border-color: #00ff41;
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0,255,65,0.1);
  }
  .project-card-top {
    display: flex; justify-content: space-between; align-items: center;
  }
  .project-year {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem; color: #a0aab4;
  }
  .project-org {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem; color: #00ff41;
    background: rgba(0,255,65,0.08);
    border: 1px solid rgba(0,255,65,0.2);
    padding: 2px 10px; border-radius: 100px;
  }
  .project-title {
    font-family: 'Orbitron', monospace;
    font-size: 1rem; color: #e6edf3;
    font-weight: 700; line-height: 1.3;
  }
  .project-desc {
    color: #a0aab4; font-size: 0.9rem; line-height: 1.65; flex: 1;
  }
  .project-tags {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px;
  }
  .project-tags span {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.76rem; color: #00cc33;
    background: rgba(0,255,65,0.05);
    border: 1px solid #1a3a1a;
    padding: 3px 10px; border-radius: 100px;
  }

Also add .projects-section to the nav link in index.html if you want it
in-page linked, or just let it flow naturally.

In the scroll reveal selectors array in index.html, add '.project-card'
to revealSelectors so the new cards animate in on scroll.
```

---

## PROMPT 7 — Final polish pass

```
Small refinements across all files.

1. In index.html, the video section still has a placeholder rickroll URL:
   src="https://www.youtube.com/embed/dQw4w9WgXcQ"
   Replace the entire video-wrapper div with a placeholder that you can
   swap in a real video later:
   <div class="video-placeholder">
     <div class="video-placeholder-inner">
       <svg viewBox="0 0 24 24" width="48" height="48" stroke="#00ff41" fill="none"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
         <circle cx="12" cy="12" r="10"/>
         <polygon points="10 8 16 12 10 16 10 8" fill="#00ff41" stroke="none"/>
       </svg>
       <p>Video coming soon</p>
       <span>// replace the YouTube src in index.html</span>
     </div>
   </div>

   Add to style.css:
   .video-placeholder {
     max-width: 900px; margin: 0 auto;
     aspect-ratio: 16/9; border-radius: 14px;
     border: 1px dashed #1a3a1a;
     display: flex; align-items: center; justify-content: center;
   }
   .video-placeholder-inner {
     display: flex; flex-direction: column; align-items: center; gap: 12px;
     text-align: center;
   }
   .video-placeholder-inner p {
     font-family: 'Orbitron', monospace; color: #e6edf3; font-size: 1rem;
   }
   .video-placeholder-inner span {
     font-family: 'Share Tech Mono', monospace; color: #a0aab4; font-size: 0.8rem;
   }

2. In style.css, the .section-desc margin-bottom: 32px feels like a lot
   when there's content below that also has top margin. Change to 20px.

3. In resume.html, the .resume-block-body padding: 28px 32px on mobile
   collapses to 20px which is fine, but on desktop it becomes 32px 40px —
   still a bit much. Change the ≥900px rule to padding: 26px 32px.

4. The contact form in contact.html has no character counter or validation
   feedback beyond browser-native required. Add a simple char count to
   the textarea (nice touch, shows you care about UX). After the textarea:
   <span class="char-count" id="msg-count">0 / 1000</span>

   Add to style.css:
   .char-count {
     font-family: 'Share Tech Mono', monospace;
     font-size: 0.75rem; color: #a0aab4;
     text-align: right; margin-top: -10px;
   }

   Add to the contact.html script:
   const msgEl = document.querySelector('.contact-form textarea');
   const countEl = document.getElementById('msg-count');
   if (msgEl && countEl) {
     msgEl.addEventListener('input', () => {
       countEl.textContent = msgEl.value.length + ' / 1000';
       msgEl.maxLength = 1000;
     });
   }

5. Add a <meta name="description"> to each page's <head> for SEO:
   index.html:  "Joshua Collado — Engineer, developer, and builder. UTRGV dual enrollment student with internships at NASA, Los Alamos, and RECON Technologies."
   resume.html: "Résumé of Joshua Collado — Engineering internships, computer science courses, and presentations at NASA and UTRGV."
   contact.html:"Get in touch with Joshua Collado — South Texas engineer and developer."
```

---

## ORDER OF OPERATIONS

Work through prompts 1–7 in order. Each prompt is self-contained — paste it
verbatim into Claude in VS Code along with the CONTEXT block at the top.

If Claude asks which file to edit, tell it to edit all files mentioned in
that prompt. If it gets confused about a selector, tell it to run a search
for the exact string first before editing.

Estimated effort: ~30–45 min total across all 7 prompts.
