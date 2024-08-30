'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { HeroShapes } from './shapes/HeroShapes'

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
  const titleCharsRef = useRef<HTMLSpanElement[]>([])
  const animationWordsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(titleCharsRef.current, {
      duration: 1.5,
      yPercent: -55,
      opacity: 0,
      rotateX: -100,
      stagger: 0.09,
      ease: 'power3.out',
    })

    const animationWordsTl = gsap.timeline({ repeat: -1 })
    animationWordsRef.current.forEach((wordDiv) => {
      const chars = wordDiv.querySelectorAll('.char')
      animationWordsTl
        .fromTo(
          chars,
          { yPercent: 100, opacity: 0 },
          {
            duration: 0.7,
            yPercent: 0,
            opacity: 1,
            stagger: 0.06,
            ease: 'power2.out',
          },
        )
        .to(
          chars,
          {
            duration: 0.7,
            yPercent: -100,
            opacity: 0,
            stagger: 0.06,
            ease: 'power2.in',
          },
          '+=1',
        )
    })

    tl.add(animationWordsTl, '-=0.5')
  }, [])

  return (
    <div className="relative container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left mb-8 md:mb-0">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-bold text-4xl md:text-6xl lg:text-9xl text-smartellDarkBlue mb-4 [transform-style:preserve-3d] [perspective:1000px]"
          >
            {title.split(/(\s)/).map((word, i) => (
              <div key={i} className="word inline-block">
                {word.split('').map((char, j) => (
                  <span
                    key={`${i}-${j}`}
                    ref={(el) => {
                      if (el) titleCharsRef.current.push(el)
                    }}
                    className="char inline-block will-change-transform"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-smartellLightPurple text-xl md:text-8xl mb-6 font-bold relative inline-block"
          >
            {animationWords.split(',').map((word, i) => (
              <div
                key={i}
                className="word absolute left-0 top-0 w-max"
                ref={(el) => {
                  if (el) animationWordsRef.current.push(el)
                }}
              >
                <div className="overflow-hidden">
                  {word.split('').map((char, j) => (
                    <span key={`${i}-${j}`} className="char inline-block will-change-transform">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <p className="text-lg md:text-xl">{description}</p>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <HeroShapes />
        </div>
      </div>
    </div>
  )
}
