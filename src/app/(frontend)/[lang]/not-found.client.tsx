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
      <h1 className="text-smartellLightPurple mx-auto my-32 w-2/3 text-center text-4xl font-bold text-balance lg:text-5xl xl:text-8xl">
        {localeData?.title || 'Error 404'}
      </h1>
      <p className="text-smartellDarkBlue mx-auto my-20 w-2/3 text-center text-3xl font-bold text-balance lg:text-4xl xl:text-5xl">
        {localeData?.description || 'This is error 404. Page is not found.'}
      </p>
    </div>
  )
}
