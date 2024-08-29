import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'call-to-action',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  fields: [
    {
      name: 'call',
      type: 'text',
    },
    {
      name: 'additionalText',
      type: 'text',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonLink',
      type: 'text',
    },
  ],
}
