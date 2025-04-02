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
    <div ref={containerRef} className="relative my-20 h-[300vh]">
      <div className="sticky top-0 h-[80vh] overflow-hidden pt-20">
        <motion.div className="flex items-center justify-center gap-20" style={{ x }}>
          <div className="ml-20 basis-72">
            <h2 className="text-smartellDarkBlue text-center text-5xl font-bold text-balance">
              {title}
            </h2>
          </div>
          <div className="ml-40 flex gap-20">
            {referals.map((referal, idx) => (
              <div key={idx} className="shrink-0 basis-72">
                <Image
                  src={referal.image.url}
                  alt={referal.image.alt}
                  width={referal.image.width}
                  height={referal.image.height}
                />
                <h3 className="text-smartellDarkBlue mt-8 min-h-20 text-3xl font-bold">
                  {referal.message}
                </h3>
                <p className="text-smartellDarkBlue mt-4 text-sm font-bold">{referal.name}</p>
                <p className="text-smartellDarkBlue mt-1 text-sm font-bold">{referal.role}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
