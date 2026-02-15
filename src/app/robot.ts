import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Keeps your dashboard private from search results
    },
    sitemap: 'https://4tek.dev/sitemap.xml',
  }
}