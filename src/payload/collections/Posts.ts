import { CollectionConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '../utils/generatePreviewPath'
import { slugField } from '../fields/slug'
import {
  revalidatePostsAfterChange,
  revalidatePostsAfterDelete,
} from '@/payload/hooks/revalidatePosts'
import { pathTranslations } from 'i18n.config'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc, { locale }) => {
      return generatePreviewPath({
        path: `/${locale}/${pathTranslations[locale as keyof typeof pathTranslations]}/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      })
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 3_000,
      },
    },
    maxPerDoc: 5,
  },
  hooks: {
    afterChange: [revalidatePostsAfterChange],
    afterDelete: [revalidatePostsAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
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
              localized: true,
              required: true,
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
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedArticlesLimit',
      type: 'number',
      defaultValue: 6,
      min: 0,
      max: 24,
      admin: {
        position: 'sidebar',
        description: 'Number of related articles to show (0-24)',
      },
    },
  ],
}
