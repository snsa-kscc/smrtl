'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type LocaleLink = {
  locale: string
  slug: string
}

type LocaleLinksContextType = {
  localeLinks: LocaleLink[]
  setLocaleLinks: React.Dispatch<React.SetStateAction<LocaleLink[]>>
}

const LocaleLinksContext = createContext<LocaleLinksContextType | undefined>(undefined)

export function LocaleLinksProvider({ children }: { children: React.ReactNode }) {
  const [localeLinks, setLocaleLinks] = useState<LocaleLink[]>([])

  return (
    <LocaleLinksContext.Provider value={{ localeLinks, setLocaleLinks }}>
      {children}
    </LocaleLinksContext.Provider>
  )
}

export function useLocaleLinks() {
  const context = useContext(LocaleLinksContext)
  if (context === undefined) {
    throw new Error('useLocaleLinks must be used within a LocaleLinksProvider')
  }
  return context
}

export function LocaleLinksUpdater({ localeLinks }: { localeLinks: LocaleLink[] }) {
  const { setLocaleLinks } = useLocaleLinks()

  useEffect(() => {
    if (localeLinks && localeLinks.length > 0) {
      setLocaleLinks(localeLinks)
    }
  }, [localeLinks, setLocaleLinks])

  return null
}
