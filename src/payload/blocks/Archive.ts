import type { Block } from 'payload'

export const Archive: Block = {
  slug: 'archive',
  labels: {
    singular: 'Archive',
    plural: 'Archives',
  },
  fields: [
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      label: 'Limit',
    },
  ],
}
