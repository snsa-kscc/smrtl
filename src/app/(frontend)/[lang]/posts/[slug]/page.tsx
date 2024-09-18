import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Content } from '@/app/components/Content'
import { Locale } from 'i18n.config'
import { notFound } from 'next/navigation'
import { fetchLocalizedVersions } from '@/app/lib/utils'

export default async function Page({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string }
}) {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
    locale: lang,
  })

  if (!result.docs[0]) {
    notFound()
  }

  const localizedPosts = await fetchLocalizedVersions(payload, 'posts', result.docs[0].id)

  const { title, content, featuredImage } = result.docs?.[0]

  return (
    <>
      <h1>{title}</h1>
      {content?.content && <Content content={content.content} />}
      {featuredImage && (
        <Image
          src={(featuredImage as any).url}
          alt={(featuredImage as any).alt || ''}
          width={(featuredImage as any).width || 0}
          height={(featuredImage as any).height || 0}
        />
      )}
    </>
  )
}
