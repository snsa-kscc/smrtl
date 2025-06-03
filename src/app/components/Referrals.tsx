'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/use-mobile'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/app/components/ui/carousel'

type ReferralsProps = {
  name: string
  role: string
  message: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
}

export function Referrals({ title, referrals }: { title: string; referrals: ReferralsProps[] }) {
  // --- States and Refs for Desktop version ---
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const motionDivRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScrollReached, setMaxScrollReached] = useState(0)
  // --- End States and Refs for Desktop version ---

  const isMobile = useIsMobile()

  // --- States for Mobile Carousel version ---
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  // --- End States for Mobile Carousel version ---

  // Effect for Desktop: Get the viewport width on mount and when window resizes
  useEffect(() => {
    if (isMobile) return
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth)
    }

    updateViewportWidth()
    window.addEventListener('resize', updateViewportWidth)
    return () => window.removeEventListener('resize', updateViewportWidth)
  }, [isMobile])

  // Effect for Desktop: Handle scroll events to calculate horizontal scroll position
  useEffect(() => {
    if (isMobile || !containerRef.current || !stickyRef.current || !motionDivRef.current) return

    const scrollableContentWidth = motionDivRef.current.scrollWidth
    const visibleContainerWidth = stickyRef.current.clientWidth
    const calculatedMaxScroll = Math.max(0, scrollableContentWidth - visibleContainerWidth)
    const maxScroll = Math.max(0, calculatedMaxScroll + 100) // Desktop specific offset

    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const stickyRect = stickyRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const isSticky = stickyRect.top <= 0

      if (isSticky) {
        const containerHeight = containerRef.current.offsetHeight
        const startPoint = containerRef.current.offsetTop
        const scrollableDistance = Math.max(1, containerHeight - window.innerHeight)
        const endPoint = startPoint + scrollableDistance
        const scrollProgress = Math.max(
          0,
          Math.min(1, (scrollY - startPoint) / (endPoint - startPoint)),
        )
        const newPosition = -maxScroll * scrollProgress
        setScrollPosition(newPosition)
        if (newPosition < maxScrollReached) {
          setMaxScrollReached(newPosition)
        }
      } else if (containerRect.top > 0) {
        setScrollPosition(0)
        setMaxScrollReached(0)
      } else {
        setScrollPosition(maxScrollReached)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile, viewportWidth, maxScrollReached])

  // Effect for Mobile Carousel: API setup and slide change listener
  useEffect(() => {
    if (!api || !isMobile) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api, isMobile])

  if (isMobile) {
    return (
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-smartellDarkBlue text-3xl font-bold text-balance">{title}</h2>
        </div>
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {referrals.map((referral, idx) => (
              <CarouselItem key={idx} className="mr-6 flex basis-1/2 flex-col gap-2 sm:basis-1/3">
                <Image
                  src={referral.image.url}
                  alt={referral.image.alt}
                  width={referral.image.width}
                  height={referral.image.height}
                />
                <div className="flex grow flex-col justify-between">
                  <h3 className="text-smartellDarkBlue text-2xl font-bold">{referral.message}</h3>
                  <div className="flex flex-col">
                    <p className="text-smartellDarkBlue mt-4 text-sm font-bold">{referral.name}</p>
                    <p className="text-smartellDarkBlue mt-1 text-sm font-bold">{referral.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {api && count > 0 && (
          <div className="mt-6 flex flex-col items-center">
            <div className="h-1.5 w-3/4 max-w-60 overflow-hidden rounded-full bg-gray-200">
              <div
                className="bg-smartellDarkBlue h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((current + 1) / count) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative h-[600vh] lg:mt-20 lg:h-[200vh]">
      <div ref={stickyRef} className="sticky top-0 overflow-hidden py-20">
        <motion.div
          ref={motionDivRef}
          className="flex gap-20 lg:items-center"
          style={{ x: scrollPosition }}
        >
          <div className="ml-18 basis-72 lg:ml-32">
            <h2 className="text-smartellDarkBlue text-center text-3xl font-bold text-balance lg:text-5xl">
              {title}
            </h2>
          </div>
          <div className="flex gap-20">
            {referrals.map((referral, idx) => (
              <div key={idx} className="basis-72 lg:shrink-0">
                <Image
                  src={referral.image.url}
                  alt={referral.image.alt}
                  width={referral.image.width}
                  height={referral.image.height}
                  className="max-w-40 lg:max-w-full"
                />
                <h3 className="text-smartellDarkBlue mt-8 h-56 overflow-hidden text-2xl font-bold lg:text-3xl">
                  {referral.message}
                </h3>
                <p className="text-smartellDarkBlue mt-4 text-sm font-bold">{referral.name}</p>
                <p className="text-smartellDarkBlue mt-1 text-sm font-bold">{referral.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
