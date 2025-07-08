'use client'

import { useActionState, useEffect } from 'react'
import { subscribeToNewsletter } from '../actions/newsletter-action'
import { toast } from 'sonner'
import { Locale, placeholderTranslations, sendingTranslations } from 'i18n.config'
import { Button } from './ui/button'
import type { Footer } from '../../payload-types'

export function NewsletterForm({ footer, lang }: { footer: Footer; lang: Locale }) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, null)

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(footer.successMessage, {
          duration: 5000,
        })
      } else {
        toast.error(footer.errorMessage, {
          duration: 5000,
        })
      }
    }
  }, [state, footer.successMessage, footer.errorMessage])

  return (
    <form action={formAction} className="flex flex-col gap-x-4 gap-y-8 lg:flex-row">
      <input
        name="email"
        type="email"
        placeholder={placeholderTranslations[lang]}
        required
        className="basis-3/4 border-b-2 text-white"
      />
      <Button
        type="submit"
        disabled={pending}
        className="text-smartellDarkBlue basis-1/2 cursor-pointer self-start rounded-full bg-white px-16 py-4 text-xl font-bold transition-colors duration-300 hover:bg-white/80 lg:mx-0 lg:py-7"
      >
        {pending ? sendingTranslations[lang] : footer.newsletterButton}
      </Button>
    </form>
  )
}
