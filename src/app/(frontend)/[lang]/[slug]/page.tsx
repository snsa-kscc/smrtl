import { RenderBlocks } from '@/app/lib/RenderBlocks'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Content } from '@/app/components/Content'
import { Locale } from 'i18n.config'
import { notFound } from 'next/navigation'
import { fetchLocalizedVersions } from '@/app/lib/utils'
import { LocaleLinksUpdater } from '@/app/context/LocaleLinksContext'
import { generateMeta } from '@/app/lib/generateMeta'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

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
      .map(([lang, slug]) => ({ lang, slug }))
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
  params,
}: {
  params: Promise<{ lang: Locale; slug?: string }>
}) {
  const { lang, slug = 'home' } = await params

  const payload = await getPayload({ config: configPromise })

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

  const localizedPosts = await fetchLocalizedVersions(payload, 'pages', slug)

  const { title, layout, content } = result.docs?.[0]
  return (
    <>
      <LocaleLinksUpdater localeLinks={localizedPosts} />
      {title !== 'home' && (
        <h1 className="text-smartellLightPurple mx-auto w-5xl max-w-full px-8 pt-16 text-left text-5xl font-bold md:text-5xl lg:pt-40 lg:text-7xl xl:text-8xl">
          {title}
        </h1>
      )}
      {content?.content && (
        <Content content={content.content} includeReadingTime={false} lang={lang} />
      )}
      <RenderBlocks lang={lang} blocks={layout?.layout ?? []} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug?: string }>
}): Promise<Metadata> {
  const { lang, slug = 'home' } = await params

  const payload = await getPayload({ config: configPromise })

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
  
  // Create the canonical path for this page
  const canonicalPath = slug === 'home' ? `/${lang}` : `/${lang}/${slug}`
  
  return generateMeta({ 
    doc: result.docs[0], 
    collection: 'pages', 
    lang,
    path: canonicalPath
  })
}
