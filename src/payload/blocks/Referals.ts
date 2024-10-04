import type { Block } from 'payload'

export const Referals: Block = {
  slug: 'referals',
  labels: {
    singular: 'Referals',
    plural: 'Referals',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'referals',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
