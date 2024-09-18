import { RenderBlocks } from '@/app/lib/RenderBlocks'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Content } from '@/app/components/Content'
import { Locale } from 'i18n.config'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { lang, slug = 'home' },
}: {
  params: { lang: Locale; slug?: string }
}) {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    page: 1,
    sort: 'createdAt',
    where: { slug: { equals: slug } },
    locale: lang,
  })

  if (!result.docs[0]) {
    notFound()
  }

  const { layout, content } = result.docs?.[0]
  return (
    <>
      {content?.content && <Content content={content.content} />}
      <RenderBlocks blocks={layout?.layout ?? []} />
    </>
  )
}
