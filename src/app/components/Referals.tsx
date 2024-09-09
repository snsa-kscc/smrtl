'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type ReferalsProps = {
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

export function Referals({ title, referals }: { title: string; referals: ReferalsProps[] }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 30%', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -((referals.length + 1) * 320)])

  return (
    <div ref={containerRef} className="relative my-20 h-[200vh]">
      <div className="sticky top-0 h-[60vh] overflow-hidden pt-20">
        <motion.div className="flex items-center justify-center gap-20" style={{ x }}>
          <div className="ml-20 basis-72">
            <h2 className="text-balance text-center text-4xl font-bold text-smartellDarkBlue">
              {title}
            </h2>
          </div>
          <div className="ml-40 flex gap-20">
            {referals.map((referal, idx) => (
              <div key={idx} className="flex-shrink-0 basis-72">
                <Image
                  src={referal.image.url}
                  alt={referal.image.alt}
                  width={referal.image.width}
                  height={referal.image.height}
                />
                <h3 className="mt-8 min-h-20 text-4xl font-bold text-smartellDarkBlue">
                  {referal.message}
                </h3>
                <p className="mt-4 text-sm font-bold text-smartellDarkBlue">{referal.name}</p>
                <p className="mt-1 text-sm font-bold text-smartellDarkBlue">{referal.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
