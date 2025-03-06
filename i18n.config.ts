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
}

export const sendingTranslations = {
  en: 'Sending...',
  hr: 'Slanje...',
  it: 'Invio...',
}

export type Locale = (typeof i18n)['locales'][number]
