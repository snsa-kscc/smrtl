'use client'

import { useLocaleLinks } from '@/app/context/LocaleLinksContext'
import { useParams } from 'next/navigation'
import { Locale, i18n } from 'i18n.config'
import Link from 'next/link'

export function LanguageSwitcher() {
  const { localeLinks } = useLocaleLinks()
  const { lang, slug }: { lang: Locale; slug?: string | string[] } = useParams()

  return (
    <div className="flex items-center gap-4">
      {localeLinks
        .filter((link) => link.locale !== lang)
        .map(({ locale, path }) => {
          let href = '/'
          if (locale !== i18n.defaultLocale) {
            href += locale
          }
          if (slug && path) {
            href += href.endsWith('/') ? path : `/${path}`
          }

          return (
            <Link
              key={locale}
              href={href}
              className="bg-smartellLightPurple hover:bg-smartellLightPurple/90 flex h-12 w-12 items-center justify-center rounded-full text-white duration-300"
            >
              {locale.toUpperCase()}
            </Link>
          )
        })}
    </div>
  )
}
