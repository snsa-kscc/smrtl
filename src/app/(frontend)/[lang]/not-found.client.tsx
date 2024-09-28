'use client'

import { useParams } from 'next/navigation'
import type { Locale } from 'i18n.config'

export default function NotFoundClient({
  notfoundData,
}: {
  notfoundData: { locale: Locale; title: string; description: string }[]
}) {
  const { lang }: { lang: Locale } = useParams()

  const localeData = notfoundData.find((item) => item.locale === lang)

  return (
    <div>
      <h1>{localeData?.title || 'error 404'}</h1>
      <p>{localeData?.description || 'this is error 404'}</p>
    </div>
  )
}
