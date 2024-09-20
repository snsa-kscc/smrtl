import '@/app/styles/globals.css'
import { Mont } from '@/app/lib/fonts'
import { getGlobal } from '@/app/lib/getGlobals'
import { TailwindIndicator } from '@/app/components/utils/TailwindIndicator'
import { Sig } from '@/app/components/utils/Sig'
import { Header as HeaderComponent } from '@/app/components/Header'
import { Footer as FooterComponent } from '@/app/components/Footer'
import type { Header } from '@/payload-types'
import { Locale } from 'i18n.config'
import { LocaleLinksProvider } from '@/app/context/LocaleLinksContext'

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const header = (await getGlobal('header')) as Header

  return (
    <html lang={lang} className={`scroll-smooth ${Mont.className}`}>
      <body>
        <LocaleLinksProvider>
          <HeaderComponent header={header} />
          <main>{children}</main>
          <FooterComponent />
          <TailwindIndicator />
          {/* <Sig /> */}
        </LocaleLinksProvider>
      </body>
    </html>
  )
}
