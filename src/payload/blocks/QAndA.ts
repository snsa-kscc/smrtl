import type { Block } from 'payload'

export const QAndA: Block = {
  slug: 'q-and-a',
  labels: {
    singular: 'Q and A',
    plural: 'Q and A',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'qAndABox',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
