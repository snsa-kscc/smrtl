'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

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
  const [viewportWidth, setViewportWidth] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScrollReached, setMaxScrollReached] = useState(0)

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
    if (!containerRef.current || !stickyRef.current) return

    // Calculate max scroll distance
    const maxScroll = 440 * (viewportWidth / 1920)

    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const stickyRect = stickyRef.current.getBoundingClientRect()
      const scrollY = window.scrollY

      // Check if we're in the sticky section
      const isSticky = stickyRect.top <= 0

      if (isSticky) {
        // Calculate the total height of the container
        const containerHeight = containerRef.current.offsetHeight

        // Calculate the start and end points for the scroll animation
        const startPoint = containerRef.current.offsetTop
        const endPoint = startPoint + containerHeight - window.innerHeight

        // Calculate how far we've scrolled through the container (0 to 1)
        const scrollProgress = Math.max(
          0,
          Math.min(1, (scrollY - startPoint) / (endPoint - startPoint)),
        )

        // Calculate the horizontal scroll position
        const newPosition = -maxScroll * scrollProgress

        // Update the scroll position
        setScrollPosition(newPosition)

        // Keep track of the maximum scroll we've reached (most negative value)
        if (newPosition < maxScrollReached) {
          setMaxScrollReached(newPosition)
        }
      } else if (containerRect.top > 0) {
        // Reset when scrolling back to the top
        setScrollPosition(0)
        setMaxScrollReached(0)
      } else {
        // When we've scrolled past the sticky section, use the maximum scroll position we reached
        setScrollPosition(maxScrollReached)
      }
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [viewportWidth, maxScrollReached])

  return (
    <div ref={containerRef} className="relative mt-20 h-[200vh]">
      <div ref={stickyRef} className="sticky top-0 h-[90vh] overflow-hidden pt-20">
        <motion.div className="flex items-center gap-20" style={{ x: scrollPosition }}>
          <div className="ml-32 basis-72">
            <h2 className="text-smartellDarkBlue text-center text-5xl font-bold text-balance">
              {title}
            </h2>
          </div>
          <div className="flex gap-20">
            {referrals.map((referral, idx) => (
              <div key={idx} className="shrink-0 basis-72">
                <Image
                  src={referral.image.url}
                  alt={referral.image.alt}
                  width={referral.image.width}
                  height={referral.image.height}
                />
                <h3 className="text-smartellDarkBlue mt-8 line-clamp-5 h-48 overflow-hidden text-3xl font-bold">
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
