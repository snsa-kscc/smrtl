import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '@/payload-types'

export const revalidatePagesAfterChange: CollectionAfterChangeHook<Page> = ({
  doc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    payload.logger.info(`Revalidating pages.`)

    revalidatePath('/(frontend)/[lang]/[...slug]', 'page')
  }

  return doc
}

export const revalidatePagesAfterDelete: CollectionAfterDeleteHook<Page> = ({
  req: { payload },
}) => {
  payload.logger.info(`Revalidating pages.`)

  revalidatePath('/(frontend)/[lang]/[...slug]', 'page')
}
