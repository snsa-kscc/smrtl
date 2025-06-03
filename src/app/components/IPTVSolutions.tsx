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
    <div className="relative px-4 py-6 sm:px-8 md:px-20 lg:py-40">
      <div className="flex flex-col items-center justify-between gap-10 px-4 py-12 sm:px-8 sm:py-20 md:px-20 lg:flex-row">
        <h3 className="text-smartellLightPurple w-full text-center text-3xl font-bold text-balance md:text-4xl lg:w-2/3 lg:text-left lg:text-5xl">
          {title}
        </h3>
        <div className="w-40 lg:w-60">
          <PlayShape />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-10 px-4 pb-16 sm:px-8 md:px-20 lg:flex-row lg:pb-32">
        <p className="text-smartellDarkBlue mx-8 text-center text-2xl font-bold sm:mx-0 md:text-3xl lg:text-left lg:text-5xl">
          {subtitle}
        </p>
        <div className="shrink-0">
          <Link
            href={ctaUrl}
            className="bg-smartellDarkBlue hover:bg-smartellDarkBlue/90 inline-block cursor-pointer rounded-full px-16 py-4 text-xl font-bold text-white transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
      {IPTVBox.map((item, index) => (
        <div key={item.title} className="my-6 px-6 md:my-10">
          <p className="text-smartellLightPurple text-5xl">{String(index + 1).padStart(2, '0')}</p>

          {/* Mobile Accordion */}
          <div className="xl:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value={item.title} className="border-none">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <h3 className="text-smartellDarkBlue text-3xl font-bold md:text-4xl">
                    {item.title}
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-smartellDarkBlue pb-4 text-lg">
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
          <div className="hidden xl:my-20 xl:flex xl:flex-row xl:items-start xl:justify-between xl:gap-24">
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
          <hr className="mt-4 hidden xl:block" />
        </div>
      ))}
    </div>
  )
}
