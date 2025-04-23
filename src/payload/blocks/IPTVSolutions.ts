import { Block } from 'payload'

export const IPTVSolutions: Block = {
  slug: 'iptv-solutions',
  labels: {
    singular: 'IPTV Solutions',
    plural: 'IPTV Solutions',
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
      type: 'row',
      fields: [
        {
          name: 'ctaLabel',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'ctaUrl',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'IPTVBox',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          required: true,
        },
      ],
    },
  ],
}
