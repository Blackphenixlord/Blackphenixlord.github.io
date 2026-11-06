/* JC/OS build: src/ in, _site/ out.
   Images, fonts and the domain files are copied as-is. The stylesheet and
   scripts in src/assets are minified by esbuild straight into _site/assets. */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as esbuild from 'esbuild';

export default function (config) {
  ['imgs', 'fonts', 'CNAME', 'robots.txt', 'favicon.svg'].forEach((p) => config.addPassthroughCopy(`src/${p}`));
  config.ignores.add('src/assets/**');
  config.addWatchTarget('src/assets/');

  config.addFilter('isoDate', (d) => new Date(d).toISOString().slice(0, 10));
  config.addFilter('jsonld', (v) => JSON.stringify(v).replace(/</g, '\\u003c'));
  config.addFilter('pad', (n) => String(n).padStart(2, '0'));
  config.addFilter('crumbsLd', (crumbs, base) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: base + c.href })),
  }));

  /* Sitemap: every page that is not opted out (404, the easter egg). */
  config.addCollection('pages', (api) =>
    api.getFilteredByGlob('src/*.html')
      .filter((p) => !p.data.noindex)
      .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  config.on('eleventy.after', async ({ dir }) => {
    const out = join(dir.output, 'assets');
    await mkdir(out, { recursive: true });
    const files = (await readdir('src/assets')).filter((f) => /\.(css|js)$/.test(f));
    let before = 0, after = 0;
    await Promise.all(files.map(async (f) => {
      const src = await readFile(join('src/assets', f), 'utf8');
      const { code } = await esbuild.transform(src, {
        loader: f.endsWith('.css') ? 'css' : 'js',
        minify: true,
        target: ['chrome111', 'firefox115', 'safari16'],
        legalComments: 'none',
      });
      before += src.length; after += code.length;
      await writeFile(join(out, f), code);
    }));
    console.log(`[assets] ${files.length} files ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
  });

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', layouts: '_includes/layouts', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
