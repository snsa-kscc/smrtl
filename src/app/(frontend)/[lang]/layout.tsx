import '@/app/styles/globals.css'
import { Mont } from '@/app/lib/fonts'
import { TailwindIndicator } from '@/app/components/utils/TailwindIndicator'
import { Sig } from '@/app/components/utils/Sig'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { Locale } from 'i18n.config'
import { LocaleLinksProvider } from '@/app/context/LocaleLinksContext'

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={lang} className={`scroll-smooth ${Mont.className}`}>
      <body>
        <LocaleLinksProvider>
          <Header lang={lang} />
          <main>{children}</main>
          <Footer />
          <TailwindIndicator />
          {/* <Sig /> */}
        </LocaleLinksProvider>
      </body>
    </html>
  )
}
