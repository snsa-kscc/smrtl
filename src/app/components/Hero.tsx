'use client'

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function Hero({ title, swappingTitle }: { title: string; swappingTitle: string }) {
  useGSAP(() => {
    gsap.to('.box', { x: 360 })
  })

  return (
    <main>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }}>
        <h1>Hello World</h1>
      </motion.div>
      <div>
        <p className="box">ja sam manupuliraan od gsapa</p>
        <p>{title}</p>
        {swappingTitle.split(',').map((word: string, index: number) => (
          <span key={index}>{word}</span>
        ))}
      </div>
    </main>
  )
}
