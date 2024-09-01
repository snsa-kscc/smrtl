import '../styles/globals.css'
import { Mont } from '../../lib/fonts'
import { TailwindIndicator } from '../components/utils/TailwindIndicator'
import { Sig } from '../components/utils/Sig'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={` ${Mont.className}`}>
      <body>
        <main>{children}</main>
        <TailwindIndicator />
        {/* <Sig /> */}
      </body>
    </html>
  )
}
