import type { Metadata } from 'next'
import type { Page, Post } from '@/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { Locale } from 'i18n.config'

export const generateMeta = async (args: {
  doc: Page | Post
  collection: 'pages' | 'posts'
  lang: Locale
}): Promise<Metadata> => {
  const { doc, collection, lang } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}${doc.meta.image.url}`

  const title = doc?.meta?.title ? doc?.meta?.title : process.env.NEXT_PUBLIC_SERVER_NAME

  return {
    description: doc?.meta?.description,
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
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : process.env.NEXT_PUBLIC_SERVER_URL,
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
