/* Every page keeps the flat .html URL the site has always used
   (/about.html, not /about/), so inbound links and bookmarks still land.
   A page's own `permalink` front matter wins (work/, sitemap). */
export default {
  layout: 'os.njk',
  permalink: (data) => `${data.page.filePathStem}.html`,
  eleventyComputed: {
    canonicalUrl: (data) =>
      data.canonicalUrl ||
      (data.page.filePathStem === '/index'
        ? `${data.site.url}/`
        : `${data.site.url}${data.page.filePathStem}.html`),
  },
};
