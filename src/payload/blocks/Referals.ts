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
          relationTo: 'media',
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'role',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
