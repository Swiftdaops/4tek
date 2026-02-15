import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://4tek.dev'
  
  // In a real app, you might fetch these slugs from a database
  const solutionSlugs = [
    'fashion-automation',
    'food-ordering-systems',
    'electronics-inventory-logic',
    'whatsapp-dm-fatigue'
  ]

  const solutionUrls = solutionSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...solutionUrls,
  ]
}