import { CollectionConfig } from 'payload'
import formatSlug from '../utils/formatSlug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '../utils/generatePreviewPath'
import { revalidatePost } from '../utils/revalidatePath'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts',
  },
  admin: {
    useAsTitle: 'title',
    preview: (doc, { locale }) => {
      if (doc?.slug) {
        //2DO fix this
        return generatePreviewPath({
          path: `/${locale}/posts/${typeof doc.slug === 'string' ? doc.slug : ''}`,
        })
      }
      return null
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
    afterDelete: [
      ({ doc }) => {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!', doc.slug)
        revalidatePost(doc.slug)
      },
    ], // revalidate path with doc slug
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
              required: true,
              localized: true,
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
      localized: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [() => revalidatePost()],
        beforeChange: [formatSlug('title')],
      },
    },
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
