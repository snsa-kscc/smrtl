'use client'

import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Hero({ data }: { data: any }) {
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
        <p>{data.layout[0].title}</p>
        <p>{data.layout[0].swappingTitle}</p>
      </div>
    </main>
  )
}
