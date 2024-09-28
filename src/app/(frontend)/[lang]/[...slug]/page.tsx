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
import { draftMode } from 'next/headers'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    depth: 1,
    limit: 1000,
    locale: 'all',
  })

  const params = pages.docs.flatMap((page) => {
    return Object.entries(page.slug ?? {})
      .filter(([_, slug]) => slug !== 'home' && slug != null)
      .map(([lang, slug]) => ({ lang, slug: [slug] }))
  })

  return params

  // const paramsPromises = i18n.locales.map(async (lang) => {
  //   const { docs } = await payload.find({
  //     collection: 'pages',
  //     draft: false,
  //     limit: 1000,
  //     locale: lang,
  //   })
  //   return docs.filter((page) => page.slug !== 'home').map((page) => ({ lang, slug: page.slug }))
  // })

  // const nestedParams = await Promise.all(paramsPromises)
  // return nestedParams.flat()
}

export default async function Page({
  params: { lang, slug = ['home'] },
}: {
  params: { lang: Locale; slug?: string[] }
}) {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug[0] } },
    locale: lang,
    draft,
  })

  if (!result.docs[0]) {
    notFound()
  }

  const localizedPosts = await fetchLocalizedVersions(payload, 'pages', slug[0])

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
  params: { lang, slug = ['home'] },
}: {
  params: { lang: Locale; slug?: string[] }
}): Promise<Metadata> {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug[0] } },
    locale: lang,
    draft,
  })

  if (!result.docs[0]) {
    return {}
  }

  return generateMeta({ doc: result.docs[0], collection: 'pages', lang })
}
