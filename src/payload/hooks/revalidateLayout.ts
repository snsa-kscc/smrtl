import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateLayoutAfterChange: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating layout.`)

  revalidatePath('/(frontend)/[lang]/[slug]', 'layout')
  revalidatePath('/(frontend)/[lang]/[...slug]', 'layout')

  return doc
}
