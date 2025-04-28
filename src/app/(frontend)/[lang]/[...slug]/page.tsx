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
import { ShareButtons } from '@/app/components/ShareButtons'
import { ArchiveBlock } from '@/app/components/ArchiveBlock'
import { readMoreTranslations } from 'i18n.config'

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

  const { title, content, featuredImage, relatedArticlesLimit } = result.docs?.[0]

  return (
    <>
      <LocaleLinksUpdater localeLinks={localizedPosts} />
      <h1 className="text-smartellLightPurple px-8 pt-40 text-center text-4xl font-bold md:px-16 lg:text-left lg:text-5xl xl:text-8xl">
        {title}
      </h1>
      {featuredImage && (
        <div className="pt-40">
          <Image
            src={(featuredImage as Media).url ?? ''}
            alt={(featuredImage as Media).alt ?? ''}
            width={(featuredImage as Media).width ?? 0}
            height={(featuredImage as Media).height ?? 0}
            className="mx-auto max-w-[1920px]"
            quality={100}
          />
        </div>
      )}
      {content?.content && (
        <Content content={content.content} includeReadingTime={true} lang={lang} />
      )}

      <div className="mx-auto w-5xl max-w-full px-8">
        <ShareButtons
          url={`${process.env.NEXT_PUBLIC_SERVER_URL}/${lang}/${pathTranslations[lang]}/${pathSlug[0]}`}
          title={title}
          lang={lang}
        />
      </div>
      <div className="mx-auto w-5xl max-w-full px-8 py-16">
        <h2 className="text-smartellLightPurple text-2xl font-bold">
          {readMoreTranslations[lang]}
        </h2>
        <ArchiveBlock
          lang={lang}
          limit={relatedArticlesLimit ? relatedArticlesLimit + 1 : 6} // because we are excluding current post
          isShape={false}
          excludeSlug={pathSlug[0]}
        />
      </div>
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
