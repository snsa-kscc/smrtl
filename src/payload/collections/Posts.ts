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
        path: `/${locale}/posts/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      })
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 3_000,
      },
    },
    maxPerDoc: 10,
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
  ],
}
