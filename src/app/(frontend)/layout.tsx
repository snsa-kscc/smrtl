import '../styles/globals.css'
import { Mont } from '../../lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={` ${Mont.className}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
