import { Archive } from './Archive'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function ArchiveBlock({ limit }: { limit: number }) {
  const payload = await getPayload({ config: configPromise })
  const fetchedPosts = await payload.find({
    collection: 'posts',
    locale: 'en',
    limit,
    depth: 1,
  })

  return (
    <>
      <Archive posts={fetchedPosts.docs} />
    </>
  )
}
