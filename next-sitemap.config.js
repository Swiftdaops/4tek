/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://4tek.dev",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/sitemap.xml", "/sitemap-*.xml", "/robots.txt"],
  additionalPaths: async (config) => {
    // next-sitemap may miss some App Router client routes; ensure key pages are present.
    return [
      await config.transform(config, "/get-started"),
    ];
  },
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    if (path === "/solutions") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
