import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: {
    singular: 'Feature',
    plural: 'Features',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'firstLineFeatures',
      type: 'text',
      required: true,
    },
    {
      name: 'secondLineFeatures',
      type: 'text',
      required: true,
    },
  ],
}
