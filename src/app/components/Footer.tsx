import Link from 'next/link'
import { getGlobal } from '../lib/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Locale, i18n, contactTranslations } from 'i18n.config'
import type { Footer } from '../../payload-types'
import { Slogan } from './shapes/Slogan'
import { Linkedin, Instagram, Facebook } from 'lucide-react'
import { NewsletterForm } from './Newsletter'

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
    <footer>
      <div
        className="bg-smartellDarkBlue bg-[length:35%] bg-right-top bg-no-repeat px-8 pt-16 pb-20 md:bg-[length:25%] lg:px-20 lg:pt-28 xl:bg-[length:auto]"
        id={contactTranslations[lang]}
        style={{ backgroundImage: `url('/api/media/file/bg.svg')` }}
      >
        <h2 className="lg:text-10xl text-smartellLightPurple w-1/2 text-5xl font-bold sm:text-7xl md:text-8xl lg:w-3/4">
          {footer.title}
        </h2>
        <div className="mt-16 flex flex-col gap-8 sm:mt-28 md:mt-36 md:flex-row lg:mt-48 xl:w-4/5">
          <div className="basis-1/4">
            <h3 className="mb-8 text-2xl font-bold text-white">{footer.contactTitle}</h3>
            <div className="text-lg text-white">
              <Link
                href={`mailto:${footer.email}`}
                className="relative transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {footer.email}
              </Link>
            </div>
            <div className="text-lg text-white">
              <Link
                href={`tel:${footer.phone.replace(/\s+/g, '')}`}
                className="relative transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {footer.phone}
              </Link>
            </div>
            <p className="text-lg text-white">{footer.addressLine1}</p>
            <p className="text-lg text-white">{footer.addressLine2}</p>
          </div>
          <div className="basis-1/3">
            <h3 className="mb-8 text-2xl font-bold text-white">{footer.infoTitle}</h3>
            <div className="text-lg text-white">
              {foterLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    className="relative text-white transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="basis-1/2">
            <h3 className="mb-2 text-2xl font-bold text-white">{footer.newsletterTitle}</h3>
            <h3 className="mb-12 text-2xl font-bold text-white">{footer.newsletterSubtitle}</h3>
            <NewsletterForm footer={footer} lang={lang} />
            <p className="text-smartellLightPurple mt-4 text-xs">{footer.newsletterDisclaimer}</p>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <Link
            href={footer.LinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-smartellLightPurple text-smartellLightPurple transition-colors duration-300"
          >
            <Linkedin size={28} />
          </Link>
          <Link
            href={footer.Facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-smartellLightPurple text-smartellLightPurple transition-colors duration-300"
          >
            <Facebook size={28} />
          </Link>
          <Link
            href={footer.Instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-smartellLightPurple text-smartellLightPurple transition-colors duration-300"
          >
            <Instagram size={28} />
          </Link>
        </div>
        <div className="mt-20 w-1/2 md:w-1/3 lg:mt-44 xl:w-1/6">
          <Slogan />
        </div>
        <div className="mt-8 text-lg text-white">
          <p>© Copyright {new Date().getFullYear()} Smartell</p>
        </div>
      </div>
    </footer>
  )
}
