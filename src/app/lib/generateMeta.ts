import type { Metadata } from 'next'
import type { Page, Post } from '@/payload-types'
import { mergeOpenGraph } from './mergeOpenGraph'
import { Locale, pathTranslations } from 'i18n.config'

// Default metadata for each language
const defaultMeta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Smartell | Innovative IPTV, Digital Signage & Smart Solutions for Hospitality',
    description:
      'Enhance guest experience and streamline hotel operations with Smartell’s advanced IPTV and digital signage solutions. Deliver personalized entertainment, real-time information, and smart connectivity tailored for modern hospitality.',
  },
  hr: {
    title: 'Smartell | Inovativni IPTV, digitalni signage i pametna rješenja za hospitality',
    description:
      'Unaprijedite doživljaj gostiju i optimizirajte rad hotela uz Smartellova napredna IPTV i digital signage rješenja. Omogućite personaliziranu zabavu, informacije u stvarnom vremenu i pametno povezivanje prilagođeno suvremenom hotelijerstvu.',
  },
  it: {
    title: 'Smartell | IPTV innovativo, digital signage e soluzioni smart per l’ospitalita',
    description:
      'Migliora l’esperienza degli ospiti e semplifica la gestione dell’hotel con le soluzioni IPTV e digital signage avanzate di Smartell. Offri intrattenimento personalizzato, informazioni in tempo reale e connettività intelligente per l’ospitalità moderna.',
  },
}

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

  const title = doc?.meta?.title ? doc?.meta?.title : defaultMeta[lang].title

  // Generate canonical URL based on the provided path or construct it from doc slug
  const canonicalPath =
    path ||
    (collection === 'posts'
      ? `/${lang}/${pathTranslations[lang as keyof typeof pathTranslations]}/${doc.slug}`
      : doc.slug === 'home'
        ? `/${lang}`
        : `/${lang}/${doc.slug}`)

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${canonicalPath}`

  return {
    description: doc?.meta?.description || defaultMeta[lang].description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || defaultMeta[lang].description,
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
