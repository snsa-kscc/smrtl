'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '../lib/utils'

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
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7 }}
      className="mx-8 grid grid-cols-2 justify-items-start gap-20 py-24 lg:mx-28 lg:py-32"
    >
      {counterBox.map((counter, index) => (
        <div
          key={counter.number}
          className={cn(
            'relative',
            index % 4 === 2 || index % 4 === 3 ? 'justify-self-center' : '',
          )}
        >
          <h2
            className="lg:text-10xl text-smartellDarkBlue cursor-pointer text-6xl font-bold"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(index)}
          >
            {counters[index]}
          </h2>
          <div
            className={cn(
              'absolute top-1/2 left-full w-max -translate-x-10/12 transform transition-opacity duration-700 lg:-translate-x-1/4',
              hoveredIndex === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            <p className="bg-smartellLightPurple rounded-full px-3 py-4 text-[10px] font-bold text-white lg:px-16 lg:text-xl">
              {counter.description}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
