import type { Block } from 'payload'

export const Question: Block = {
  slug: 'question',
  labels: {
    singular: 'Question',
    plural: 'Questions',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'firstSubtitle',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'secondSubtitle',
      type: 'textarea',
      required: true,
      localized: true,
    },
  ],
}
