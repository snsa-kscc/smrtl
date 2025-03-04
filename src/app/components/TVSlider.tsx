'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'
import { Button } from './ui/button'
import Autoplay from 'embla-carousel-autoplay'

type ImageType = {
  url: string
  alt: string
  width: number
  height: number
}

export function TVSlider({
  caseStudy,
}: {
  caseStudy: {
    id: string
    image: ImageType
  }[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Transform scale based on scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 50%', 'start start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setCurrentSlide(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div ref={containerRef} className="flex flex-col items-center px-4 py-10 sm:px-6 md:px-8">
      <motion.div className="relative mx-auto w-full max-w-5xl" style={{ scale }}>
        {/* TV Frame */}
        <div className="relative">
          {/* TV Bezel */}
          <div className="relative aspect-video overflow-hidden rounded-md border-6 border-gray-800 bg-black shadow-2xl">
            {/* TV Screen with Slider */}
            <div className="relative h-full w-full overflow-hidden bg-black">
              {/* Screen Glare Effect */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>

              {/* Carousel */}
              <Carousel
                setApi={setApi}
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                className="h-full w-full"
              >
                <CarouselContent>
                  {caseStudy.map((item) => (
                    <CarouselItem key={item.id}>
                      <div className="relative h-full w-full">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt}
                          width={item.image.width}
                          height={item.image.height}
                          className="object-cover"
                          priority={caseStudy.indexOf(item) === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => api?.scrollPrev()}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => api?.scrollNext()}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </Carousel>
            </div>
          </div>

          {/* TV Stand */}
          <div className="absolute bottom-0 left-1/2 mx-auto w-1/4 -translate-x-1/2 translate-y-[95%]">
            <div className="h-4 rounded-t-md bg-gray-800"></div>
            <div className="h-12 rounded-b-md bg-gradient-to-b from-gray-700 to-gray-900"></div>
          </div>
        </div>

        {/* TV Logo */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[120%]">
          <p className="text-sm font-semibold tracking-wider text-gray-400">SMARTELL</p>
        </div>
      </motion.div>
    </div>
  )
}
