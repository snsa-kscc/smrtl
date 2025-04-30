'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

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
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 30%', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [0, -((referrals.length + 1) * 320)])

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
