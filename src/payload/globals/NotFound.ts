import type { GlobalConfig } from 'payload'

export const NotFound: GlobalConfig = {
  slug: 'not-found',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}
