import '../styles/globals.css'
import { Mont } from '../../lib/fonts'
import { TailwindIndicator } from '../components/utils/TailwindIndicator'
import { Sig } from '../components/utils/Sig'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={` ${Mont.className}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <TailwindIndicator />
        {/* <Sig /> */}
      </body>
    </html>
  )
}
