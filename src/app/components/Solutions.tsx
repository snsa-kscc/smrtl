'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

type ImageType = {
  url: string
  alt: string
  width: number
  height: number
}

type IndustryType = {
  name: string
  image: ImageType
}

export function Solutions({
  title,
  description,
  industry,
}: {
  title: string
  description: string
  industry: IndustryType[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="bg-smartellDarkBlue py-4 md:py-24">
      <h3 className="w-full px-6 py-12 text-center text-3xl font-bold text-balance text-white md:px-24 md:py-20 md:text-4xl lg:text-5xl">
        {title.split('**').map((part, index) =>
          index % 2 === 0 ? (
            part
          ) : (
            <span key={index} className="text-smartellLightPurple">
              {part}
            </span>
          ),
        )}
      </h3>
      <div className="flex flex-col items-end justify-between pt-4 md:flex-row lg:pt-12">
        <div className="basis-1/2">
          <p className="w-full px-6 pb-10 text-2xl font-bold text-balance text-white md:pt-28 md:pl-24 md:text-3xl lg:text-4xl">
            {description}
          </p>
          <div className="mb-8 w-full px-6 md:mb-0 md:basis-1/2 md:pl-24">
            {/* For md and larger screens - show all items */}
            <div className="hidden md:block">
              {industry.map((item, index) => (
                <p
                  key={item.name}
                  className={`text-2xl font-bold transition-colors duration-300 md:text-3xl lg:mb-4 lg:text-4xl xl:text-5xl ${
                    index === currentIndex ? 'text-smartellLightPurple' : 'text-slate-600'
                  }`}
                >
                  {item.name}
                </p>
              ))}
            </div>
            {/* For xs and sm screens - show only current item with animation */}
            <div className="relative h-6 md:hidden">
              {industry.map((item, index) => (
                <p
                  key={item.name}
                  className={`absolute top-0 left-0 text-2xl font-bold transition-all duration-500 ${
                    index === currentIndex
                      ? 'text-smartellLightPurple translate-y-0 opacity-100'
                      : 'translate-y-8 text-slate-600 opacity-0'
                  }`}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:basis-1/2 xl:translate-y-12">
          <Carousel setApi={setApi} plugins={[Autoplay({ delay: 2500 })]} className="w-full">
            <CarouselContent>
              {industry.map((item) => (
                <CarouselItem key={item.name}>
                  <div>
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      className="w-full object-cover"
                    />
                    <div className="bg-smartellLightPurple h-2 w-full"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex items-center justify-center gap-4 pt-3 md:hidden">
            <p className="text-lg text-white">{currentIndex + 1}</p>
            <hr className="h-0.5 w-12 bg-white" />
            <p className="text-lg text-white">{industry.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
