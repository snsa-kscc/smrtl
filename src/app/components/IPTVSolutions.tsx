'use client'

import Link from 'next/link'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { PlayShape } from '@/app/components/shapes/PlayShape'

type IPTVBoxProp = {
  title: string
  description: string
}

export function IPTVSolutions({
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  IPTVBox,
}: {
  title: string
  subtitle: string
  ctaLabel: string
  ctaUrl: string
  IPTVBox: IPTVBoxProp[]
}) {
  return (
    <div className="relative px-4 py-6 sm:px-8 md:px-20 md:py-40">
      <div className="flex flex-col items-center justify-between px-4 py-20 sm:px-8 md:flex-row md:px-20">
        <h3 className="text-smartellLightPurple w-full text-3xl font-bold text-balance md:w-2/3 md:text-4xl lg:text-5xl">
          {title}
        </h3>
        <div className="w-60">
          <PlayShape />
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-32 sm:px-8 md:px-20">
        <p className="text-smartellDarkBlue text-2xl font-bold md:text-3xl lg:text-5xl">
          {subtitle}
        </p>
        <div>
          <Link
            href={ctaUrl}
            className="bg-smartellDarkBlue hover:bg-smartellDarkBlue/90 inline-block cursor-pointer rounded-full px-16 py-4 text-xl font-bold text-white transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
      {IPTVBox.map((item, index) => (
        <div key={item.title} className="my-6 px-20 md:my-10">
          <p className="text-smartellLightPurple text-5xl">{String(index + 1).padStart(2, '0')}</p>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value={item.title} className="border-none">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <h3 className="text-smartellDarkBlue text-4xl font-bold">{item.title}</h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-smartellDarkBlue pb-4 text-sm">
                    {item.description.split('**').map((part, index) =>
                      index % 2 === 0 ? (
                        part
                      ) : (
                        <span key={index} className="font-bold">
                          {part}
                        </span>
                      ),
                    )}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <hr />
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:my-20 md:flex md:flex-row md:items-start md:justify-between md:gap-24">
            <div className="basis-1/2">
              <h3 className="text-smartellDarkBlue text-4xl font-bold sm:text-5xl md:text-6xl">
                {item.title}
              </h3>
            </div>
            <div className="basis-1/2">
              <p className="text-smartellDarkBlue text-2xl">
                {item.description.split('**').map((part, index) =>
                  index % 2 === 0 ? (
                    part
                  ) : (
                    <span key={index} className="font-bold">
                      {part}
                    </span>
                  ),
                )}
              </p>
            </div>
          </div>
          <hr className="mt-4 hidden md:block" />
        </div>
      ))}
    </div>
  )
}
