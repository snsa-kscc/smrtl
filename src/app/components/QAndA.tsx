'use client'

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { QAShape } from './shapes/QAShape'

export function QAndA({
  title,
  subtitle,
  qAndABox,
}: {
  title: string
  subtitle: string
  qAndABox: { question: string; answer: string }[]
}) {
  return (
    <div className="bg-smartellDarkBlue">
      <h2 className="mb-2 text-balance px-10 pt-20 text-center text-10xl font-bold text-smartellLightPurple">
        {title}
      </h2>
      <p className="mx-auto w-1/2 text-white">{subtitle}</p>
      <div className="flex items-center justify-between gap-10">
        <div className="relative max-w-2xl basis-1/2 translate-y-40">
          <div className="absolute left-1/2 top-[10%] -translate-x-1/2 text-10xl font-bold text-smartellLightPurple">
            <p>QA</p>
          </div>
          <QAShape />
        </div>
        <div className="mx-32 max-w-3xl basis-1/2">
          <Accordion type="single" collapsible>
            {qAndABox.map((item, index) => (
              <AccordionItem key={index} value={item.question} className="my-8">
                <AccordionTrigger className="text-left text-lg font-bold text-white hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="w-11/12 text-white">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
