'use client'

import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

type ImageType = {
  url: string
  alt: string
  width: number
  height: number
}

export function Television({
  description,
  caseStudy,
}: {
  description: string
  caseStudy: {
    id: string
    image: ImageType
  }[]
}) {
  const televisionRef = useRef<HTMLDivElement>(null)
  const caseStudyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: televisionScrollYProgress } = useScroll({
    target: televisionRef,
    offset: ['start 20%', 'end 30%'],
  })
  const { scrollYProgress: caseStudyScrollYProgress } = useScroll({
    target: caseStudyRef,
    offset: ['start 50%', 'end end'],
  })

  const caseStudyVelocity = useVelocity(caseStudyScrollYProgress)

  const scale = useTransform(televisionScrollYProgress, [0, 1], [1, 4])
  const caseStudyX = useTransform(caseStudyScrollYProgress, [0, 1], ['100%', '-300%'])
  const caseStudySkewXRaw = useTransform(caseStudyVelocity, [-0.5, 0.5], ['20deg', '-20deg'])
  const caseStudySkewX = useSpring(caseStudySkewXRaw, { mass: 3, stiffness: 250, damping: 50 })
  return (
    <>
      <div ref={televisionRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen">
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            <motion.div style={{ scale }}>
              <p className="text-center text-xl text-smartellDarkBlue">{description}</p>
              <Image
                className="mx-auto"
                src="/api/media/file/television.png"
                alt="Television"
                width={789}
                height={537}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div ref={caseStudyRef} className="relative h-[250vh] bg-neutral-800">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-neutral-800">
          <div className="rotate-6">
            <motion.div style={{ x: caseStudyX, skewX: caseStudySkewX }} className="flex gap-20">
              {caseStudy.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 basis-1/3 ${index % 2 === 0 ? 'translate-y-10' : '-translate-y-10'}`}
                >
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="aspect-[3/4] object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
