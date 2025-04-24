import { serializeLexical } from '../lib/serialize'
import { Locale } from 'i18n.config'

export function Content({
  content,
  includeReadingTime,
  lang,
}: {
  content: any
  includeReadingTime?: boolean
  lang: Locale
}) {
  return (
    <div className="mx-auto w-5xl max-w-full px-8 py-16">
      <div className="richText">
        {serializeLexical({ nodes: content.root.children, includeReadingTime, lang })}
      </div>
    </div>
  )
}
