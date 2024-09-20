export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'hr', 'it'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export type Dictionary = {
  not_found: {
    title: string
    description: string
  }
  // ... other dictionary entries ...
}
