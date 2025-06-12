import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { i18n, pathTranslations } from 'i18n.config'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://smartell.tv'

    const results = await payload.find({
      collection: 'posts',
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

    // Create sitemap entries for each localized post
    const sitemap = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .flatMap((post) => {
            // Handle localized slugs (slug is an object with language keys)
            return Object.entries(post.slug || {})
              .map(([lang, slug]) => {
                if (!slug) return null

                // Default language goes to root, others to their language path
                const langPath = lang === i18n.defaultLocale ? '' : `/${lang}`
                const pathTranslation = pathTranslations[lang as keyof typeof pathTranslations]

                return {
                  loc: `${SITE_URL}${langPath}/${pathTranslation}/${slug}`,
                  lastmod: post.updatedAt || dateFallback,
                }
              })
              .filter((entry): entry is { loc: string; lastmod: string } => entry !== null)
          })
      : []

    return sitemap
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()

  return getServerSideSitemap(sitemap)
}
