import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .trim()
    .replace(/ /g, '-')
    .replace(/[šŠ]/g, 's')
    .replace(/[đĐ]/g, 'd')
    .replace(/[čČćĆ]/g, 'c')
    .replace(/[žŽ]/g, 'z')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value, req: { payload, locale } }) => {
    if (typeof value === 'string') {
      payload.logger.info(`formatting slug with value: ${value}`)
      return format(value)
    }

    if (operation === 'create' || operation === 'update') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        payload.logger.info(`formatting slug with fallback: ${fallbackData}`)
        return format(fallbackData)
      }
    }
    payload.logger.info(`returning value: ${value}`)
    return value
  }

export default formatSlug
