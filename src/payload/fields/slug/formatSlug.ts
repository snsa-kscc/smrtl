import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/—/g, '-')
    .replace(/--+/g, '-')
    .replace(/[š]/g, 's')
    .replace(/[đ]/g, 'd')
    .replace(/[č]/g, 'c')
    .replace(/[ć]/g, 'c')
    .replace(/[ž]/g, 'z')
    .replace(/[^\w-]+/g, '')

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
