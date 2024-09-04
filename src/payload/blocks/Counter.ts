import type { Block } from 'payload'

export const Counter: Block = {
  slug: 'counter',
  labels: {
    singular: 'Counter',
    plural: 'Counters',
  },
  fields: [
    {
      name: 'counterBox',
      type: 'array',
      fields: [
        {
          name: 'number',
          type: 'number',
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
  ],
}
