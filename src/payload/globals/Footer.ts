import type { GlobalConfig } from 'payload'
import { revalidateLayoutAfterChange } from '@/payload/hooks/revalidateLayout'

export const Footer: GlobalConfig = {
  slug: 'footer',
  hooks: {
    afterChange: [revalidateLayoutAfterChange],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'contactTitle',
      type: 'text',
      required: true,
      localized: true,
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
          localized: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'infoTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'newsletterTitle',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'newsletterButton',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'newsletterDisclaimer',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'successMessage',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'errorMessage',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
