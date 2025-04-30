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
import { Referrals } from '../blocks/Referrals'
import { Archive } from '../blocks/Archive'
import { Question } from '../blocks/Question'
import { Benefits } from '../blocks/Benefits'
import {
  revalidatePagesAfterChange,
  revalidatePagesAfterDelete,
} from '@/payload/hooks/revalidatePages'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '../utils/generatePreviewPath'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    // preview: (doc, { locale }) => {
    //   return generatePreviewPath({
    //     path: `/${locale}/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
    //   })
    // },
  },
  // versions: {
  //   drafts: {
  //     autosave: {
  //       interval: 3_000,
  //     },
  //   },
  //   maxPerDoc: 10,
  // },
  hooks: {
    afterChange: [revalidatePagesAfterChange],
    afterDelete: [revalidatePagesAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        condition: (data) => data?.slug !== 'home',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              name: 'content',
              admin: {
                condition: (data) => data?.slug !== 'home',
              },
              type: 'richText',
              localized: true,
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
                Referrals,
                Archive,
                Question,
                Benefits,
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
    ...slugField(),
    {
      name: 'titleVisibleInFooter',
      type: 'checkbox',
      defaultValue: false,
      localized: true,
      admin: {
        position: 'sidebar',
        condition: (data) => data?.slug !== 'home',
      },
    },
  ],
}
