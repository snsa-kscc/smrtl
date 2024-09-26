import type { CheckboxField, TextField } from 'payload'

import { formatSlugHook } from './formatSlug'

type Slug = (fieldToUse?: string) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title') => {
  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
  }

  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug',
    required: true,
    unique: true,
    localized: true,
    hooks: {
      // Kept this in for hook or API based updates
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      components: {
        Field: {
          path: '@/payload/fields/slug/SlugComponent#SlugComponent',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
            path: 'slug',
          },
        },
      },
    },
  }

  return [slugField, checkBoxField]
}
