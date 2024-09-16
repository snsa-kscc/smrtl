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
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'firstLineFeatures',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'secondLineFeatures',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
