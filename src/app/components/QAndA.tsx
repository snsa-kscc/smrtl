'use client'

import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'

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
    <div className="w-full px-4 pt-16">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-6">{subtitle}</p>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Accordion type="single" collapsible>
          {qAndABox.map((item, index) => (
            <AccordionItem key={index} value={item.question}>
              <AccordionTrigger className="text-lg font-bold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
