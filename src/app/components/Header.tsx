import type { Header } from '@/payload-types'
import { getGlobal } from '@/app/lib/getGlobals'
import { Locale } from 'i18n.config'
import { HeaderClient } from '@/app/components/HeaderClient'

export async function Header({ lang }: { lang: Locale }) {
  const header = (await getGlobal('header', undefined, lang)) as Header

  return <HeaderClient lang={lang} header={header} />
}
