export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'hr', 'it'],
} as const

export const pathTranslations = {
  en: 'news',
  hr: 'vijesti',
  it: 'notizie',
} as const

export const placeholderTranslations = {
  en: 'Your email',
  hr: 'Tvoj email',
  it: 'Il tuo email',
} as const

export const sendingTranslations = {
  en: 'Sending...',
  hr: 'Slanje...',
  it: 'Invio...',
} as const

export const contactTranslations = {
  en: 'contact',
  hr: 'kontakt',
  it: 'contatto',
} as const

export type Locale = (typeof i18n)['locales'][number]
