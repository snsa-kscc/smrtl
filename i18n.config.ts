export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'hr', 'it'],
} as const

export const pathTranslations = {
  en: 'news',
  hr: 'vijesti',
  it: 'notizie',
} as const

export type Locale = (typeof i18n)['locales'][number]
