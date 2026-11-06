# JC/OS — design tokens and layout plan (`fresh-build`)

The site is an operating system you are logged into. Every page is an app
window; every section header is a command; NASA and Los Alamos are the
"critical missions" the OS boots straight into.

## Tokens (implemented as custom properties in `src/assets/os.css`)

### Colour
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0e1a` | page, desktop |
| `--bg-2` | `#0d1117` | window bodies |
| `--panel` | `rgb(13 17 23 / .86)` | translucent windows over the grid |
| `--fg` | `#e6edf3` | primary text (15.9:1 on `--bg`) |
| `--fg-2` | `#a3afc0` | secondary text (8.9:1) |
| `--fg-3` | `#7f8ca1` | meta, labels (5.6:1) |
| `--green` | `#28c840` | THE accent: links, status, cursor, glow (8.6:1) |
| `--green-ink` | `#04210a` | text on solid green |
| `--line` | `rgb(40 200 64 / .14)` | grid lines, hairlines |
| `--line-2` | `rgb(40 200 64 / .32)` | window borders, focus-adjacent |
| `--glow` | `0 0 24px rgb(40 200 64 / .35)` | neon glow |
| `--dot-r/y/g` | `#ff5f57` `#febc2e` `#28c840` | window traffic lights only |

No other hues. Errors use `--dot-r` *plus* an icon and text, never colour alone.

### Type
| Token | Value |
|---|---|
| `--f-display` | Orbitron 700/900 — h1/h2, numbers |
| `--f-mono` | Share Tech Mono — commands, labels, readouts, UI |
| `--f-prose` | Inter 300–600 — long paragraphs only (readability) |
| `--fs-hero` | `clamp(2.5rem, 9vw, 6.5rem)` |
| `--fs-1` | `clamp(2rem, 5vw, 3.5rem)` page h1 |
| `--fs-2` | `clamp(1.5rem, 3.4vw, 2.25rem)` section h2 |
| `--fs-3` | `1.2rem` card titles |
| `--fs-body` | `1.0625rem` / 1.7 |
| `--fs-mono` | `.9rem` / 1.6 |
| `--fs-meta` | `.8rem`, `letter-spacing: .08em`, uppercase |

### Space (4px base)
`--s-1 .25rem` · `--s-2 .5rem` · `--s-3 .75rem` · `--s-4 1rem` · `--s-5 1.5rem` ·
`--s-6 2rem` · `--s-7 3rem` · `--s-8 5rem` · `--s-9 8rem`. Gutter
`--gut: clamp(1rem, 4vw, 2.5rem)`, content max `--max: 1180px`.

### Shape
`--r-win: 12px` windows · `--r-ctl: 8px` controls · `--r-chip: 999px` chips. Borders 1px.

### Motion
| Token | Value |
|---|---|
| `--t-fast` | `140ms` hovers |
| `--t-med` | `320ms` reveals |
| `--t-slow` | `700ms` section builds |
| `--ease` | `cubic-bezier(.16, 1, .3, 1)` (out-expo) |
| `--ease-io` | `cubic-bezier(.65, 0, .35, 1)` |

Only `transform` and `opacity` animate. Every rAF loop stops off-screen and
in hidden tabs. `prefers-reduced-motion: reduce` → no boot, no scramble, no
tilt, static grid frame, everything visible.

## Components
- **Window** — title bar (traffic lights, path, status LED), body. Variants: `app` (page header), `mission` (border beam), `program` (project card: tilt + spotlight).
- **Prompt header** — `joshua@collado:~$ <command>` above every h2; the command types itself (aria-hidden copy, real heading stays plain).
- **Readout** — big Orbitron number + mono label (stats, project facts).
- **Status chip** — LED + text: Shipped / Delivered / Houston finals / In progress.
- **Launcher** — Ctrl+K / ⌘K `<dialog>` command palette (navigate, open a project, settings, eggs).
- **Terminal** — interactive prompt (home, résumé); output in a `role="log"` region.

## Layout plan
- **Menubar** (fixed, 48px): JC terminal-window logo → home · nav as `~/about` etc. (desktop) · launcher button · scroll % readout + clock. Phone: logo + "menu" button that opens the launcher.
- **Desktop**: fixed green grid + scanlines + vignette behind everything.
- **Home**: boot film → hero (flickering-grid field reacting to pointer/touch, decrypting name, typed tagline, readouts) → **Critical missions** (NASA HUNCH, Los Alamos: full-width mission windows with photos, logs, status) → Who I am → interactive terminal → Programs (7 project cards) → Highlights → footer.
- **Inner pages**: app window header (`~/path`, `$ cat page`) → sections with prompt headers → next/previous.
- **Case studies** `/work/<slug>.html`: program window ("running" LED), readouts for role/timeline/status, `$ stack --list`, problem/approach/outcome, photos where the work has them, links, prev/next.
