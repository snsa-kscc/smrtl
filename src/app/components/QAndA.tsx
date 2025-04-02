'use client'

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { QAShape } from './shapes/QAShape'

export function QAndA({ qAndABox }: { qAndABox: { question: string; answer: string }[] }) {
  return (
    <div className="from-smartellDarkBlue to-smartellDarkBlue/85 bg-gradient-to-b">
      <div className="flex items-center justify-between gap-10">
        <div className="relative max-w-2xl basis-1/2 translate-y-40">
          <div className="text-10xl text-smartellLightPurple absolute top-[10%] left-1/2 -translate-x-1/2 font-bold">
            <p>QA</p>
          </div>
          <QAShape />
        </div>
        <div className="mx-32 max-w-3xl basis-1/2">
          <Accordion type="single" collapsible>
            {qAndABox.map((item, index) => (
              <AccordionItem key={index} value={item.question} className="my-8">
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
