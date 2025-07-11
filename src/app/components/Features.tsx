'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion'
import { wrap } from '@motionone/utils'

function Feature({
  baseVelocity,
  margin,
  children,
}: {
  baseVelocity: number
  margin: string
  children: React.ReactNode
}) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`p-1 ${margin} flex flex-nowrap whitespace-nowrap`}>
      <motion.div
        className="flex flex-nowrap text-4xl font-bold whitespace-nowrap text-white lg:text-8xl"
        style={{ x }}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} style={{ wordSpacing: '0.25em' }} className="px-4">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Features({
  title,
  subtitle,
  firstLineFeatures,
  secondLineFeatures,
}: {
  title: string
  subtitle: string
  firstLineFeatures: string
  secondLineFeatures: string
}) {
  return (
    <div className="bg-smartellLightPurple flex flex-col items-start justify-center overflow-hidden px-6 py-14 md:px-12 lg:px-30 lg:py-24 xl:px-32">
      <p className="mx-12 self-center pt-4 text-center text-2xl font-bold text-white md:text-3xl lg:mx-0 lg:self-auto lg:pt-32 lg:text-4xl">
        {title}
      </p>
      <Feature baseVelocity={-0.6} margin="mt-16 lg:mt-24">
        {firstLineFeatures}
      </Feature>
      <Feature baseVelocity={0.6} margin="mb-16 lg:mb-24">
        {secondLineFeatures}
      </Feature>
      <p className="text-smartellDarkBlue self-center pb-4 text-center text-2xl font-bold text-balance lg:self-end lg:pb-32 lg:text-right lg:text-white">
        {subtitle}
      </p>
    </div>
  )
}
