/* Keep the .html URLs the site has always had. Eleventy's default would emit
   /about/index.html, silently breaking every existing link, bookmark and
   inbound URL. Front matter still wins, so rick.html and sitemap.njk keep
   the permalinks they declare. */
export default {
  permalink: (data) => `${data.page.filePathStem}.html`,

  eleventyComputed: {
    /* index.html is canonically the bare domain; everything else is its .html */
    canonicalUrl: (data) =>
      data.page.filePathStem === '/index'
        ? `${data.site.url}/`
        : `${data.site.url}${data.page.filePathStem}.html`,
  },
};
