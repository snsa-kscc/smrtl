'use client'

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { QAShape } from './shapes/QAShape'

export function Question({
  title,
  firstSubtitle,
  secondSubtitle,
}: {
  title: string
  firstSubtitle: string
  secondSubtitle: string
}) {
  return (
    <div className="bg-smartellDarkBlue px-6 py-24 md:px-12 lg:px-24 xl:px-32">
      <h2 className="text-10xl text-smartellLightPurple mb-2 px-10 pt-20 text-center font-bold text-balance">
        {title}
      </h2>
      <p className="mx-auto w-1/2 text-white">{firstSubtitle}</p>
      <p className="mx-auto w-1/2 text-white">{secondSubtitle}</p>
    </div>
  )
}
