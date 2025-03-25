import { Archive } from './Archive'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Locale } from 'i18n.config'
import { BrandsShape } from './shapes/BrandsShape'

export async function ArchiveBlock({ limit, lang }: { limit: number; lang: Locale }) {
  const payload = await getPayload({ config: configPromise })
  const fetchedPosts = await payload.find({
    collection: 'posts',
    locale: lang,
    limit,
    depth: 1,
  })

  return (
    <>
      <Archive lang={lang} posts={fetchedPosts.docs} />
      <div className="mx-auto w-1/2 py-20">
        <BrandsShape />
      </div>
    </>
  )
}
