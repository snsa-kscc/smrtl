import type { GlobalConfig } from 'payload'
import { revalidateLayoutAfterChange } from '@/payload/hooks/revalidateLayout'

export const Header: GlobalConfig = {
  slug: 'header',
  hooks: {
    afterChange: [revalidateLayoutAfterChange],
  },
  fields: [
    {
      name: 'logotype',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    // {
    //   name: 'langSwitcher',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'label',
    //       type: 'text',
    //       required: true,
    //     },
    //     {
    //       name: 'url',
    //       type: 'text',
    //       required: true,
    //     },
    //   ],
    // },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
