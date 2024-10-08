import '@/app/styles/globals.css'
import { Mont } from '@/app/lib/fonts'
import { TailwindIndicator } from '@/app/components/utils/TailwindIndicator'
import { Sig } from '@/app/components/utils/Sig'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { Locale } from 'i18n.config'
import { LocaleLinksProvider } from '@/app/context/LocaleLinksContext'
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/app/lib/mergeOpenGraph'
import { i18n } from 'i18n.config'
import { AdminBar } from '@/app/components/AdminBar'
import { draftMode } from 'next/headers'
import SmoothScrolling from '@/app/components/SmoothScrolling'

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const { isEnabled } = draftMode()
  return (
    <html lang={lang} className={`scroll-smooth ${Mont.className}`}>
      <body>
        <LocaleLinksProvider>
          <SmoothScrolling>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <Header lang={lang} />
            <main>{children}</main>
            <Footer lang={lang} />
            <TailwindIndicator />
            {/* <Sig /> */}
          </SmoothScrolling>
        </LocaleLinksProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  category: 'technology',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL!),
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(i18n.locales.map((locale) => [locale, `/${locale}`])),
  },
  generator: 'Next.js',
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
