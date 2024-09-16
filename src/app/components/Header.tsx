import { getGlobal } from '../lib/getGlobals'

import Image from 'next/image'
import Link from 'next/link'
import type { Header } from '../../payload-types'

export async function Header() {
  const header: any = await getGlobal('header')
  return (
    <nav className="mx-20 mb-44 mt-10 flex items-center justify-between">
      {/* <div>
        <Image
          src={header.logotype.url}
          alt={header.logotype.alt}
          width={header.logotype.width}
          height={header.logotype.height}
        />
      </div>
      <div className="flex items-center justify-center gap-16 text-smartellDarkBlue">
        {header.navItems.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              <Link href={item.url}>{item.label}</Link>
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={header.langSwitcher.url}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-smartellLightPurple text-white duration-300 hover:bg-opacity-70"
        >
          {header.langSwitcher.label}
        </Link>
        <Link
          href={header.cta.url}
          className="rounded-full bg-smartellDarkBlue px-7 py-3 text-white duration-300 hover:bg-opacity-70"
        >
          {header.cta.label}
        </Link>
      </div> */}
    </nav>
  )
}
