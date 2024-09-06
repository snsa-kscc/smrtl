import type { Block } from 'payload'

export const ImageHero: Block = {
  slug: 'image-hero',
  labels: {
    singular: 'Image Hero',
    plural: 'Image Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'logo',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
