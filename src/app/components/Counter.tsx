'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Counter({ counterBox }: { counterBox: { number: number; description: string }[] }) {
  const [counters, setCounters] = useState<string[]>(counterBox.map(() => '0'))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isInView && !intervalRef.current) {
      const baseDuration = 3000
      const staggerDelay = 700
      const steps = 30
      const baseInterval = baseDuration / steps

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

      const startTime = performance.now()
      const totalDuration = baseDuration + (counterBox.length - 1) * staggerDelay

      setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setCounters(counterBox.map((counter) => counter.number.toString()))
      }, totalDuration)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isInView, counterBox])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {counterBox.map((counter, index) => (
          <div key={counter.number} className="relative">
            <h2
              className="cursor-pointer px-20 text-8xl font-bold"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {counters[index]}
            </h2>
            <div
              className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 transform transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="rounded-full bg-smartellLightPurple px-4 py-2 text-sm text-white">
                {counter.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[50vh] bg-red-200"></div>
    </motion.div>
  )
}
