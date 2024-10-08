import type { Block } from 'payload'

export const Solutions: Block = {
  slug: 'solutions',
  labels: {
    singular: 'Solution',
    plural: 'Solutions',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
    {
      name: 'industry',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
