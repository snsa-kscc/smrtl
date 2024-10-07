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
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href={lang === i18n.defaultLocale ? '/' : `/${lang}`}>
              <Image
                src={(header.logotype as Media)?.url ?? ''}
                alt={(header.logotype as Media)?.alt ?? ''}
                width={(header.logotype as Media)?.width ?? 0}
                height={(header.logotype as Media)?.height ?? 0}
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {header.navItems?.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.url}
                  className="rounded-md px-3 py-2 text-sm font-medium text-smartellDarkBlue transition-colors duration-200 hover:bg-smartellLightPurple hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <LanguageSwitcher />
              <Link
                href={header.cta?.url ?? ''}
                className="ml-4 rounded-full bg-smartellDarkBlue px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-opacity-90"
              >
                {header.cta?.label}
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-smartellDarkBlue transition-colors duration-200 hover:bg-smartellLightPurple hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-smartellDarkBlue"
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
        className={`transition-max-height overflow-hidden duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          {header.navItems?.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="block rounded-md px-3 py-2 text-base font-medium text-smartellDarkBlue transition-colors duration-200 hover:bg-smartellLightPurple hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-5">
            <LanguageSwitcher />
            <Link
              href={header.cta?.url ?? ''}
              className="ml-auto flex-shrink-0 rounded-full bg-smartellDarkBlue px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-opacity-90"
            >
              {header.cta?.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
