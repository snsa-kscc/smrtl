import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Get sitemap URL from environment variable or use a default value
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smartell.tv'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: [`${siteUrl}/posts-sitemap.xml`, `${siteUrl}/pages-sitemap.xml`],
    host: siteUrl,
  }
}
