import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Content } from '@/app/components/Content'
import { Locale, pathTranslations } from 'i18n.config'
import { notFound } from 'next/navigation'
import { fetchLocalizedVersions } from '@/app/lib/utils'
import type { Media } from '@/payload-types'
import { LocaleLinksUpdater } from '@/app/context/LocaleLinksContext'
import { Metadata } from 'next'
import { generateMeta } from '@/app/lib/generateMeta'
import { draftMode } from 'next/headers'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    depth: 1,
    limit: 1000,
    locale: 'all',
  })

  const params = posts.docs.flatMap((post) => {
    return Object.entries(post.slug ?? {})
      .filter(([_, slug]) => slug != null)
      .map(([lang, slug]) => ({
        lang,
        slug: [pathTranslations[lang as keyof typeof pathTranslations], slug],
      }))
  })

  return params
}

export default async function Page({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string[] }
}) {
  const [pathLang, ...pathSlug] = slug

  if (pathLang !== pathTranslations[lang]) {
    notFound()
  }

  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    depth: 1,
    limit: 1,
    where: { slug: { equals: pathSlug[0] } },
    locale: lang,
  })

  if (!result.docs[0]) {
    notFound()
  }

  const localizedPosts = await fetchLocalizedVersions(payload, 'posts', pathSlug[0])

  const { title, content, featuredImage } = result.docs?.[0]

  return (
    <>
      <LocaleLinksUpdater localeLinks={localizedPosts} />
      <h1>{title}</h1>
      <p>{new Date().toString()}</p>
      {content?.content && <Content content={content.content} />}
      {featuredImage && (
        <Image
          src={(featuredImage as Media).url ?? ''}
          alt={(featuredImage as Media).alt ?? ''}
          width={(featuredImage as Media).width ?? 0}
          height={(featuredImage as Media).height ?? 0}
        />
      )}
    </>
  )
}

export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: string[] }
}): Promise<Metadata> {
  const [_, ...pathSlug] = slug
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    depth: 1,
    limit: 1,
    where: { slug: { equals: pathSlug[0] } },
    locale: lang,
  })

  if (!result.docs[0]) {
    return {}
  }

  return generateMeta({ doc: result.docs[0], collection: 'posts', lang })
}
