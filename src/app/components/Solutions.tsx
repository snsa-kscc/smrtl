'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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

export function Solutions({ title, industry }: { title: string; industry: IndustryType[] }) {
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
    <div className="flex">
      <div className="w-1/2 pr-4">
        <h3>
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
        <div className="mt-4">
          {industry.map((item, index) => (
            <p
              key={item.name}
              className={`mb-2 text-4xl transition-colors duration-300 ${
                index === currentIndex ? 'text-smartellLightPurple' : 'text-black'
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <Carousel setApi={setApi} plugins={[Autoplay({ delay: 2500 })]} className="w-full max-w-xs">
          <CarouselContent>
            {industry.map((item) => (
              <CarouselItem key={item.name} className="pt-1 md:pt-2">
                <div className="flex flex-col items-center justify-start p-2">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="object-cover"
                  />
                  <div className="h-2 bg-smartellLightPurple"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
