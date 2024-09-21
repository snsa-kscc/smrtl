import { getGlobal } from '@/app/lib/getGlobals'
import NotFoundClient from './not-found.client'
import type { NotFound } from '@/payload-types'
import { i18n } from 'i18n.config'

export default async function NotFound() {
  const notfoundData = await Promise.all(
    i18n.locales.map(async (locale) => {
      const notFoundLocaleData = (await getGlobal('not-found', undefined, locale)) as NotFound
      return {
        locale,
        title: notFoundLocaleData.title,
        description: notFoundLocaleData.description,
      }
    }),
  )

  return (
    <div>
      <NotFoundClient notfoundData={notfoundData} />
    </div>
  )
}
