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
    },
    {
      name: 'IPTVBox',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
