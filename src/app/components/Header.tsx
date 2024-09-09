import { getCachedGlobal } from '../lib/getGlobals'

import Image from 'next/image'
import Link from 'next/link'
import type { Header } from '../../payload-types'

export async function Header() {
  const header: any = await getCachedGlobal('header')()
  return (
    <div>
      <div>
        <img
          src={header.logo.url}
          alt={header.logo.alt}
          width={header.logo.width}
          height={header.logo.height}
        />
      </div>
      <div className="flex items-center justify-center gap-16 pb-20 pt-10 text-smartellDarkBlue">
        {header.navItems.map((item: any, idx: number) => {
          return (
            <div key={idx}>
              <Link href={item.url}>{item.label}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
