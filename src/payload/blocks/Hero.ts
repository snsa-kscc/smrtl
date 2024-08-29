import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'swappingTitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
