import type { FieldHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post, Page } from '@/payload-types'

export const revalidatePost = (slug?: string): FieldHook<Post> => {
  return async ({ data, req: { payload, locale } }): Promise<CollectionAfterDeleteHook<Post>> => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!', slug)
    if (slug) {
      payload.logger.info(`Revalidating deleted post at path: ${slug}`)

      revalidatePath(`/${locale}/posts/${slug}`)
      return data as CollectionAfterDeleteHook<Post>
    }
    if (data?._status === 'published') {
      // const foo = await payload.find({
      //   collection: 'posts',
      //   depth: 1,
      //   limit: 1,
      //   where: { slug: { equals: data.slug } },
      //   locale: 'all',
      // })

      const path = `/${locale}/posts/${data.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      return data as CollectionAfterDeleteHook<Post>
    }
    return data as CollectionAfterDeleteHook<Post>
  }
}

export const revalidatePage: FieldHook<Page> = ({
  data,
  previousDoc,
  req: { payload, locale },
}) => {
  if (data?._status === 'published') {
    const path = data.slug === 'home' ? `/${locale}` : `/${locale}/${data.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    revalidatePath(path)
  }

  if (previousDoc?._status === 'published' && data?._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? `/${locale}` : `/${locale}/${previousDoc.slug}`

    payload.logger.info(`Revalidating old page at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return data
}
