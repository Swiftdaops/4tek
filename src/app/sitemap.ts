import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://4tek.dev'
  const lastModified = new Date()

  // Keep this list aligned with actual `src/app/**/page.*` routes.
  const staticPaths = [
    '/',
    '/about',
    '/api-ecosystem',
    '/contact',
    '/get-started',
    '/saas',
    '/security',
    '/solutions',
    '/stack',
    '/who-this-is-for',
  ]

  return staticPaths.map((path) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? ('daily' as const) : ('weekly' as const),
    priority: path === '/' ? 1 : path === '/solutions' ? 0.9 : 0.7,
  }))
}