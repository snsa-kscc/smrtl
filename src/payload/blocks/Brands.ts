import type { Block } from 'payload'

export const Brands: Block = {
  slug: 'brands',
  labels: {
    singular: 'Brands',
    plural: 'Brands',
  },
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
    {
      name: 'brands',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
      ],
    },
  ],
}
