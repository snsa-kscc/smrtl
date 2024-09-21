import Link from 'next/link'
import { getGlobal } from '../lib/getGlobals'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Locale, i18n } from 'i18n.config'
import type { Footer } from '../../payload-types'

export async function Footer({ lang }: { lang: Locale }) {
  const footer = (await getGlobal('footer', undefined, lang)) as Footer

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    locale: lang,
  })

  const foterLinks = result.docs
    .filter((doc) => doc.slug !== 'home')
    .map((doc) => ({
      label: doc.title,
      href: i18n.defaultLocale === lang ? `/${doc.slug}` : `/${lang}/${doc.slug}`,
    }))

  return (
    <>
      <div className="bg-smartellDarkBlue px-20 py-8 text-smartellLightPurple">
        {footer.copyright}
      </div>
      <div className="p-20">
        {foterLinks.map((link, index) => (
          <div key={index}>
            <Link href={link.href}>{link.label?.toUpperCase()}</Link>
          </div>
        ))}
      </div>
    </>
  )
}
