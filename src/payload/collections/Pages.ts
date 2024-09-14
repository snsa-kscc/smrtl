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
import { HomeFooter } from '../blocks/HomeFooter'
import { Archive } from '../blocks/Archive'
import formatSlug from '../utils/formatSlug'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

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
                HomeFooter,
                Archive,
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeChange: [formatSlug('title')],
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
