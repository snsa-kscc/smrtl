import Image from 'next/image'
import Link from 'next/link'
import type { Header, Media } from '@/payload-types'
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher'
import { getGlobal } from '@/app/lib/getGlobals'
import { Locale, i18n } from 'i18n.config'

export async function Header({ lang }: { lang: Locale }) {
  const header = (await getGlobal('header', undefined, lang)) as Header

  return (
    <nav className="mx-20 mb-44 mt-10 flex items-center justify-between">
      <div>
        <Link href={lang === i18n.defaultLocale ? '/' : `/${lang}`}>
          <Image
            src={(header.logotype as Media).url ?? ''}
            alt={(header.logotype as Media).alt ?? ''}
            width={(header.logotype as Media).width ?? 0}
            height={(header.logotype as Media).height ?? 0}
          />
        </Link>
      </div>
      <div className="flex items-center justify-center gap-16 text-smartellDarkBlue">
        {header.navItems?.map((item, idx) => {
          return (
            <div key={idx}>
              <Link href={item.url}>{item.label}</Link>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Link
          href={header.cta.url}
          className="rounded-full bg-smartellDarkBlue px-7 py-3 text-white duration-300 hover:bg-opacity-70"
        >
          {header.cta.label}
        </Link>
      </div>
    </nav>
  )
}
