'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Header, Media } from '@/payload-types'
import { useLocaleLinks } from '@/app/context/LocaleLinksContext'

export function Header({ header }: { header: Header }) {
  const { localeLinks } = useLocaleLinks()

  return (
    <nav className="mx-20 mb-44 mt-10 flex items-center justify-between">
      <div>
        <Image
          src={(header.logotype as Media).url ?? ''}
          alt={(header.logotype as Media).alt ?? ''}
          width={(header.logotype as Media).width ?? 0}
          height={(header.logotype as Media).height ?? 0}
        />
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
        {JSON.stringify(localeLinks, null, 2)}
        {/* <Link
          href={header.langSwitcher.url}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-smartellLightPurple text-white duration-300 hover:bg-opacity-70"
        >
          {header.langSwitcher.label}
        </Link> */}
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
