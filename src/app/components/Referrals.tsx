'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/use-mobile'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const motionDivRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScrollReached, setMaxScrollReached] = useState(0)
  const isMobile = useIsMobile()

  // Get the viewport width on mount and when window resizes
  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth)
    }

    updateViewportWidth()
    window.addEventListener('resize', updateViewportWidth)
    return () => window.removeEventListener('resize', updateViewportWidth)
  }, [])

  // Handle scroll events to calculate horizontal scroll position
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current || !motionDivRef.current) return

    // Calculate max scroll distance dynamically
    const scrollableContentWidth = motionDivRef.current.scrollWidth
    const visibleContainerWidth = stickyRef.current.clientWidth
    const calculatedMaxScroll = Math.max(0, scrollableContentWidth - visibleContainerWidth)
    const maxScroll = Math.max(0, calculatedMaxScroll + (isMobile ? 50 : 100))

    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const stickyRect = stickyRef.current.getBoundingClientRect()
      const scrollY = window.scrollY

      const isSticky = stickyRect.top <= 0

      if (isSticky) {
        const containerHeight = containerRef.current.offsetHeight
        const startPoint = containerRef.current.offsetTop
        // Ensure scrollableDistance is at least 1 to prevent division by zero
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

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [viewportWidth, maxScrollReached, isMobile])

  return (
    <div ref={containerRef} className="relative mt-20 h-[600vh] lg:h-[200vh]">
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
