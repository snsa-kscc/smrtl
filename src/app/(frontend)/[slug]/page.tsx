import Hero from '@/app/components/Hero'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

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

  return <Hero data={result.docs[0].layout} />
}
