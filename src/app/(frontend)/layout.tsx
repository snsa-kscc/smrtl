import '../styles/globals.css'
import { Mont } from '../../lib/fonts'
import { TailwindIndicator } from '../components/utils/TailwindIndicator'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={` ${Mont.className}`}>
      <body>
        <main>{children}</main>
        <TailwindIndicator />
      </body>
    </html>
  )
}
