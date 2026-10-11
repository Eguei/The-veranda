const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/media": "media", "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg", "src/robots.txt": "robots.txt" });

  eleventyConfig.addCollection("essays", (api) =>
    api.getFilteredByTag("posts").filter((p) => !p.data.draft).sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("longDate", (d) => {
    const x = new Date(d);
    return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("year", () => new Date().getUTCFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("abs", (path, base) => {
    if (!path) return "";
    if (/^https?:/.test(path)) return path;
    return base.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path);
  });
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });
  eleventyConfig.addFilter("roman", (n) => ["i","ii","iii","iv","v","vi","vii","viii","ix","x","xi","xii"][n - 1] || String(n));
  eleventyConfig.addFilter("excludeUrl", (arr, url) => (arr || []).filter((p) => p.url !== url));
  eleventyConfig.addFilter("featuredFirst", (arr) => {
    const list = arr || [];
    const f = list.find((p) => p.data.featured);
    return f ? [f, ...list.filter((p) => p !== f)] : list;
  });

  // Turn a lone image with a title into a captioned figure: ![alt](src "caption")
  eleventyConfig.addTransform("figures", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replace(
      /<p>\s*<img ([^>]*?)title="([^"]*)"([^>]*?)>\s*<\/p>/g,
      (m, a, cap, b) => `<figure class="essay-fig"><img ${a}${b} loading="lazy"><figcaption>${cap}</figcaption></figure>`
    ).replace(
      /<p>\s*(<img [^>]*>)\s*<\/p>/g,
      (m, img) => `<figure class="essay-fig">${img.replace("<img ", '<img loading="lazy" ')}</figure>`
    );
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
