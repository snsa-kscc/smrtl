import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { i18n } from 'i18n.config'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smartell.tv'

    const results = await payload.find({
      collection: 'pages',
      draft: false,
      depth: 0,
      limit: 1000,
      locale: 'all',
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    // Create sitemap entries for each localized page
    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .flatMap((page) => {
            // Handle localized slugs (slug is an object with language keys)
            return Object.entries(page.slug || {})
              .map(([lang, slug]) => {
                if (!slug) return null

                // Default language goes to root, others to their language path
                const langPath = lang === i18n.defaultLocale ? '' : `/${lang}`
                const pagePath = slug === 'home' ? '' : `/${slug}`

                return {
                  loc: `${SITE_URL}${langPath}${pagePath}`,
                  lastmod: page.updatedAt || dateFallback,
                }
              })
              .filter((entry): entry is { loc: string; lastmod: string } => entry !== null)
          })
      : []

    return sitemap
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
