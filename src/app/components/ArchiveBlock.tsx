import { Archive } from './Archive'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function ArchiveBlock({ limit }: { limit: number }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const fetchedPosts = await payload.find({
    collection: 'posts',
    limit,
    depth: 1,
  })

  return (
    <div>
      <Archive posts={fetchedPosts.docs} />
    </div>
  )
}
