'use client'

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { QAShape } from './shapes/QAShape'
import { useIsMobile } from '../hooks/use-mobile'

export function QAndA({ qAndABox }: { qAndABox: { question: string; answer: string }[] }) {
  const isMobile = useIsMobile(1024)
  return (
    <div className="from-smartellDarkBlue to-smartellDarkBlue/85 bg-gradient-to-b lg:py-14 2xl:py-0">
      <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="relative basis-3/4 translate-y-20 lg:translate-y-44">
          <div className="lg:text-10xl text-smartellLightPurple text-8xl font-bold lg:absolute lg:top-[10%] lg:left-1/2 lg:-translate-x-1/2">
            <p className="text-center">QA</p>
          </div>
          <QAShape isMobile={isMobile} />
        </div>
        <div className="mx-8 max-w-3xl basis-1/2 pb-4 md:pb-6 lg:mx-16 xl:mx-32">
          <Accordion type="single" collapsible>
            {qAndABox.map((item, index) => (
              <AccordionItem key={index} value={item.question} className="mt-1 mb-10 lg:mt-10">
                <AccordionTrigger className="text-left text-3xl font-bold text-white hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="w-11/12 text-lg text-white">
                  {item.answer.split('**').map((part, index) =>
                    index % 2 === 0 ? (
                      part
                    ) : (
                      <span key={index} className="font-bold">
                        {part}
                      </span>
                    ),
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
