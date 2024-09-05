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
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
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
    <div className={`overflow-hidden p-1 ${margin} flex flex-nowrap whitespace-nowrap`}>
      <motion.div
        className="flex flex-nowrap whitespace-nowrap text-10xl font-bold text-white"
        style={{ x }}
      >
        <span style={{ wordSpacing: '0.25em' }} className="px-2">
          {children}
        </span>
        <span style={{ wordSpacing: '0.25em' }} className="px-2">
          {children}
        </span>
        <span style={{ wordSpacing: '0.25em' }} className="px-2">
          {children}
        </span>
        <span style={{ wordSpacing: '0.25em' }} className="px-2">
          {children}
        </span>
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
    <div className="flex flex-col items-center justify-center bg-smartellLightPurple">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <div className="my-40">
        <Feature baseVelocity={-1} margin="mt-24">
          {firstLineFeatures}
        </Feature>
        <Feature baseVelocity={1} margin="mb-24">
          {secondLineFeatures}
        </Feature>
      </div>
    </div>
  )
}
