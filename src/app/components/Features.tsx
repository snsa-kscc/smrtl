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
        className="flex flex-nowrap whitespace-nowrap text-8xl font-bold text-white"
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
    <div className="flex flex-col items-start justify-center overflow-hidden bg-smartellLightPurple">
      <p className="pl-28 pt-32 text-xl font-bold text-white">{title}</p>
      <Feature baseVelocity={-0.6} margin="mt-24">
        {firstLineFeatures}
      </Feature>
      <Feature baseVelocity={0.6} margin="mb-24">
        {secondLineFeatures}
      </Feature>
      <p className="self-end pb-32 pr-28 text-lg text-white">{subtitle}</p>
    </div>
  )
}
