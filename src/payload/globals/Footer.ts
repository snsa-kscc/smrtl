import type { GlobalConfig } from 'payload'
import { revalidateLayoutAfterChange } from '@/payload/hooks/revalidateLayout'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [revalidateLayoutAfterChange],
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
