import type { Block } from 'payload'

export const Compatibility: Block = {
  slug: 'compatibility',
  labels: {
    singular: 'Compatibility',
    plural: 'Compatibility',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'platform',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'ctaHook',
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
        },
      ],
    },
  ],
}
