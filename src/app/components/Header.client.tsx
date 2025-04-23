'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Header, Media } from '@/payload-types'
import { LanguageSwitcher } from '@/app/components/LanguageSwitcher'
import { Locale, i18n } from 'i18n.config'

export function HeaderClient({ lang, header }: { lang: Locale; header: Header }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white py-4">
      <div className="px-24">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link href={lang === i18n.defaultLocale ? '/' : `/${lang}`}>
              <Image
                src={(header.logotype as Media)?.url ?? ''}
                alt={(header.logotype as Media)?.alt ?? ''}
                width={(header.logotype as Media)?.width ?? 0}
                height={(header.logotype as Media)?.height ?? 0}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {header.navItems?.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.url}
                  className="text-smartellDarkBlue after:bg-smartellLightPurple relative mx-3 my-2 rounded-md text-xl font-bold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center lg:ml-6">
              <LanguageSwitcher />
              <Link
                href={header.cta?.url ?? ''}
                className="bg-smartellDarkBlue hover:bg-smartellDarkBlue/90 ml-4 rounded-full p-4 text-sm font-bold text-white shadow-xs transition duration-200"
              >
                {header.cta?.label}
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="text-smartellDarkBlue hover:bg-smartellLightPurple inline-flex items-center justify-center rounded-md bg-white p-2 transition-colors duration-200 hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-max-height overflow-hidden duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {header.navItems?.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="text-smartellDarkBlue relative block rounded-md px-3 py-2 text-lg font-medium transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-5">
            <LanguageSwitcher />
            <Link
              href={header.cta?.url ?? ''}
              className="bg-smartellDarkBlue hover:bg-smartellDarkBlue/90 ml-auto shrink-0 rounded-full p-4 text-sm font-medium text-white shadow-xs transition duration-200"
            >
              {header.cta?.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
