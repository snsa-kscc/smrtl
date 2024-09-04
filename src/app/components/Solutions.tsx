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
    <div className="bg-smartellDarkBlue">
      <p className="mx-auto w-1/2 text-balance pt-28 text-center text-white">{description}</p>
      <h3 className="w-1/2 pl-24 pt-20 text-4xl font-bold text-white">
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
      <div className="flex items-center pt-20">
        <div className="basis-1/2 pl-24 text-4xl font-bold text-white">
          {industry.map((item, index) => (
            <p
              key={item.name}
              className={`text-4xl transition-colors duration-300 ${
                index === currentIndex ? 'text-smartellLightPurple' : 'text-slate-600'
              }`}
            >
              {item.name}
            </p>
          ))}
        </div>
        <div className="basis-1/2 translate-y-12">
          <Carousel setApi={setApi} plugins={[Autoplay({ delay: 2500 })]} className="w-full">
            <CarouselContent>
              {industry.map((item) => (
                <CarouselItem key={item.name} className="">
                  <div className="">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      className="w-full object-cover"
                    />
                    <div className="h-2 w-full bg-smartellLightPurple"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
