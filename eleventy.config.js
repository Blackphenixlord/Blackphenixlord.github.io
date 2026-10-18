/* Eleventy build — src/ in, _site/ out.
   Templates carry only what makes a page different; everything shared lives in
   src/_includes. Static assets pass through untouched so their URLs never move. */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as esbuild from 'esbuild';

/* Minified from src/ straight into _site/, rather than passing through and
   then rewriting in place -- the latter made Eleventy's incremental copy race
   its own output during `--serve`. style.css alone was 137 KB of
   render-blocking CSS, the single biggest drag on the mobile score. */
const MINIFY_CSS = ['style.css', 'icons.css'];
const MINIFY_JS = [
  'app.js', 'motion.js', 'boot.js', 'music.js', 'sounds.js',
  'page-home.js', 'page-resume.js', 'page-contact.js', 'page-projects.js',
];

async function minify(outDir, file, loader) {
  const src = await readFile(join('src', file), 'utf8');
  const path = join(outDir, file);
  const out = await esbuild.transform(src, {
    loader,
    minify: true,
    /* Keep the syntax floor where the browsers we target actually are; this is
       also what stops esbuild lowering @view-transition or nested selectors. */
    target: ['chrome110', 'firefox110', 'safari16'],
    legalComments: 'none',
  });
  await writeFile(path, out.code, 'utf8');
  return { file, before: src.length, after: out.code.length };
}

export default function (eleventyConfig) {
  /* Everything here is copied verbatim. The CSS and JS listed in MINIFY_*
     are deliberately absent: they are written by the minify step instead. */
  ['imgs', 'fonts', 'vendor-lenis.js', 'CNAME', 'robots.txt'
  ].forEach((p) => eleventyConfig.addPassthroughCopy(`src/${p}`));

  /* Everything that should appear in the sitemap. The glob has to include
     work.njk as well: it paginates into real, indexable case studies
     that src/*.html alone would silently leave out. */
  eleventyConfig.addCollection('pages', (api) =>
    api.getFilteredByGlob(['src/*.html', 'src/work.njk'])
       .filter((p) => !p.data.excludeFromSitemap && !p.data.noindex)
       .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.addFilter('isoDate', (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    const results = await Promise.all([
      ...MINIFY_CSS.map((f) => minify(dir.output, f, 'css')),
      ...MINIFY_JS.map((f) => minify(dir.output, f, 'js')),
    ]);
    const before = results.reduce((n, r) => n + r.before, 0);
    const after = results.reduce((n, r) => n + r.after, 0);
    console.log(
      `[minify] ${results.length} files  ${(before / 1024).toFixed(0)} KB -> ` +
      `${(after / 1024).toFixed(0)} KB  (-${Math.round((1 - after / before) * 100)}%)`
    );
  });

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
