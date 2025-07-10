'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../lib/utils'
import { useIsMobile } from '../hooks/use-mobile'

export function Counter({ counterBox }: { counterBox: { number: number; description: string }[] }) {
  const isMobile = useIsMobile(1100)
  const [counters, setCounters] = useState<string[]>(counterBox.map(() => '0'))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isInView && !intervalRef.current) {
      const baseDuration = isMobile ? 1500 : 3000
      const staggerDelay = isMobile ? 300 : 700
      const steps = isMobile ? 15 : 30
      const baseInterval = baseDuration / steps

      // Define startTime at the beginning
      const startTime = performance.now()
      const totalDuration = baseDuration + (counterBox.length - 1) * staggerDelay

      intervalRef.current = setInterval(() => {
        const currentTime = performance.now()
        setCounters((prevCounters) =>
          prevCounters.map((_, index) => {
            const target = counterBox[index].number
            const digits = target.toString().length
            const duration = baseDuration + index * staggerDelay
            const progress = Math.min((currentTime - startTime) / duration, 1)

            if (progress === 1) {
              return target.toString()
            }

            let result = ''
            for (let i = 0; i < digits; i++) {
              result += Math.floor(Math.random() * 10)
            }
            return result.padStart(digits, '0')
          }),
        )
      }, baseInterval)

      setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setCounters(counterBox.map((counter) => counter.number.toString()))

        // Only set animation complete for mobile
        if (isMobile) {
          setAnimationComplete(true)
        }
      }, totalDuration)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isInView, counterBox, isMobile])

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.7 }}
        className="mx-8 grid grid-cols-2 justify-items-start gap-20 pt-20 pb-16 md:py-24 lg:mx-28 lg:py-32"
      >
        {counterBox.map((counter, index) => (
          <div
            key={counter.number}
            className={cn(
              isMobile ? 'relative w-full' : 'relative',
              index % 4 === 2 || index % 4 === 3 ? 'justify-self-center' : '',
            )}
          >
            <h2
              className="2xl:text-10xl text-smartellDarkBlue cursor-pointer text-center text-6xl font-bold md:text-7xl lg:text-8xl xl:text-9xl"
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              onClick={() => !isMobile && setHoveredIndex(index)}
            >
              {counters[index]}
            </h2>

            {/* Desktop version - hover controlled */}
            {!isMobile && (
              <div
                className={cn(
                  'absolute top-10/12 left-full w-max -translate-x-10/12 transform transition-opacity duration-700 2xl:top-1/2 2xl:-translate-x-1/4',
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0',
                )}
              >
                <p className="bg-smartellLightPurple rounded-full px-3 py-4 text-[10px] font-bold text-white lg:px-16 lg:text-base xl:text-lg">
                  {counter.description}
                </p>
              </div>
            )}

            {/* Mobile version - staggered animation */}
            {isMobile && animationComplete && (
              <motion.div
                className="absolute left-1/2 w-max -translate-x-1/2 transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.5, // This is the key for staggering - each item gets progressively delayed
                }}
              >
                <p className="bg-smartellLightPurple rounded-full px-3 py-4 text-center text-[10px] font-bold text-white md:px-6 md:text-base lg:px-8 lg:text-lg">
                  {counter.description}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
