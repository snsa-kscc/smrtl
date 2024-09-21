'use client'

import { useParams } from 'next/navigation'
import type { Locale } from 'i18n.config'

export default function NotFoundClient({
  notfoundData,
}: {
  notfoundData: { locale: Locale; title: string; description: string }[]
}) {
  const { lang }: { lang: Locale } = useParams()

  return (
    <div>
      <h1>{notfoundData.find((item) => item.locale === lang)?.title}</h1>
      <p>{notfoundData.find((item) => item.locale === lang)?.description}</p>
    </div>
  )
}
