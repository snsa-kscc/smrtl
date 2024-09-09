import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    page: 1,
    sort: 'createdAt',
    where: { slug: { equals: slug } },
  })

  if (!result.docs[0]) {
    return null
  }

  const { title, content, featuredImage } = result.docs?.[0]

  return (
    <>
      <h1>{title}</h1>
      <div>{content}</div>
      <Image
        src={(featuredImage as any).url}
        alt={(featuredImage as any).alt || ''}
        width={(featuredImage as any).width || 0}
        height={(featuredImage as any).height || 0}
      />
    </>
  )
}
