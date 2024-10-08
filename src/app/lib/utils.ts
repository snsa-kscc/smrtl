import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Payload } from 'payload'
import { pathTranslations } from 'i18n.config'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchLocalizedVersions(
  payload: Payload,
  collection: 'posts' | 'pages',
  slug: string,
) {
  // const localizedItems = await Promise.all(
  //   i18n.locales.map(async (locale: Locale) => {
  //     const localizedItem = await payload.findByID({
  //       collection,
  //       id,
  //       depth: 1,
  //       locale,
  //     })
  //     return { locale, item: localizedItem }
  //   }),
  // )

  const localizedItems = await payload.find({
    collection,
    draft: false,
    depth: 1,
    where: { slug: { equals: slug } },
    locale: 'all',
  })

  const arrayByLocale = Object.entries(localizedItems.docs[0].slug ?? {})
    .filter(([_, slug]) => slug != null)
    .map(([lang, slug]) => ({
      locale: lang,
      path:
        collection === 'pages'
          ? `${slug}`
          : `${pathTranslations[lang as keyof typeof pathTranslations]}/${slug}`,
    }))

  return arrayByLocale
}
