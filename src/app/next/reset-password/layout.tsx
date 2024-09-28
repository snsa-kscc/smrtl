import '@/app/styles/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SERVER_NAME,
  description: process.env.NEXT_PUBLIC_SERVER_NAME,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
