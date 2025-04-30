import type { Block } from 'payload'

export const Referrals: Block = {
  slug: 'referrals',
  labels: {
    singular: 'Referrals',
    plural: 'Referrals',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'referrals',
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
