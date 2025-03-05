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
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'addressLine2',
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
          name: 'newsletterSubtitle',
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
    {
      type: 'row',
      fields: [
        {
          name: 'LinkedIn',
          type: 'text',
          required: true,
        },
        {
          name: 'Facebook',
          type: 'text',
          required: true,
        },
        {
          name: 'Instagram',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
