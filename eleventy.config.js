/* Eleventy build — src/ in, _site/ out.
   Templates carry only what makes a page different; everything shared lives in
   src/_includes. Static assets pass through untouched so their URLs never move. */
export default function (eleventyConfig) {
  ['imgs', 'fonts', 'style.css', 'icons.css', 'app.js', 'boot.js', 'music.js',
   'sounds.js', 'motion.js', 'vendor-lenis.js', 'CNAME', 'robots.txt'
  ].forEach((p) => eleventyConfig.addPassthroughCopy(`src/${p}`));

  // Per-page behaviour modules, referenced by a page's `pageScript` front matter.
  eleventyConfig.addPassthroughCopy('src/page-*.js');

  // Pages in the order they should appear in the sitemap and command palette.
  eleventyConfig.addCollection('pages', (api) =>
    api.getFilteredByGlob('src/*.html')
       .filter((p) => !p.data.excludeFromSitemap)
       .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
  );

  eleventyConfig.addFilter('isoDate', (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
}
