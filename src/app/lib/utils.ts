import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Locale, i18n } from 'i18n.config'
import { Payload } from 'payload'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchLocalizedVersions(
  payload: Payload,
  collection: 'posts' | 'pages',
  id: number,
) {
  const localizedItems = await Promise.all(
    i18n.locales.map(async (locale: Locale) => {
      const localizedItem = await payload.findByID({
        collection,
        id,
        depth: 1,
        locale,
      })
      return { locale, item: localizedItem }
    }),
  )

  // const itemsByLocale = Object.fromEntries(
  //   localizedItems.map(({ locale, item }) => [locale, item.slug]),
  // )

  const arrayByLocale = localizedItems.map(({ locale, item }) => ({ locale, slug: item.slug }))

  return arrayByLocale
}
