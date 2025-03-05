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
    <div className="from-smartellDarkBlue to-smartellDarkBlue/85 bg-gradient-to-b px-6 pt-20 pb-40 md:px-12 lg:px-24 xl:px-32">
      <h2 className="text-10xl text-smartellLightPurple mb-20 px-10 pt-20 text-center font-bold text-balance">
        {title}
      </h2>
      <p className="mx-auto mb-20 w-3/4 text-center text-2xl font-bold text-white md:text-3xl lg:text-4xl">
        {firstSubtitle}
      </p>
      <p className="mx-auto text-center text-2xl text-white">{secondSubtitle}</p>
    </div>
  )
}
