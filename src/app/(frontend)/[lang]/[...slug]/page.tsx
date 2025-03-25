import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
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
  const payload = await getPayload({ config: configPromise })

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
  params,
}: {
  params: Promise<{ lang: Locale; slug: string[] }>
}) {
  const { lang, slug } = await params
  const [pathLang, ...pathSlug] = slug

  if (pathLang !== pathTranslations[lang]) {
    notFound()
  }

  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

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
      <h1 className="text-smartellLightPurple container mx-auto pt-40 text-center text-4xl font-bold lg:text-left lg:text-5xl xl:text-8xl">
        {title}
      </h1>
      {featuredImage && (
        <div className="container mr-auto pt-12">
          <Image
            src={(featuredImage as Media).url ?? ''}
            alt={(featuredImage as Media).alt ?? ''}
            width={(featuredImage as Media).width ?? 0}
            height={(featuredImage as Media).height ?? 0}
          />
        </div>
      )}
      {content?.content && <Content content={content.content} />}
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string[] }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const [_, ...pathSlug] = slug
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

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
