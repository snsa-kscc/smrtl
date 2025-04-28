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

export const shareTranslations = {
  en: 'Share this post',
  hr: 'Podijeli ovu objavu',
  it: 'Condividi questo post',
} as const

export const shareConfirmationTranslations = {
  en: 'Link copied!',
  hr: 'Link kopiran!',
  it: 'Link copiato!',
} as const

export const readingTimeTranslations = {
  en: 'Reading time: ',
  hr: 'Vrijeme čitanja: ',
  it: 'Tempo di lettura: ',
} as const

export const readMoreTranslations = {
  en: 'Related articles',
  hr: 'Povezani članci',
  it: 'Articoli correlati',
} as const

export type Locale = (typeof i18n)['locales'][number]
