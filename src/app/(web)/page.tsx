'use client'

import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }}>
        <h1>Hello World</h1>
      </motion.div>
    </main>
  )
}
