import type { Block } from 'payload'

export const HomeFooter: Block = {
  slug: 'home-footer',
  labels: {
    singular: 'Home Footer',
    plural: 'Home Footer',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'contactTitle',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'infoTitle',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'newsletterTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'newsletterButton',
          type: 'text',
          required: true,
        },
        {
          name: 'newsletterDisclaimer',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
