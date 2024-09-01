'use client'

import React, { useState } from 'react'

export function QAndA({
  title,
  subtitle,
  qAndABox,
}: {
  title: string
  subtitle: string
  qAndABox: { question: string; answer: string }[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full px-4 pt-16">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-6">{subtitle}</p>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        {qAndABox.map((item, index) => (
          <div key={index} className="mb-2 rounded border">
            <button
              className="w-full p-4 text-left font-medium focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="float-right">{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && <div className="bg-gray-100 p-4">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
