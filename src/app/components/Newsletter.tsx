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
  }, [state])

  return (
    <form action={formAction} className="flex gap-4">
      <input
        name="email"
        type="email"
        placeholder={placeholderTranslations[lang]}
        required
        className="basis-1/2 border-b-2 text-white"
      />
      <Button
        type="submit"
        disabled={pending}
        className="text-smartellDarkBlue hover:bg-opacity-70 basis-1/2 rounded-full bg-white py-6 text-lg font-bold transition-colors duration-300"
      >
        {pending ? sendingTranslations[lang] : footer.newsletterButton}
      </Button>
    </form>
  )
}
