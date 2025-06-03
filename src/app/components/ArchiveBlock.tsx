import { Archive } from './Archive'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Locale } from 'i18n.config'
import { BrandsShape } from './shapes/BrandsShape'

export async function ArchiveBlock({
  limit,
  lang,
  isShape = true,
  excludeSlug,
}: {
  limit: number
  lang: Locale
  isShape?: boolean
  excludeSlug?: string
}) {
  const payload = await getPayload({ config: configPromise })
  const fetchedPosts = await payload.find({
    collection: 'posts',
    locale: lang,
    fallbackLocale: false,
    limit,
    depth: 1,
  })

  const filteredPosts = fetchedPosts.docs.filter(
    (post) => post.title !== undefined && post.slug !== undefined && post.slug !== excludeSlug,
  )

  return (
    <>
      <Archive lang={lang} posts={filteredPosts} />
      <div className="mx-auto w-2/3 lg:w-1/2 lg:py-20">{isShape && <BrandsShape />}</div>
    </>
  )
}
