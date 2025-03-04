import Link from 'next/link'
import { getGlobal } from '../lib/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Locale, i18n } from 'i18n.config'
import type { Footer } from '../../payload-types'
import { Slogan } from './shapes/Slogan'

export async function Footer({ lang }: { lang: Locale }) {
  const footer = (await getGlobal('footer', undefined, lang)) as Footer

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    locale: lang,
    sort: 'createdAt',
  })

  const foterLinks = result.docs
    .filter((doc) => doc.slug !== 'home' && doc.titleVisibleInFooter)
    .map((doc) => ({
      label: doc.title,
      href: i18n.defaultLocale === lang ? `/${doc.slug}` : `/${lang}/${doc.slug}`,
    }))

  return (
    <>
      <div
        className="bg-smartellDarkBlue bg-right-top bg-no-repeat px-20 pt-6 pb-20"
        style={{ backgroundImage: `url('/api/media/file/bg.svg')` }}
      >
        <h2 className="text-10xl text-smartellLightPurple font-bold">{footer.title}</h2>
        <div className="mt-48 flex w-3/4 gap-8">
          <div className="basis-1/4">
            <h3 className="mb-8 font-bold text-white">{footer.contactTitle}</h3>
            <p className="text-white">{footer.email}</p>
            <p className="text-white">{footer.phone}</p>
            <p className="text-white">{footer.address}</p>
          </div>
          <div className="basis-1/3">
            <h3 className="mb-8 font-bold text-white">{footer.infoTitle}</h3>
            <div className="text-white">
              {foterLinks.map((link, index) => (
                <div key={index}>
                  <Link href={link.href} className="duration-500 hover:opacity-60">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="basis-1/3">
            <h3 className="mb-12 font-bold text-white">{footer.newsletterTitle}</h3>
            <div className="flex items-end justify-center gap-4">
              <hr className="h-1 w-full" />
              <button className="text-smartellDarkBlue hover:bg-opacity-70 rounded-full bg-white px-12 py-2 font-bold transition-colors duration-300">
                {footer.newsletterButton}
              </button>
            </div>
            <p className="text-smartellLightPurple mt-2 text-xs">{footer.newsletterDisclaimer}</p>
          </div>
        </div>
        <div className="mt-44 w-1/6">
          <Slogan />
        </div>
        <div className="mt-8 text-lg text-white">
          <p>© Copyright {new Date().getFullYear()} Smartell</p>
        </div>
      </div>
    </>
  )
}
