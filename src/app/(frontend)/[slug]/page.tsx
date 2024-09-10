import { RenderBlocks } from '../../lib/RenderBlocks'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Content } from '../../components/Content'
export default async function Page({ params: { slug = 'home' } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    page: 1,
    sort: 'createdAt',
    where: { slug: { equals: slug } },
  })

  if (!result.docs[0]) {
    return null
  }

  const { layout, content } = result.docs?.[0]
  return (
    <>
      {content?.content && <Content content={content.content} />}
      <RenderBlocks blocks={layout?.layout ?? []} />
    </>
  )
}
