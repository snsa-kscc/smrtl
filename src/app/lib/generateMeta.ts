import type { Metadata } from 'next'
import type { Page, Post } from '@/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { Locale, pathTranslations } from 'i18n.config'

export const generateMeta = async (args: {
  doc: Page | Post
  collection: 'pages' | 'posts'
  lang: Locale
  path?: string // Optional path parameter for canonical URL
}): Promise<Metadata> => {
  const { doc, collection, lang, path } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  const title = doc?.meta?.title ? doc?.meta?.title : process.env.NEXT_PUBLIC_SERVER_NAME

  // Generate canonical URL based on the provided path or construct it from doc slug
  const canonicalPath = path || 
    (collection === 'posts' ? 
      `/${lang}/${pathTranslations[lang as keyof typeof pathTranslations]}/${doc.slug}` : 
      doc.slug === 'home' ? `/${lang}` : `/${lang}/${doc.slug}`)
  
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${canonicalPath}`

  return {
    description: doc?.meta?.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalUrl,
      locale: lang,
      type: collection === 'posts' ? 'article' : 'website',
      ...(collection === 'posts' && {
        publishedTime: doc?.createdAt,
        modifiedTime: doc?.updatedAt,
      }),
    }),
    title,
  }
}
