'use client'

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function Hero({
  title,
  animationWords,
  description,
}: {
  title: string
  animationWords: string
  description: string
}) {
  useGSAP(() => {
    gsap.to('.box', { x: 360 })
  })

  return (
    <main>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }}>
        <h1 className="font-bold text-9xl">{title}</h1>
      </motion.div>
      <div>
        <p className="box">{description}</p>
        {animationWords.split(',').map((word: string, index: number) => (
          <span key={index}>{word}</span>
        ))}
      </div>
    </main>
  )
}
