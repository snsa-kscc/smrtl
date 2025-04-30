'use client'

import { useState } from 'react'
import { Facebook, Linkedin, Link, Check } from 'lucide-react'
import { shareTranslations, shareConfirmationTranslations } from 'i18n.config'
import { Locale } from 'i18n.config'
interface ShareButtonsProps {
  url: string
  title: string
  lang: Locale
}

export const ShareButtons = ({ url, title, lang }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false)

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const shareToLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mb-8 flex flex-col gap-4">
      <span className="mr-2 text-gray-800">{shareTranslations[lang]}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={shareToLinkedIn}
          className="rounded-sm bg-zinc-700 p-2 text-white transition-colors hover:bg-gray-800"
          aria-label="Share to LinkedIn"
        >
          <Linkedin size={20} />
        </button>
        <button
          onClick={shareToFacebook}
          className="rounded-full bg-zinc-700 p-2 text-white transition-colors hover:bg-gray-800"
          aria-label="Share to Facebook"
        >
          <Facebook size={20} />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 text-black transition-colors hover:text-gray-600"
          aria-label="Copy link"
        >
          {copied ? <Check size={20} /> : <Link size={20} />}
        </button>
        {copied && (
          <span className="text-smartellLightPurple text-sm font-medium">
            {shareConfirmationTranslations[lang]}
          </span>
        )}
      </div>
    </div>
  )
}
