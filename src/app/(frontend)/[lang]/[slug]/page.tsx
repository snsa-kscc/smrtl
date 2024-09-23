import { RenderBlocks } from '@/app/lib/RenderBlocks'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Content } from '@/app/components/Content'
import { Locale } from 'i18n.config'
import { notFound } from 'next/navigation'
import { fetchLocalizedVersions } from '@/app/lib/utils'
import { LocaleLinksUpdater } from '@/app/context/LocaleLinksContext'
import { generateMeta } from '@/app/lib/generateMeta'
import { Metadata } from 'next'

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
    where: { slug: { equals: slug } },
    locale: lang,
  })

  if (!result.docs[0]) {
    notFound()
  }

  const localizedPosts = await fetchLocalizedVersions(payload, 'pages', result.docs[0].id)

  const { title, layout, content } = result.docs?.[0]
  return (
    <>
      <LocaleLinksUpdater localeLinks={localizedPosts} />
      {title !== 'home' && <h1>{title}</h1>}
      {content?.content && <Content content={content.content} />}
      <RenderBlocks blocks={layout?.layout ?? []} />
    </>
  )
}

export async function generateMetadata({
  params: { lang, slug = 'home' },
}: {
  params: { lang: Locale; slug?: string }
}): Promise<Metadata> {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
    locale: lang,
  })

  if (!result.docs[0]) {
    return {}
  }

  return generateMeta({ doc: result.docs[0], collection: 'pages', lang })
}
