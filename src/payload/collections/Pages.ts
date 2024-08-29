import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { CallToAction } from '../blocks/CallToAction'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
        {
          name: 'layout',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Hero, CallToAction],
            },
          ],
        },
        {
          name: 'seo',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
