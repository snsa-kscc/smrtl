import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '@/payload-types'

export const revalidatePostsAfterChange: CollectionAfterChangeHook<Post> = ({
  doc,
  req: { payload },
}) => {
  // if (doc._status === 'published') {
  //   payload.logger.info(`Revalidating posts.`)

  //   revalidatePath('/(frontend)/[lang]/[...slug]', 'page')
  // }

  return doc
}

export const revalidatePostsAfterDelete: CollectionAfterDeleteHook<Post> = ({
  req: { payload },
}) => {
  payload.logger.info(`Revalidating posts.`)

  revalidatePath('/(frontend)/[lang]/[...slug]', 'page')
}
