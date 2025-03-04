'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'

type IPTVBoxProp = {
  title: string
  description: string
}

export function IPTVSolutions({
  title,
  firstSubtitle,
  secondSubtitle,
  IPTVBox,
}: {
  title: string
  firstSubtitle: string
  secondSubtitle: string
  IPTVBox: IPTVBoxProp[]
}) {
  return (
    <div className="relative px-4 py-6 sm:px-8 md:px-20 md:py-10">
      <h3 className="text-smartellDarkBlue mb-8 text-2xl font-bold md:mb-20 md:text-4xl">
        {title}
      </h3>
      <p className="mb-4 text-base leading-relaxed md:text-xl">{firstSubtitle}</p>
      <p className="mb-8 text-base leading-relaxed md:text-xl">{secondSubtitle}</p>
      {IPTVBox.map((item, index) => (
        <div key={item.title} className="my-6 md:my-10">
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
          <div className="hidden md:my-20 md:flex md:flex-row md:items-start md:justify-between md:gap-4">
            <div className="basis-1/2">
              <h3 className="text-smartellDarkBlue text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
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
