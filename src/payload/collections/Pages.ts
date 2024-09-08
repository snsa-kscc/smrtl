import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { QAndA } from '../blocks/QAndA'
import { Solutions } from '../blocks/Solutions'
import { Counter } from '../blocks/Counter'
import { Features } from '../blocks/Features'
import { ImageHero } from '../blocks/ImageHero'
import { IPTVSolutions } from '../blocks/IPTVSolutions'
import { Compatibility } from '../blocks/Compatibility'
import { Brands } from '../blocks/Brands'
import { Referals } from '../blocks/Referals'

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
              blocks: [
                Hero,
                QAndA,
                Solutions,
                Counter,
                Features,
                ImageHero,
                IPTVSolutions,
                Compatibility,
                Brands,
                Referals,
              ],
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
