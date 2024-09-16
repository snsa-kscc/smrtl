import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'copyright',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
