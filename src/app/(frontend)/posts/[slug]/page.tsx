import Image from 'next/image'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

type Locale = 'en' | 'hr' | 'it'
const locales: Locale[] = ['en', 'hr', 'it']

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config: configPromise })

  // Find the post by slug to get its ID
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  if (!result.docs[0]) {
    return null
  }

  const postId = result.docs[0].id

  // Fetch localized versions
  const localizedPosts = await Promise.all(
    locales.map(async (locale: Locale) => {
      const localizedPost = await payload.findByID({
        collection: 'posts',
        id: postId,
        depth: 1,
        locale: locale,
      })
      return { locale, post: localizedPost }
    }),
  )

  // Create a dictionary of localized posts
  const postsByLocale = Object.fromEntries(
    localizedPosts.map(({ locale, post }) => [locale, post.slug]),
  )

  // Use 'en' locale for display (you can change this based on user preference)
  const { title, content, featuredImage } = result.docs?.[0]

  return (
    <>
      <h1>{title}</h1>
      <div>{content}</div>
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
